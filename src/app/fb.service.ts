import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';

import {GraphApiError} from './graph-api-error';

/*
 * The Service providing the Facebook API.
 */

interface GraphApiResponse {
    data?: any[];
    paging?: {
        cursors: {
            before: String,
            after: String
        },
        next?: String
    }
}

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
        path: String,
        method: String,
        params: any,
        callback: (response: any) => void) => void;
    ui: (params: any, callback: (response: any) => void) => void;
};

@Injectable()
export class FbService {
    /*
     * Low-level API access.
     *
     * This function wraps FB.api() to make it typesafe.  It also returns 
     * a Promise, instead of accepting a callback.  The promise will return the 
     * result in the same way the callback would, in the case of an error, the 
     * Promise will be rejected with a GraphApiError.
     */
    api(
        path: String,
        method = HttpMethod.Get,
        params = {}
    ): Promise<GraphApiResponse> {
        return new Promise((resolve, reject) =>
            FB.api(path, HttpMethod[method], params, (res) => {
                if (res.error) { reject(new GraphApiError(res)); }
                resolve(res)
            }));
    }

    /*
     * High-level API access.
     *
     * This provides all the niceities of Observers.  Most notably it will 
     * abstract away pagination and instead observe the individual data entries.  
     * Non-paginated data will be passed as-is.
     *
     * TODO Look at this again, when not tired.
     */
    call(path: String, method = HttpMethod.Get, params = {}) {
        return Observable.fromPromise(this.api(path, method, params))
            .map(res => ({
                data: res.data || [res],
                paging: res.paging
            }))
            .expand(res =>
                res.paging.next
                    ? Observable.fromPromise(
                        this.api(
                            path,
                            method,
                            {...params, after: res.paging.cursors.after}))
                    : Observable.empty())
            .map(res => Observable.from(res.data))
            .concatAll()
    }
}

