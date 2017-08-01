import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/fromPromise';

import {GraphApiError} from './graph-api-error';
import {GraphApiResponse, GraphApiResponseType} from './graph-api-response';
import {Page, EMPTY_PAGE} from './page';
import {Post, EMPTY_POST} from './post';

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
 * A dummy class used for results that do not match any class.
 */
class Dummy {
    constructor(kwargs: any) {
        Object.assign(this, kwargs);
    }
}

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
    const id = btoa(path + ':' + method + ':' + JSON.stringify(params));

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
     * Low-level API access.
     *
     * This function makes the API more useable, by normalizing the result to 
     * GraphApiResponseType and turning it into a much more workable 
     * Observable<GraphApiResponse<T>>.  The constructor for T needs to be 
     * provided as the magic last parameter, Dummy() will be used as a default.
     */
    api(
        path: string,
        method = HttpMethod.Get,
        params = {},
        magic: new (kwargs: any) => any = Dummy
    ): Observable<GraphApiResponse<any>> {
        return Observable
            .fromPromise(api(path, method, params))
            .do(console.log)
            .map((res: {data?: any}): GraphApiResponseType<any> =>
                (res.data ? res : {data: [res]}) as GraphApiResponseType<any>)
            .map(res => ({
                ...res,
                data: res.data.map(i => new magic(i))
            }))
            .do(res => console.log(typeof res.data[0]))
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
                                })
                            : Observable.empty()));
    }

    /*
     * High-level API access.
     *
     * This will completely abstract away pagination and return an Observable, 
     * that will observe all results at the cost of being unable to fetch the 
     * whole set only when it turns out to be necessary.  The Observable will be 
     * of type T, whose constructor needs to be supplied as the magic last 
     * parameter, which defaults to Dummy().
     */
    call(
        path: string,
        method = HttpMethod.Get,
        params = {},
        magic: new (kwargs: any) => any = Dummy
    ) {
        return this.api(path, method, params, magic)
            .concatMap(res => res.expanded);
    }
}

