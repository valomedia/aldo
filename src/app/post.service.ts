import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Post, DUMMY_POST_TYPE, PostContentType} from './post';
import {FbService, HttpMethod} from './fb.service';
import {GraphApiError} from './graph-api-error';
import {GraphApiResponse} from './graph-api-response';
import {Page} from './page';
import {VideoService} from './video.service';
import {Ressource} from './app';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PostService {
    constructor(
        protected fbService: FbService,
        protected videoService: VideoService) {}

    /*
     * Perform a GET-request for a Post on a given path.
     */
    get(
        path: string,
        isPublished?: boolean,
        includeHidden = false
    ): Observable<GraphApiResponse<Post>> {
        return this.fbService.api(
            path,
            HttpMethod.Get,
            {
                fields: Object.keys(DUMMY_POST_TYPE),
                include_hidden: includeHidden,
                is_published: isPublished
            },
            Post) as Observable<GraphApiResponse<Post>>;
    }

    /*
     * Get a post by its id.
     */
    post(id: string): Observable<Post> {
        return this.fbService
            .fetch(
                id,
                HttpMethod.Get,
                {fields: Object.keys(DUMMY_POST_TYPE)},
                    Post) as Observable<Post>;
    }

    /*
     * Get the feed of Posts published by a Page or by others on the Page.
     */
    feed(id: string) {
        return this.get(id + '/feed');
    }

    /*
     * Get only the Posts published by the Page.
     */
    posts(id: string) {
        return this.get(id + '/posts');
    }

    /*
     * Get only the Posts the Page has been tagged in.
     */
    tagged(id: string) {
        return this.get(id + '/tagged');
    }

    /*
     * Get only the Posts that can be promoted.
     *
     * The paremeter isPublished can be used to filter only published or only 
     * unpublished posts.  Not passing it will return both.
     */
    promotablePosts(id: string, isPublished?: boolean) {
        return this.get(id + '/promotable_posts', isPublished);
    }

    /*
     * Post a message as the page.
     */
    create(
        page: Page,
        msg?: string,
        contentType = PostContentType.status,
        link?: Ressource
    ): Observable<string> {
        let result;
        switch (+contentType) {
            case PostContentType.link:
                result = this.fbService.call(
                    page.id.toString() + '/feed',
                    HttpMethod.Post,
                    {
                        message: msg,
                        link: link,
                        access_token: page.access_token
                    });
                break;
           case PostContentType.photo:
                result = this.fbService.call(
                    page.id.toString() + '/photos',
                    HttpMethod.Post,
                    {
                        message: msg,
                        url: link,
                        access_token: page.access_token
                    });
                break;
           case PostContentType.video:
                result = this.videoService.create(page, link);
                break;
        }
        return result.pluck('id');
    }
}

