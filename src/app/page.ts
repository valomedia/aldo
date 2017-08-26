import {ReflectiveInjector} from '@angular/core';

import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';
import {UtilService} from './util.service';

/*
 * Classes related to handling Facebook pages.
 */

/*
 * A Facebook page as returned by the Facebook API.
 */
export interface PageType extends ProfileType {
    access_token: string;
    fan_count: number;
    new_like_count: number;
    overall_star_rating: number;
    rating_count: number;
    talking_about_count: number;
};

/*
 * A Facebook page as used internally.
 */
export class Page extends Profile {
    protected postService: PostService = this.utilService.inject(PostService);

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
    talking_about_count: 0
};

