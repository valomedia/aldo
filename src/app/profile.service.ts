import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import {Profile, DUMMY_PROFILE_TYPE} from './profile';
import {FbService, HttpMethod} from './fb.service';
import {PageService} from './page.service';

/*
 * The Service providing Profiles.
 */

@Injectable()
export class ProfileService {
    constructor(
        protected fbService: FbService,
        protected pageService: PageService) {}

    /*
     * Get a Profile by its ID.
     */
    profile(id: string): Promise<Profile> {
        return this.fbService
            .fetch(
                id,
                HttpMethod.Get,
                {
                    fields: Object.keys(DUMMY_PROFILE_TYPE),
                    metadata: 1
                },
                Profile)
            .map(graphApiObject => graphApiObject as Profile)
            .mergeMap(profile => {
                switch (profile.metadata.type) {
                    case 'page': return this.pageService.page(id);
                    default: return Promise.resolve(profile);
                }
            })
            .first()
            .toPromise();
    }
}

