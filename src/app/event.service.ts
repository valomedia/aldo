import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Event, DUMMY_EVENT_TYPE} from './event';
import {FbService, HttpMethod} from './fb.service';

/*
 * The Service providing the Events.
 */

@Injectable()
export class EventService {
    constructor(protected fbService: FbService) {}

    /*
     * Get an Event by its ID.
     */
    event(id: string) {
        return this.fbService.fetch(
            id,
            HttpMethod.Get,
            {fields: Object.keys(DUMMY_EVENT_TYPE)},
            Event) as Observable<Event>;
    }
}

