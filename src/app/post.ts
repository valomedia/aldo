import {GraphApiObject, GraphApiObjectType, DUMMY_GRAPH_API_OBJECT_TYPE}
    from './graph-api-object';

/*
 * Classes related to Facebook posts.
 */

/*
 * A Facebook post as returned by the Facebook API.
 */
export interface PostType extends GraphApiObjectType {
    message: string;
    story: string;
    created_time: string;
}

/*
 * A Facebook post as used internally.
 */
export class Post extends GraphApiObject {
    constructor(kwargs: PostType) {
        super(kwargs);
    }

    /*
     * Get the text to display for this Post.
     */
    get text() {
        return this.message || this.story;
    }

    /*
     * Get the time this post was created.
     */
    get createdTime() {
        return new Date(this.created_time);
    }
}
export interface Post extends PostType {}

/*
 * The simplest valid post.
 *
 * This exists, so the PageService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Post without changing 
 * PageService.
 */
export const DUMMY_POST_TYPE: PostType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    message: '',
    story: '',
    created_time: ''
};

