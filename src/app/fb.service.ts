import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concatMap';

import {GraphApiError} from './graph-api-error';
import {GraphApiResponse} from './graph-api-response';

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

@Injectable()
export class FbService {

    private cache: {[id: string]: Promise<GraphApiResponse<any>>;} = {};

    /*
     * Low-level API access.
     *
     * This function wraps FB.api() to make it typesafe.  It also returns 
     * a Promise, instead of accepting a callback.  The promise will return 
     * a GraphApiResponse, which has a clojure, that can be used to fetch more 
     * results, if the response was paged.  If the call fails, the promise will 
     * be rejected with a GraphApiError.
     */
    api(
        path: string,
        method = HttpMethod.Get,
        params = {}
    ): Promise<GraphApiResponse<any>> {

        // ID for cacheing.
        const id = btoa(path + ':' + method + ':' + JSON.stringify(params));

        /*
        if (this.cache[id]) {
            this.cache[id].then((graphApiResponse) =>
                console.log('Cache: ' + JSON.stringify(graphApiResponse)));
        }
        */

        return this.cache[id]
            || (this.cache[id] = new Promise((resolve, reject) =>
                FB.api(path, HttpMethod[method], params, (res) => {
                    console.log('GraphAPI: ' + JSON.stringify(res));
                    if (res.error) { reject(new GraphApiError(res.error)); }
                    resolve(
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
                                    : Promise.resolve(null)));
                })));
    }

    /*
     * High-level API access.
     *
     * This provides all the niceities of Observers.  Most notably it will 
     * abstract away pagination and instead observe the individual data entries.
     */
    call(path: string, method = HttpMethod.Get, params = {}) {
        return Observable
            .fromPromise(this.api(path, method, params))
            .concatMap(res => res.observable)
    }
}

