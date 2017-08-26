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
        id: string;
        upload_session_id: string;
        video_id: string;
        start_offset: string;
        end_offset: string;
        success: boolean;
        skip_upload: boolean;
        transcode_bit_rate_bps: string;
        transcode_dimension: string;
    }> {
        return this.fbService.call(
            page.id.toString() + '/videos',
            HttpMethod.Post,
            {
                description: description,
                file_url: ressource,
                access_token: page.access_token
            });
    }
}

