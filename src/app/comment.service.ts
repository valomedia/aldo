import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import {Comment, DUMMY_COMMENT_TYPE} from './comment';
import {FbService, HttpMethod} from './fb.service';
import {GraphApiError} from './graph-api-error';
import {GraphApiResponse} from './graph-api-response';

/*
 * The Service providing the Comments.
 */

@Injectable()
export class CommentService {
    constructor(private fbService: FbService) {}

    /*
     * Get a Comment by its id.
     */
    comment(id: string): Promise<Comment> {
        return this.fbService
            .call(
                id,
                HttpMethod.Get,
                {fields: Object.keys(DUMMY_COMMENT_TYPE)},
                Comment)
            .first()
            .toPromise();
    }

    /*
     * Get all Comments on a certain id.
     *
     * The id may represent an album, event, life event, link, live video, note, 
     * official event, open graph action, open graph object, photo, post, 
     * status, thread, user, video, or another comment.
     */
    comments(id: string): Observable<GraphApiResponse<Comment>> {
        return this.fbService.api(
            id + '/comments',
            HttpMethod.Get,
            {fields: Object.keys(DUMMY_COMMENT_TYPE)},
            Comment);
    }
}

