import {GraphApiObject, GraphApiObjectType, DUMMY_GRAPH_API_OBJECT_TYPE}
    from './graph-api-object';

/*
 * Classes related to Facebook profiles.
 *
 * Profiles are Users, Pages, Groups, Events and Applications.
 */

declare var conf: {
    fb: { apiUrl: string }
};

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
    /*
     * Get the url to the icon for this Profile.
     */
    get picture() {
        return conf.fb.apiUrl + '/' + this.id + '/picture';
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

