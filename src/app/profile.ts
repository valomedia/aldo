import {Observable} from 'rxjs/Observable';

import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';
import {ConfService} from './conf.service';
import {GraphApiResponse} from './graph-api-response';
import {Post} from './post';
import {CoverPhoto} from './cover-photo';

/*
 * Classes related to Facebook profiles.
 *
 * Profiles are Users, Pages, Groups, Events and Applications.
 */

/*
 * A Facebook profile as returned by the Facebook API.
 */
export interface ProfileType extends GraphApiObjectType {
    name: string;
}

/*
 * A Facebook profile as used internally.
 */
export class Profile extends GraphApiObject {
    constructor(kwargs: ProfileType) {
        super(kwargs);
    }

    /*
     * The description of this Profile.
     *
     * This is implemented by the subclasses.
     */
    description?: string;

    /*
     * The CoverPhoto of this Profile.
     *
     * This is implemented by the subclasses.
     */
    cover?: CoverPhoto;

    protected get confService() {
        return this.serviceService.confService;
    }

    /*
     * Get the url to the icon for this Profile.
     */
    get picture() {
        return this.confService.fb.apiUrl + '/' + this.id + '/picture';
    }

    /*
     * Get the Feed of Posts for this Profile.
     *
     * This is implemented by the subclasses.
     */
    get feed(): Observable<GraphApiResponse<Post>> {
        return null;
    }
}
export interface Profile extends ProfileType {}

/*
 * The simplest valid profile.
 *
 * This exists, so the Users and Pages can use it to build their dummy 
 * constants.
 */
export const DUMMY_PROFILE_TYPE: ProfileType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    name: ''
};

