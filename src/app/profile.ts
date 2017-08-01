import {GraphApiObject, GraphApiObjectType, EMPTY_GRAPH_API_OBJECT}
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
    icon?: string;
}

/*
 * A Facebook profile as used internally.
 */
export class Profile extends GraphApiObject {
    constructor(kwargs: ProfileType) {
        super(kwargs);
    }

    /*
     * Get the url to the icon for this Profile.
     */
    get iconUrl() {
        return this.icon || conf.fb.apiUrl + '/' + this.id + '/picture';
    }
}
export interface Profile extends ProfileType {}

/*
 * The simplest valid profile.
 *
 * This exists, so the Users and Pages can use it to build their EMPTY 
 * constants.
 */
export const EMPTY_PROFILE: ProfileType = {
    ...EMPTY_GRAPH_API_OBJECT,
    name: ''
};

