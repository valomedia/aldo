
/*
 * Classes related to Facebook posts.
 */

/*
 * A Facebook post as returned by the Facebook API.
 */
export interface PostType {
    id: number;
    message: string;
    story: string;
    created_time: string;
}

/*
 * A Facebook post as used internally.
 */
export class Post {
    constructor(kwargs: PostType) { Object.assign(this, kwargs); }

    /*
     * Get the text to display for this Post.
     */
    text() {
        return this.message || this.story;
    }

    /*
     * Get the time this post was created.
     */
    createdTime() {
        return new Date(this.created_time);
    }
}
export interface Post extends PostType {}

/*
 * The simplest valid profile.
 *
 * This exists, so the Users and Pages can use it to build their EMPTY 
 * constants.
 */
export const EMPTY_POST = new Post({
    id: 0,
    message: '',
    story: '',
    created_time: ''
});

