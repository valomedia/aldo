import {Injectable} from '@angular/core';
import {Http, Response, RequestOptionsArgs} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';

import {ConfService} from './conf.service';

/*
 * A wrapper service providing cached HTTP access.
 */

@Injectable()
export class CachedHttpService {
    constructor(protected http: Http, protected confService: ConfService) {}

    protected static cache: {[id: string]: Observable<Response>} = {};

    /*
     * Send a HTTP POST request with cacheing.
     *
     * All requests Aldo sends are POST requests, as Facebook demands larger 
     * requests to be POST requests.  The actual RESTful method is encoded 
     * within the request.
     *
     * This gets passed a cacheId.  All requests with the same cacheID are 
     * assumed to be identical. The cacheId is a pseudo-url, that encodes the 
     * server, path and parameters.
     */
    post(url: string, body: FormData, cacheId: string): Observable<Response> {
        return CachedHttpService.cache[cacheId]
            || (CachedHttpService.cache[cacheId]
                = this.http
                    .post(url, body)
                    .publishReplay(1, 2 * this.confService.app.baseDelay)
                    .refCount()
                    .first());
    }
}

