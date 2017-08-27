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
    constructor(protected http: Http, protected confService: ConfService) {}

    /*
     * The request cache.
     *
     * TODO Turn this into a middleware when switching to HttpClient.
     */
    private static cache: {[id: string]: any} = {};

    /*
     * Clear the cache.
     *
     * Clear the cache keeping only entries for the provided paths.
     */
    clearCache(keep: string[] = []) {
        for (
            const i of Object
                .keys(FbService.cache)
                .map(k => [k.split(/[\/:]/)[0], k])
                .filter(([id, _]) => !(keep.indexOf(id) + 1))
                .map(([_, k]) => k)
        ) {
            delete FbService.cache[i];
        }
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
            {
                ...params,
                fields: (params.fields || [])
                    .map(field => field + '.summary(true)')
            })
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
        // Check the cache.
        const id = path + ':' + btoa(JSON.stringify(params));
        if (FbService.cache[id]) { return FbService.cache[id]; }

        const result = this._call(
            path,
            {
                ...params,
                method: HttpMethod[method].toUpperCase(),
                access_token: params.access_token || FB.getAccessToken(),
                source: Object
                    .keys(params)
                    .map(k => params[k])
                    .filter(v => v instanceof File)[0] as File
            })
            .catch(err => Observable.of(err))
            .map(res => res.status ? res.json() : {error: {code: 1}})
            .do(body => {
                console[body.error ? 'warn' : 'log'](
                    'GraphAPI response:',
                    body);
                if (body.error) { throw new GraphApiError(body.error); }
            })
            .publishReplay(1)
            .refCount()
            .first();

        if (method === HttpMethod.Get) { FbService.cache[id] = result; }
        return result;
    }

    /*
     * Internal request handler.
     *
     * This will make the actual request.  The parameters will be minimally 
     * preprocessed by turning Primitives and Primitive[]s into strings, 
     * filtering nulls and moving Files to the source field.
     */
    protected _call(
        path: string,
        params: FbApiParams
    ) {
        console.log('GrapAPI request:', path, params);
        return this.http
            .post(
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
                        new FormData()));
    }
}

