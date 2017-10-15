import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';
import {Page, PageType, DUMMY_PAGE_TYPE} from './page';
import {PageService} from './page.service';
import {
    CoverPhoto,
    CoverPhotoType,
    DUMMY_COVER_PHOTO_TYPE
} from './cover-photo';

/*
 * Classes related to handling Facebook users.
 */

enum AgeRange {
    JUVENILE,
    ADOLESCENT,
    MATURE
}

enum Gender {
    M,
    F,
    N
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
    cover?: CoverPhotoType;
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
        if (kwargs.cover) { this.cover = new CoverPhoto(kwargs.cover); }
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
    location: Page;

    /*
     * The CoverPhoto of this User.
     */
    cover?: CoverPhoto;

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
        if (!this.age_range) { return null; }
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

    /*
     * Get the gender of the User.
     *
     * This only distinguishes between male, female and other, to keep things 
     * simple.
     */
    get sex() {
        if (!this.gender) { return null; }
        switch (this.gender) {
            case 'male': return Gender.M;
            case 'female': return Gender.F;
            default: return Gender.N;
        }
    }

    /*
     * Tooltip for the age.
     */
    get ageTooltip() {
        if (this.age) {
            return this.age + " Jahre.";
        }
        switch (this.ageRange) {
            case AgeRange.JUVENILE: return "14 bis 17 Jahre alt.";
            case AgeRange.ADOLESCENT: return "Zwischen 18 und 20.";
            case AgeRange.MATURE: return "21 oder älter.";
            default: return "Alter unbekannt.";
        }
    }

    /*
     * Tooltip for the sex.
     */
    get sexTooltip() {
        // TODO
        // Calling everybody who identifies as neiter male, nor female trans, is 
        // bound to get the SJWs worked up, but I can't seem to find another 
        // word, that would be more accurate and is still common enough, that 
        // the user can be expected to know what is meant.
        switch (this.sex) {
            case Gender.M: return "männlich";
            case Gender.F: return "weiblich";
            case Gender.N: return "transsexuell";
            default: return "Geschlecht unbekannt";
        }
    }

    /*
     * Tooltip for the location.
     */
    get locationTooltip() {
        return this.location ? this.location.description : "Wohnort unbekannt";
    }

    /*
     * The users age represented as a string.
     */
    get ageString() {
        return String(
            this.age || this.age_range ? ('' + this.age_range.min + '+') : '-');
    }

    /*
     * The users sex represented as a string.
     */
    get sexString() {
        switch (this.sex) {
            case Gender.M: return "♂";
            case Gender.F: return "♀";
            case Gender.N: return "⚦";
            default: return "-";
        }
    }

    /*
     * The users location represented as a string.
     */
    get locationString() {
        return this.location ? this.location.name : '-';
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
    about: '',
    cover: DUMMY_COVER_PHOTO_TYPE
};

