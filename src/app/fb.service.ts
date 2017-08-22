import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/fromPromise';
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
 * Facebook's SDK for JavaScript.
 */
declare var FB: {
    // Core methods.
    init: (params: any) => void;
    api: (
        path: string,
        method: string,
        params: any,
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
};

/*
 * The request cache.
 *
 * Might turn this into a middleware at some point.
 */
let cache = {};

/*
 * API-wrapper.
 *
 * This function wraps FB.api() to make it typesafe.  It also returns a Promise, 
 * instead of accepting a callback.
 */
function api(path: string, method: HttpMethod, params: any): Promise<any> {
    return new Promise((resolve, reject) =>
        FB.api(
            path,
            HttpMethod[method],
            params,
            (res) => res.error
                ? reject(new GraphApiError(res.error))
                : resolve(res)));
}

@Injectable()
export class FbService {
    constructor(private http: Http, private confService: ConfService) {}

    /*
     * Clear the cache.
     */
    clearCache(keep: string[] = []) {
        for (
            const i of Object
                .keys(cache)
                .map(k => [k.split(/[\/:]/)[0], k])
                .filter(([id, _]) => !(keep.indexOf(id) + 1))
                .map(([_, k]) => k)
        ) {
            delete cache[i];
        }
    }

    /*
     * Low-level API access.
     *
     * This function makes the API more useable, by normalizing the result to 
     * GraphApiResponseType and turning it into a much more workable 
     * Observable<GraphApiResponse<T>>.  The constructor for T needs to be 
     * provided as the magic last parameter, if none as provided the Object will 
     * be passed as parsed.  This will automatically fetch a summary for every 
     * field.
     */
    api(
        path: string,
        method = HttpMethod.Get,
        params: {[id: string]: Primitive|Primitive[]|File} = {},
        T: new (kwargs: GraphApiObjectType) => GraphApiObject = null
    ): Observable<GraphApiResponse<GraphApiObject>> {
        // ID for cacheing.
        const id = path + ':' + btoa(JSON.stringify(params));

        if (cache[id]) { return cache[id]; }

        const result = this.http
            .post(
                this.confService.fb[
                    Object
                        .keys(params)
                        .map(k => params[k])
                        .filter(v => v instanceof File)
                        .map((f: File) => f.type)
                        .filter(type => type.split('/')[0] == 'video')
                        .length
                        ? 'apiUrl'
                        : 'videoUploadUrl'
                ]
                    + '/'
                    + path,
                Object
                    .keys(params)
                    .map(k => [
                        params[k] instanceof File ? 'source' : k,
                        params[k]
                    ])
                    .concat([[
                        'fields',
                        (params['fields'] as string[] || [])
                            .map(field => field + '.summary(true)')
                    ]] as [string, Primitive|Primitive[]|File][])
                    .map(([k, v]: [string, Primitive|Primitive[]|File]):
                        [string, Primitive|File] => [
                            k,
                            v instanceof Array
                                ? (v as Primitive[]).join(',')
                                : (v as Primitive|File)
                        ])
                    .concat([[
                        'method',
                        HttpMethod[method].toUpperCase()
                    ]] as [string, Primitive|File][])
                    .filter(([_, v]) => v)
                    .map(([k, v]: [string, Primitive|File]) => [
                        k,
                        v instanceof File ? v : '' + v
                    ])
                    .concat([[
                        'access_token',
                        params['access_token']
                            || FB.getAuthResponse().accessToken
                    ]] as [string, string|File][])
                    .reduce(
                        (a, e) => (a.set as any)(...e) || a,
                        new FormData()))
            .catch(err => Observable.of(err))
            .map(res => res.status ? res.json() : {error: {code: 1}})
            .do(body => {
                console[body.error ? 'warn' : 'log']('GraphAPI:', body);
                if (body.error) { throw new GraphApiError(body.error); }
            })
            .map((res: {data?: any}): GraphApiResponseType<any> =>
                (res.data ? res : {data: [res]}) as GraphApiResponseType<any>)
            .publishReplay(1)
            .refCount()
            .map(res => ({
                ...res,
                data: res.data.map(e => T ? new T(e) : e)
            }))
            .first()
            .map(res => new GraphApiResponse(
                res,
                () => res.paging && res.paging.next
                    ? this.api(
                        path,
                        method,
                        {
                            ...params,
                            after: res.paging.cursors.after
                        },
                        T)
                    : Observable.empty()));
        if (method == HttpMethod.Get) { cache[id] = result; }
        return result;
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
    call(
        path: string,
        method = HttpMethod.Get,
        params = {},
        T: new (kwargs: GraphApiObjectType) => GraphApiObject = null
    ) {
        return this.api(path, method, params, T).concatMap(res => res.expanded);
    }
}

