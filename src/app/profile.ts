
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
export interface ProfileType {
    id: Number;
    name: String;
    icon?: String;
}

/*
 * A Facebook profile as used internally.
 */
export class Profile {
    constructor(kwargs: ProfileType) { Object.assign(this, kwargs); }

    getIcon() {
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
export const EMPTY_PROFILE = new Profile({
    id: 0,
    name: '',
});

