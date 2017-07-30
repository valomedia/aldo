import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import {Page, EMPTY_PAGE, ContentType} from './page';
import {FbService, HttpMethod} from './fb.service';
import {GraphApiError} from './graph-api-error';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    constructor(private fbService: FbService) {}

    /*
     * Perform a GET-request for a Page on a given path.
     */
    get(path: string): Observable<Page> {
        return this.fbService
            .call(path, HttpMethod.Get, {fields: Object.keys(EMPTY_PAGE)})
            .map(result => new Page(result));
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
    page(id: number) {
        return this.pages().filter((page) => page.id == id).toPromise();
    }

    /*
     * Post a message as the page.
     */
    postMsg(
            page: Page,
            msg: string,
            contentType: ContentType,
            link: string
    ) {
        let result;
        switch (+contentType) {
            case ContentType.Link:
                result = this.fbService.call(
                    page.id.toString() + '/feed',
                    HttpMethod.Post,
                    {
                        message: msg,
                        link: link,
                        access_token: page.access_token
                    });
                break;
            case ContentType.Photo:
                result = this.fbService.call(
                    page.id.toString() + '/photos',
                    HttpMethod.Post,
                    {
                        message: msg,
                        url: link,
                        access_token: page.access_token
                    });
                break;
           case ContentType.Video:
                result = this.fbService.call(
                    page.id.toString() + '/videos',
                    HttpMethod.Post,
                    {
                        message: msg,
                        file_url: link,
                        access_token: page.access_token
                    });
                break;
        }
        return result.map(({id}: {id: string}) => id).first().toPromise();
    }
}

