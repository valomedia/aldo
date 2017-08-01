import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import {Post, EMPTY_POST} from './post';
import {FbService, HttpMethod} from './fb.service';
import {GraphApiError} from './graph-api-error';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PostService {
    constructor(private fbService: FbService) {}

    /*
     * Perform a GET-request for a Post on a given path.
     */
    get(
        path: string,
        isPublished?: boolean,
        includeHidden = false
    ): Observable<Post> {
        return this.fbService.call(
            path,
            HttpMethod.Get,
            {
                fields: Object.keys(EMPTY_POST),
                include_hidden: includeHidden,
                is_published: isPublished
            },
            Post);
    }

    /*
     * Get the feed of Posts published by a Page or by others on the Page.
     */
    feed(id: number) { return this.get(id.toString() + '/feed'); }

    /*
     * Get only the Posts published by the Page.
     */
    posts(id: number) { return this.get(id.toString() + '/posts'); }

    /*
     * Get only the Posts the Page has been tagged in.
     */
    tagged(id: number) { return this.get(id.toString() + '/tagged'); }

    /*
     * Get only the Posts that can be promoted.
     *
     * The paremeter isPublished can be used to filter only published or only 
     * unpublished posts.  Not passing it will return both.
     */
    promotablePosts(id: number, isPublished?: boolean) {
        return this.get(id.toString() + '/promotable_posts', isPublished);
    }
}

