import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';

/*
 * Classes related to handling Facebook events.
 */

/*
 * A Facebook event as returned by the Facebook API.
 */
export interface EventType extends ProfileType {
    description?: string;
};

/*
 * A Facebook event as used internally.
 */
export class Event extends Profile {
    constructor(kwargs: EventType) {
        super(kwargs);
    }

    protected get postService() {
        return this.serviceService.postService;
    }

    /*
     * Get the feed of Posts of this Event.
     */
    get feed() {
        return this.postService.feed(this.id);
    }
}
export interface Event extends EventType {}

/*
 * The simplest valid Event.
 *
 * This exists, so the EventService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Event without changing 
 * EventServic.
 */
export const DUMMY_EVENT_TYPE: EventType = {
    ...DUMMY_PROFILE_TYPE,
    description: ''
};

