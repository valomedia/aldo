import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/fromPromise';

import {GraphApiError} from './graph-api-error';
import {GraphApiResponse, GraphApiResponseType} from './graph-api-response';
import {GraphApiObject, GraphApiObjectType} from './graph-api-object';

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

declare var FB: {
    init: (params: any) => void;
    api: (
        path: string,
        method: string,
        params: any,
        callback: (response: any) => void) => void;
    ui: (params: any, callback: (response: any) => void) => void;
};

let cache = {};

/*
 * API-wrapper.
 *
 * This function wraps FB.api() to make it typesafe.  It also returns a Promise, 
 * instead of accepting a callback.
 */
function api(path: string, method: HttpMethod, params: any): Promise<any> {
    // ID for cacheing.
    const id = path + ':' + method + ':' + btoa(JSON.stringify(params));

    return cache[id] || (cache[id] = new Promise((resolve, reject) =>
        FB.api(
            path,
            HttpMethod[method],
            params,
            (res) =>
                res.error
                    ? reject(new GraphApiError(res.error))
                    : resolve(res))));
}

@Injectable()
export class FbService {

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
        params: {fields?: string[]} = {},
        T: new (kwargs: GraphApiObjectType) => GraphApiObject = null
    ): Observable<GraphApiResponse<GraphApiObject>> {
        params.fields
            && (params.fields = params.fields.map(k => k + '.summary(true)'));
        return Observable
            .fromPromise(api(path, method, params))
            .do(console.log)
            .map((res: {data?: any}): GraphApiResponseType<any> =>
                (res.data ? res : {data: [res]}) as GraphApiResponseType<any>)
            .map(res => ({
                ...res,
                data: res.data.map(i =>
                    T ? new T(i) : i)
            }))
            .map(res =>
                new GraphApiResponse(
                    res,
                    () =>
                        res.paging && res.paging.next
                            ? this.api(
                                path,
                                method,
                                {
                                    ...params,
                                    after: res.paging.cursors.after
                                },
                                T)
                            : Observable.empty()));
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

