import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/first';

import {Page, DUMMY_PAGE_TYPE, ContentType} from './page';
import {FbService, HttpMethod} from './fb.service';
import {GraphApiError} from './graph-api-error';
import {Ressource} from './app';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    constructor(protected fbService: FbService) {}

    /*
     * Perform a GET-request for a Page on a given path.
     */
    get(path: string): Observable<Page> {
        return this.fbService.fetch(
            path,
            HttpMethod.Get,
            {fields: Object.keys(DUMMY_PAGE_TYPE)},
            Page) as Observable<Page>;
    }

    /*
     * Get all Pages of the user.
     */
    pages(after?: string) {
        return this.get('me/accounts');
    }

    /*
     * Get a Page by its ID.
     */
    page(id: string) {
        return this.get(id).first().toPromise();
    }
}

