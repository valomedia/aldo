import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';
import {Profile, ProfileType, DUMMY_PROFILE_TYPE} from './profile';
import {VideoService} from './video.service';
import {CommentService} from './comment.service';
import {UtilService} from './util.service';
import {ProfileService} from './profile.service';
import {ServiceService} from './service.service';

/*
 * Classes related to Facebook comments.
 */

/*
 * A Facebook comment as returned by the Facebook API.
 */
export interface CommentType extends GraphApiObjectType {
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
    likes: {
        data: {
            name: string;
            id: string;
        }[];
        summary: {
            total_count: number;
            can_like: boolean;
            has_liked: boolean;
        }
    }
}

/*
 * A Facebook post as used internally.
 */
export class Comment extends GraphApiObject {
    constructor(kwargs: CommentType) {
        super(kwargs);
        this.from = new Profile(kwargs.from);
        this.profileService
            .profile(kwargs.from.id)
            .subscribe(profile => this.from = profile);
    }

    protected get utilService() {
        return this.serviceService.utilService;
    }

    protected get videoService() {
        return this.serviceService.videoService;
    }

    protected get commentService() {
        return this.serviceService.commentService;
    }

    protected get profileService() {
        return this.serviceService.profileService;
    }

    /*
     * The Profile that sent this Post.
     */
    from: Profile;

    /*
     * Get an Observable of the Video attached to this Comment.
     *
     * If no Video is attached to the Comment, or if the Comment is not a Video 
     * Comment, this will return false.
     */
    get video() {
        return this.attachment
            && this.attachment.type === 'video_inline'
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

    /*
     * Tooltip showing detail on the comment likes.
     */
    get likeTooltip() {
        if (this.likes.data.length) {
            return this.likes
                    .data
                    .map(profile => profile.name)
                    .slice(0, -1)
                    .join(', ')
                + (this.like_count - this.likes.data.length
                    ? ", "
                    + this.likes.data.slice(-1)[0].name
                    + " und "
                    + (this.like_count - this.likes.data.length)
                    + (this.like_count - this.likes.data.length - 1
                        ? " weiteren Nutzern"
                        : " weiterem Nutzer")
                    : (this.likes.data.length === 1 ? '' : " und ")
                    + this.likes.data.slice(-1)[0].name)
                + " gefällt das";
        } else {
            return (this.like_count === 1
                    ? "Einem Nutzer"
                    : this.like_count
                    + " Nutzern")
                + " gefällt das";
        }
    }

    /*
     * Tooltip for the reply count.
     */
    get replyTooltip() {
        return "Dieser Kommentar hat "
            + this.comment_count
            + (this.comment_count === 1 ? " Antwort" : " Antworten");
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
    comment_count: 0,
    likes: {
        data: [{
            name: '',
            id: ''
        }],
        summary: {
            total_count: 0,
            can_like: false,
            has_liked: false
        }
    }
};

