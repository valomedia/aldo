import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/switchMap';

import {Page, EMPTY_PAGE} from './page';
import {FbService, HttpMethod} from './fb.service';
import {GraphApiError} from './graph-api-error';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    constructor(private fbService: FbService) {}

    /*
     * Perform a get request for a Page on a given path.
     */
    get(path: String, params = {}): any {
        return this.fbService
            .call(path, HttpMethod.Get, {fields: Object.keys(EMPTY_PAGE), ...params});
    }

    /*
     * Get all Pages of the user.
     */
    getPages(after?: String): Observable<Page> {
        let result = Observable.create((observer: Observer<Page>) =>
            this.get('me/accounts', {after: after})
                .then((res: {
                    data: Page[],
                    paging: {
                        cursors: {
                            before: String,
                            after: String
                        },
                        next?: String
                    }
                }) => {
                    for (let e of res.data) {
                        observer.next(e);
                    }
                    if (res.paging.next) {
                        result.switchMap(
                            this.getPages(res.paging.cursors.after));
                    }
                }).catch((err: GraphApiError) => {
                    observer.error(err);
                    observer.complete();
                }));
        return result;
    }

    /*
     * Get a Page by its ID.
     */
    getPage(id: number): Promise<Page> {
        return this.get(id.toString());
    }
}

