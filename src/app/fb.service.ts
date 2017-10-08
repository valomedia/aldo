import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {GraphApiError} from './graph-api-error';
import {GraphApiResponse, GraphApiResponseType} from './graph-api-response';
import {GraphApiObject, GraphApiObjectType} from './graph-api-object';
import {ConfService} from './conf.service';
import {Primitive} from './app';
import {CachedHttpService} from './cached-http.service';

/*
 * The Service providing the Facebook API.
 */

/*
 * The HttpMethods used by Facebook.
 */
export enum HttpMethod {
    Get,
    Post,
    Delete
};

/*
 * The login statuses a user can have.
 */
enum LoginStatus {
    connected,
    not_authorized,
    unknown
};

/*
 * Useless interface, because Facebook.
 */
enum AuthType {
    rerequest
}

/*
 * The details for a logged in session.
 */
export interface AuthResponse {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
    grantedScopes?: string;
}

/*
 * A full login state.
 */
interface Session {
    status: LoginStatus;
    authResponse: AuthResponse;
}

/*
 * The parameters for a call to the GraphAPI.
 */
interface FbApiParams {
    [id: string]: Primitive|Primitive[]|File
    method?: string,
    access_token?: string,
    fields?: string[],
    source?: File
}

/*
 * Facebook's SDK for JavaScript.
 */
declare var FB: {
    // Core methods.
    init: (params: any) => void;
    api: (
        path: string,
        method: string,
        params: {[id: string]: any},
        cb: (response: any) => void) => void;
    ui: (params: any, cb: (response: any) => void) => void;

    // Facebook login methods.
    getLoginStatus: (cb: (res: Session) => void) => void;
    login: (
        cb?: (res: Session) => void,
        opts?: {
            auth_type?: AuthType,
            scope?: string,
            return_scopes?: boolean,
            enable_profile_selector?: boolean,
            profile_selector_ids: string
        }) => void;
    logout: (cb: (res: Session) => void) => void;
    getAuthResponse: () => AuthResponse|null;
    getAccessToken: () => string|null;
};

@Injectable()
export class FbService {
    constructor(
        protected http: Http,
        protected confService: ConfService,
        protected cachedHttpService: CachedHttpService) {}

    /*
     * HTTP wrapper.
     *
     * This will pass on the request to the right handler, depending on whether 
     * the request should be cached.  This is necessary, as TypeScript deems 
     * (url: string, body: FormData) => Observable<Response> and
     * (url: string, body: any) => Observable<Response> to be incompatible.
     */
    protected post(
        path: string,
        params: FormData,
        cacheing: boolean,
        paramIdString?: string
    ) {
        if (cacheing) {
            return this.cachedHttpService
                .post(path, params, path + '?' + paramIdString);
        } else {
            return this.http.post(path, params);
        }
    }

    /*
     * Internal request handler.
     *
     * This will make the actual request.  The parameters will be minimally 
     * preprocessed by turning Primitives and Primitive[]s into strings, 
     * filtering nulls and moving Files to the source field.
     */
    protected _call(path: string, params: FbApiParams, cacheing: boolean) {
        console.log('GraphAPI request:', path, params);
        return this.post(
            this.confService.fb[
                params.source
                    && params.source.type.split('/')[0] === 'video'
                    ? 'videoUploadUrl'
                    : 'apiUrl'
            ]
                + '/'
                + path,
            Object
                .keys(params)
                .map((k): [string, Primitive|File] => [
                    k,
                    params[k] instanceof Array
                        ? (params[k] as Primitive[]).join(',')
                        : params[k] as Primitive|File
                ])
                .filter(([_, v]) => v !== null && v !== undefined)
                .map(([k, v]): [string, string|File] => [
                    k,
                    v instanceof File ? v : '' + v
                ])
                .filter(([k, v]) => k === 'source' || !(v instanceof File))
                .reduce(
                    (a, e) => (a.set as any)(...e) || a,
                    new FormData()),
            cacheing
                && ! Object.keys(params)
                    .map(k => params[k])
                    .filter(v => v instanceof File)
                    .length,
            Object
                    .keys(params)
                    .map(k =>
                        encodeURIComponent(k)
                            + '='
                            + encodeURIComponent(JSON.stringify(params[k])))
                    .join('&'));
    }

    /*
     * High-level API access.
     *
     * This will completely abstract away pagination and return an Observable, 
     * that will observe all results at the cost of being unable to fetch the 
     * whole set only when it turns out to be necessary.  The Observable will be 
     * of type T, whose constructor needs to be supplied as the magic last 
     * parameter, if none as provided the Object will be passed as parsed.
     */
    fetch(
        path: string,
        method = HttpMethod.Get,
        params: FbApiParams = {},
        T?: new (kwargs: GraphApiObjectType) => GraphApiObject
    ) {
        return this.api(path, method, params, T).concatMap(res => res.expanded);
    }

    /*
     * Lower-level API access.
     *
     * This function makes the API more useable, by normalizing the result to 
     * GraphApiResponseType and turning it into a much more workable 
     * Observable<GraphApiResponse<T>>.  The constructor for T needs to be 
     * provided as the magic last parameter, if none as provided the Object will 
     * be passed as parsed.  This will automatically fetch a summary for every 
     * field and cache GET requests.
     */
    api(
        path: string,
        method: HttpMethod,
        params: FbApiParams = {},
        T?: new (kwargs: GraphApiObjectType) => GraphApiObject
    ): Observable<GraphApiResponse<GraphApiObject>> {
        return this.call(
            path,
            method,
            params)
            .map((res: GraphApiResponseType<GraphApiObject>|any) =>
                new GraphApiResponse(
                    res.data
                        ? {
                            ...res,
                            data: res.data.map((e: GraphApiObjectType) =>
                                T ? new T(e) : e)
                        }
                        : {data: [T ? new T(res) : res]},
                    () => (res as GraphApiResponseType<GraphApiObject>).paging
                        && ((res as GraphApiResponseType<GraphApiObject>)
                            .paging as {
                                cursors: {
                                    before: string,
                                    after: string
                                },
                                next?: string,
                                previous?: string
                            }).next
                        ? this.api(
                            path,
                            method,
                            {
                                ...params,
                                after: (res as GraphApiResponseType<GraphApiObject> as {
                                    paging?: {
                                        cursors: {
                                            before: string,
                                            after: string
                                        },
                                        next?: string,
                                        previous?: string
                                    };
                                }).paging.cursors.after
                            },
                            T)
                        : Observable.empty()));
    }

    /*
     * Low-level API access.
     *
     * This will return all results from the API as-is, but will apply cacheing 
     * and preprocess the parameters, moving File params to the source key, 
     * filtering out null values and turning booleans and numbers and Arrays 
     * into strings.
     */
    call(
        path: string,
        method = HttpMethod.Get,
        params: FbApiParams = {}
    ) {
        return this._call(
            path,
            {
                ...params,
                method: HttpMethod[method].toUpperCase(),
                access_token: params.access_token || FB.getAccessToken(),
                source: Object
                    .keys(params)
                    .map(k => params[k])
                    .filter(v => v instanceof File)[0] as File
            },
            method === HttpMethod.Get)
            .catch(err => Observable.of(err))
            .map(res => res.status ? res.json() : {error: {code: 1}})
            .do(body => {
                console[body.error ? 'warn' : 'log'](
                    'GraphAPI response:',
                    body);
                if (body.error) { throw new GraphApiError(body.error); }
            });
    }
}

