import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {Video, DUMMY_VIDEO_TYPE} from './video';
import {FbService, HttpMethod} from './fb.service';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class VideoService {
    constructor(protected fbService: FbService) {}

    /*
     * Get a video by its id.
     */
    video(id: string): Promise<Video> {
        return this.fbService
            .fetch(
                id,
                HttpMethod.Get,
                {fields: Object.keys(DUMMY_VIDEO_TYPE)},
                Video)
            .first()
            .toPromise() as Promise<Video>;
    }
}

