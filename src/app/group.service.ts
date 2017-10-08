import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Group, DUMMY_GROUP_TYPE} from './group';
import {FbService, HttpMethod} from './fb.service';
import {buildFields} from './util';

/*
 * The Service providing the Groups.
 */

@Injectable()
export class GroupService {
    constructor(protected fbService: FbService) {}

    /*
     * Get a Group by its ID.
     */
    group(id: string) {
        return this.fbService.fetch(
            id,
            HttpMethod.Get,
            {fields: buildFields(DUMMY_GROUP_TYPE)},
            Group) as Observable<Group>;
    }
}

