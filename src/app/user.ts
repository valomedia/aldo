import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';
import {Page, PageType, DUMMY_PAGE_TYPE} from './page';
import {PageService} from './page.service';

/*
 * Classes related to handling Facebook users.
 */

enum AgeRange {
    JUVENILE,
    ADOLESCENT,
    MATURE
}

/*
 * A Facebook user as returned by the Facebook API.
 */
export interface UserType extends ProfileType {
    age_range?: {
        min: number;
        max?: number;
    };
    birthday?: string;
    gender?: string;
    location?: PageType;
    about?: string;
};

/*
 * A Facebook user as used internally.
 */
export class User extends Profile {
    constructor(kwargs: UserType) {
        super(kwargs);
        if (kwargs.location) {
            this.location = new Page(kwargs.location);
            this.pageService
                .page(kwargs.location.id)
                .subscribe(page => this.location = page);
        }
    }

    protected get postService() {
        return this.serviceService.postService;
    }

    protected get pageService() {
        return this.serviceService.pageService;
    }

    /*
     * The Page for the place where the User lives.
     */
    location:  Page;

    /*
     * Get the feed of Posts of this User.
     */
    get feed() {
        return this.postService.feed(this.id);
    }

    /*
     * Get the AgeRange the User is in.
     */
    get ageRange() {
        switch (this.age_range.min) {
            case 13:
                if (this.age_range.max === 17) { return AgeRange.JUVENILE; }
                break;
            case 17:
                if (this.age_range.max === 20) { return AgeRange.ADOLESCENT; }
                break;
            case 21:
                return AgeRange.MATURE;
        }
        return null;
    }

    /*
     * Get the Users birthday.
     *
     * If the User does not share their age, the year will be 1900.
     */
    get birthDate() {
        return this.birthday && this.birthday.indexOf('/') !== -1
            ? new Date(
                +this.birthday.split('/')[2] || null,
                +this.birthday.split('/')[0] - 1,
                +this.birthday.split('/')[1] - 1)
            : null;
    }

    /*
     * Get the Users age.
     *
     * If the user does not share their birthday this may be approximate.
     */
    get age() {
        return this.birthday
            ? new Date().getFullYear()
                - (this.birthDate
                    ? this.birthDate.getFullYear()
                    : +this.birthday)
                - +(this.birthDate
                    && +new Date(0, new Date().getMonth(), new Date().getDate())
                            - +new Date(
                                0,
                                this.birthDate.getMonth(),
                                this.birthDate.getDate())
                        < 0)
            : null;
    }

    /*
     * Get a description of the User.
     *
     * This is just an alias for the about field, since most types of Profiles 
     * have a field called description, that has a similar purpose.
     */
    get description() {
        return this.about;
    }

    /*
     * Get a biography of the User.
     *
     * This is an alias for the about field, for legacy reasons.
     */
    get bio() {
        return this.about;
    }
}
export interface User extends UserType {}

/*
 * The simplest valid User.
 *
 * This exists, so the UserService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to User without changing 
 * UserService.
 */
export const DUMMY_USER_TYPE: UserType = {
    ...DUMMY_PROFILE_TYPE,
    age_range: { min: 21 },
    birthday: '',
    gender: '',
    location: DUMMY_PAGE_TYPE,
    about: ''
};

