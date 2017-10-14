import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';
import {
    CoverPhoto,
    CoverPhotoType,
    DUMMY_COVER_PHOTO_TYPE
} from './cover-photo';

/*
 * Classes related to handling Facebook events.
 */

/*
 * A Facebook event as returned by the Facebook API.
 */
export interface EventType extends ProfileType {
    description?: string;
    cover?: CoverPhotoType;
};

/*
 * A Facebook event as used internally.
 */
export class Event extends Profile {
    constructor(kwargs: EventType) {
        super(kwargs);
        if (kwargs.cover) { this.cover = new CoverPhoto(kwargs.cover); }
    }

    protected get postService() {
        return this.serviceService.postService;
    }

    /*
     * The CoverPhoto for this Event.
     */
    cover?: CoverPhoto;

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
    description: '',
    cover: DUMMY_COVER_PHOTO_TYPE
};

