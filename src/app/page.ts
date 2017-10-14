import {ReflectiveInjector} from '@angular/core';

import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';
import {
    CoverPhoto,
    CoverPhotoType,
    DUMMY_COVER_PHOTO_TYPE
} from './cover-photo';

/*
 * Classes related to handling Facebook pages.
 */

/*
 * A Facebook page as returned by the Facebook API.
 */
export interface PageType extends ProfileType {
    access_token?: string;
    fan_count?: number;
    new_like_count?: number;
    overall_star_rating?: number;
    rating_count?: number;
    talking_about_count?: number;
    likes?: {
        data: {
            name: string;
            id: string;
        }[];
    };
    description?: string;
    cover?: CoverPhotoType;
};

/*
 * A Facebook page as used internally.
 */
export class Page extends Profile {
    constructor(kwargs: PageType) {
        super(kwargs);
        if (kwargs.cover) { this.cover = new CoverPhoto(kwargs.cover); }
    }

    protected get postService() {
        return this.serviceService.postService;
    }

    /*
     * The CoverPhoto of this Page.
     */
    cover?: CoverPhoto;

    /*
     * Get the feed of Posts of this Page.
     */
    get feed() {
        return this.postService.feed(this.id);
    }

    /*
     * Get the Posts by this Page.
     */
    get posts() {
        return this.postService.posts(this.id);
    }

    /*
     * Get the Posts with this Page.
     */
    get tagged() {
        return this.postService.tagged(this.id);
    }

    /*
     * Tooltip showing detail on the page likes.
     */
    get likeTooltip() {
        if (this.likes) {
            return this.likes
                    .data
                    .slice(0, -1)
                    .map(page => page.name)
                    .join(', ')
                + (this.fan_count - this.likes.data.length
                    ? ", "
                    + this.likes.data.slice(-1)[0].name
                    + " und "
                    + (this.fan_count - this.likes.data.length)
                    + (this.fan_count - this.likes.data.length - 1
                            ? " weiteren Nutzern"
                            : " weiterem Nutzer")
                    : " und "
                    + this.likes.data.slice(-1)[0].name)
                + " gefällt diese Seite";
        } else {
            return (this.fan_count !== 1
                    ? '' + this.fan_count + " Nutzern"
                    : "Einem Nutzer")
                + " gefällt diese Seite";
        }
    }

    /*
     * Tooltip for the ratings.
     */
    get ratingTooltip() {
        return ''
            + this.rating_count
            + " Nutzer "
            + (this.rating_count === 1 ? "hat" : "haben")
            + " diese Seite mit "
            + (this.rating_count === 1 ? "" : "durchschnittlich ")
            + this.overall_star_rating
            + " ★ bewertet";
    }

    /*
     * Tooltip for the number of people talking about the page.
     */
    get talkingAboutTooltip() {
        return ''
            + this.talking_about_count
            + " Nutzer "
            + (this.talking_about_count === 1 ? "redet" : "reden")
            + " über diese Seite";
    }
}
export interface Page extends PageType {}

/*
 * The simplest valid page.
 *
 * This exists, so the PageService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Page without changing 
 * PageService.
 */
export const DUMMY_PAGE_TYPE: PageType = {
    ...DUMMY_PROFILE_TYPE,
    access_token: '',
    fan_count: 0,
    new_like_count: 0,
    overall_star_rating: 0,
    rating_count: 0,
    talking_about_count: 0,
    likes: {
        data: [{
            name: '',
            id: ''
        }]
    },
    description: '',
    cover: DUMMY_COVER_PHOTO_TYPE
};

