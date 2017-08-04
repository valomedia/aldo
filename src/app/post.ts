import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';
import {Profile, ProfileType, DUMMY_PROFILE_TYPE} from './profile';

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
    from: ProfileType,
    to?: ProfileType[]
}

/*
 * A Facebook post as used internally.
 */
export class Post extends GraphApiObject {
    constructor(kwargs: PostType) {
        kwargs = {
            ...kwargs,
            from: new Profile(kwargs.from),
            to: (kwargs.to || []).map(profileType => new Profile(profileType))
        };
        super(kwargs);
    }

    /*
     * The Profile that sent this Post.
     */
    from: Profile;

    /*
     * Profiles mentioned or targeted in this Post.
     */
    to: Profile[];

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

    /*
     * Get a link to this post in the app.
     */
    get path() {
        return '/' + this.id.replace('_', '/');
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
    created_time: '',
    from: DUMMY_PROFILE_TYPE
};

