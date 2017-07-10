
/*
 * Classes related to handling Facebook pages.
 */

/*
 * Types of content available for posting.
 */
export enum ContentType {
    Link,
    Photo,
    Video
}

/*
 * A Facebook page as returned by the Facebook API.
 */
export interface PageType {
    id: Number;
    access_token: String;
    name: String;
    fan_count: Number;
    new_like_count: Number;
    overall_star_rating: Number;
    rating_count: Number;
    talking_about_count: Number;
};

/*
 * A Facebook page as used internally.
 */
export class Page {
    constructor(kwargs: PageType) {
        return Object.assign(this, kwargs);
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
export const EMPTY_PAGE = new Page({
    id: 0,
    access_token: '',
    name: '',
    fan_count: 0,
    new_like_count: 0,
    overall_star_rating: 0,
    rating_count: 0,
    talking_about_count: 0
});

