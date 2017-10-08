import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';

import {Profile, DUMMY_PROFILE_TYPE} from './profile';
import {FbService, HttpMethod} from './fb.service';
import {PageService} from './page.service';
import {UserService} from './user.service';
import {GroupService} from './group.service';
import {EventService} from './event.service';
import {buildFields} from './util';

/*
 * The Service providing Profiles.
 */

@Injectable()
export class ProfileService {
    constructor(
        protected fbService: FbService,
        protected pageService: PageService,
        protected userService: UserService,
        protected groupService: GroupService,
        protected eventService: EventService) {}

    protected _profile(id: string): Observable<Profile> {
        return this.fbService
            .fetch(
                id,
                HttpMethod.Get,
                {
                    fields: buildFields(DUMMY_PROFILE_TYPE),
                    metadata: 1
                },
                Profile)
            .map(graphApiObject => graphApiObject as Profile);
    }

    /*
     * Get a Profile by its ID.
     */
    profile(id: string): Observable<Profile> {
        // Need to redo the cacheing here, as we would otherwise mergeMap the 
        // cached instance of Profile the a new instance of a subtype of Profile 
        // every time this Observable is subscribed to.
        return this._profile(id)
            .mergeMap(profile => {
                switch (profile.metadata.type) {
                    case 'page': return this.pageService.page(id);
                    case 'user': return this.userService.user(id);
                    case 'group': return this.groupService.group(id);
                    case 'event': return this.eventService.event(id);
                    default: return Observable.of(profile);
                }
            });
    }
}

