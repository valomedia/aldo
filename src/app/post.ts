import {ReflectiveInjector} from '@angular/core';

import {Story, StoryType, DUMMY_STORY_TYPE} from './story';
import {Profile, ProfileType, DUMMY_PROFILE_TYPE} from './profile';
import {VideoService} from './video.service';
import {CommentService} from './comment.service';
import {UtilService} from './util.service';

/*
 * Classes related to Facebook posts.
 */

/*
 * The different types of post.
 */
export enum PostContentType {
    link,
    status,
    photo,
    video,
    offer
}

/*
 * A Facebook post as returned by the Facebook API.
 */
export interface PostType extends StoryType {
    message: string;
    story: string;
    from: ProfileType;
    to?: ProfileType[];
    picture?: string;
    full_picture?: string;
    object_id?: string;
    type: string;
    link?: string;
    name?: string;
    caption?: string;
    description?: string;
    shares?: {count: number};
    likes: {
        data: {name: string;}[];
        summary: {
            total_count: number;
            can_like: boolean;
            has_liked: boolean;
        }
    };
}

/*
 * A Facebook post as used internally.
 */
export class Post extends Story {
    constructor(kwargs: PostType) {
        kwargs = {
            ...kwargs,
            from: new Profile(kwargs.from),
            to: (kwargs.to || []).map(profileType => new Profile(profileType))
        };
        super(kwargs);
        this.utilService = ReflectiveInjector
            .resolveAndCreate([UtilService])
            .get(UtilService);
        this.videoService = this.utilService.inject(VideoService);
        this.commentService = this.utilService.inject(CommentService);
    }

    protected utilService: UtilService;
    protected videoService: VideoService;
    protected commentService: CommentService;

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
     *
     * This will return the message attached to the Post, or, in absence of 
     * that, the text of the story for the Post.  To work around a Facebook 
     * issue, this will return the text of a pseudo-story, if the story is not 
     * set and the Post has a Video attached.  If there is no message and no 
     * story to tell, this will return an empty string.
     */
    get text() {
        return this.message
            || this.story
            || this.contentType === PostContentType.video
            && this.from.name + " hat ein neues Video hinzugefügt."
            || '';
    }

    /*
     * Get a link to the picture for this post.
     *
     * This will be the picture for picture posts, the video thumbnail for video 
     * posts, or a picture scraped from the website at the link for link posts.
     */
    get picture() {
        return this.full_picture;
    }

    /*
     * Get the type of this Post.
     */
    get contentType(): PostContentType {
        return PostContentType[this.type];
    }

    /*
     * Get a promise for the video attached to this Post.
     *
     * If no video is attached to the post, or if the post is not a video post, 
     * this will return undefined.
     */
    get video() {
        return this.object_id
            && this.contentType === PostContentType.video
            && this.videoService.video(this.object_id);
    }

    /*
     * Get the Comments on this Post as an Observable of GraphApiResponses.
     */
    get comments() {
        return this.commentService.comments(this.id);
    }
}
export interface Post extends PostType {}

/*
 * The simplest valid Post.
 *
 * This exists, so the PageService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Post without changing 
 * PageService.
 */
export const DUMMY_POST_TYPE: PostType = {
    ...DUMMY_STORY_TYPE,
    message: '',
    story: '',
    from: DUMMY_PROFILE_TYPE,
    full_picture: '',
    object_id: '',
    type: '',
    link: '',
    name: '',
    caption: '',
    description: '',
    shares: {count: 0},
    likes: {
        data: [],
        summary: {
            total_count: 0,
            can_like: false,
            has_liked: false
        }
    }
};

