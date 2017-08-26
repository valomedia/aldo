import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

import {Video, DUMMY_VIDEO_TYPE} from './video';
import {FbService, HttpMethod} from './fb.service';
import {Ressource} from './app';
import {Page} from './page';

/*
 * The Service providing the Videos.
 */

@Injectable()
export class VideoService {
    constructor(protected fbService: FbService) {}

    /*
     * Get a video by its id.
     */
    video(id: string): Observable<Video> {
        return this.fbService
            .fetch(
                id,
                HttpMethod.Get,
                {fields: Object.keys(DUMMY_VIDEO_TYPE)},
                Video) as Observable<Video>;
    }

    /*
     * Create a new video.
     */
    create(
        page: Page,
        ressource: Ressource,
        description?: string
    ): Observable<{
        storyId: string;
        attachmentId: string;
    }> {
        return this.fbService.call(
            page.id.toString() + '/videos',
            HttpMethod.Post,
            {
                description: description,
                file_url: ressource,
                access_token: page.access_token
            })
            .map(({
                id,
                video_id
            }: {
                id: string;
                video_id: string;
            }) => ({
                storyId: id,
                attachmentId: video_id
            }));
    }
}

