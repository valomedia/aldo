import {ReflectiveInjector} from '@angular/core';

import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';
import {Profile, ProfileType, DUMMY_PROFILE_TYPE} from './profile';
import {VideoService} from './video.service';
import {CommentService} from './comment.service';
import {UtilService} from './util.service';

/*
 * Classes related to Facebook comments.
 */

/*
 * A Facebook comment as returned by the Facebook API.
 */
export interface CommentType extends GraphApiObjectType {
    created_time: string;
    from: ProfileType;
    message: string;
    attachment?: {
        media: {
            image: {
                height: number;
                width: number;
                src: string;
            };
        };
        target: {
            id: string;
            url: string;
        };
        type: string;
        url: string;
    };
    like_count: number;
    comment_count: number;
}

/*
 * A Facebook post as used internally.
 */
export class Comment extends GraphApiObject {
    constructor(kwargs: CommentType) {
        kwargs = {
            ...kwargs,
            from: new Profile(kwargs.from)
        };
        super(kwargs);
        this.utilService = ReflectiveInjector
            .resolveAndCreate([UtilService])
            .get(UtilService);
        this.videoService = this.utilService.inject(VideoService);
        this.commentService = this.utilService.inject(CommentService);
    }

    private utilService: UtilService;
    private videoService: VideoService;
    private commentService: CommentService;

    /*
     * The Profile that sent this Post.
     */
    from: Profile;

    /*
     * Get the time this post was created.
     */
    get createdTime() {
        return new Date(this.created_time);
    }

    /*
     * Get a Promise for the Video attached to this Comment.
     *
     * If no Video is attached to the Comment, or if the Comment is not a Video 
     * Comment, this will return false.
     */
    get video() {
        return this.attachment
            && this.attachment.type == 'video_inline'
            && this.videoService.video(this.attachment.target.id);
    }

    /*
     * Get an Observable for the Comments on this Comment.
     */
    get comments() {
        return this.commentService
            .comments(this.id)
            .concatMap(res => res.expanded);
    }
}
export interface Comment extends CommentType {}

/*
 * The simplest valid Comment.
 *
 * This exists, so the CommentService can use it to check which fields to 
 * request from Facebook, thus allowing adding a field to Comment without 
 * changing CommentService.
 */
export const DUMMY_COMMENT_TYPE: CommentType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    created_time: '',
    from: DUMMY_PROFILE_TYPE,
    message: '',
    attachment: {
        media: {
            image: {
                height: 0,
                width: 0,
                src: ''
            }
        },
        target: {
            id: '',
            url: ''
        },
        type: '',
        url: ''
    },
    like_count: 0,
    comment_count: 0
};

