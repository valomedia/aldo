import {Component, Input, forwardRef} from '@angular/core';
import {Params} from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {Post} from './post';
import {PostService} from './post.service';
import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {PostContentType} from './post';
import {VideoService} from './video.service';
import {Video} from './video';
import {GraphApiResponse} from './graph-api-response';
import {Comment} from './comment';
import {AppRoutingComponent} from './app-routing.component';
import {AppRoutingService} from './app-routing.service';

/*
 * The Component showing a single post in detail.
 */

@Component({
    selector: 'post',
    template: `
        <md-spinner color='accent' *ngIf='!_loaded'></md-spinner>
        <div *ngIf='post'>
            <div *ngIf='post.picture' class='picture'>
                <a [href]='post.link' target='_blank'>
                    <img *ngIf='!video' [src]='post.picture'>
                </a>
                <video
                        *ngIf='video'
                        controls
                        preload='metadata'
                        [poster]='post.picture'>
                    <source [src]='video.source'>
                </video>
            </div>
            <h2>
                <img [src]='post.from.picture'>
                <span>
                    {{post.from.name}}
                    <br>
                    <small>{{post.name}}</small>
                </span>
                <span
                        *ngIf='post.likes.summary.total_count'
                        mdTooltip="Likes"
                        mdTooltipShowDelay='1500'
                        mdTooltipHideDelay='1500'>
                    <span class='text-primary'>
                        <md-icon>thumb_up</md-icon>
                    </span>
                    <span class='text-accent'>
                        {{post.likes.summary.total_count}}
                    </span>
                </span>
                <span
                        *ngIf='post.shares'
                        mdTooltip="Shares"
                        mdTooltipShowDelay='1500'
                        mdTooltipHideDelay='1500'>
                    <span class='text-primary'>
                        <md-icon>share</md-icon>
                    </span>
                    <span class='text-accent'>
                        {{post.shares.count}}
                    </span>
                </span>
            </h2>
            <blockquote>
                <p>{{post.text}}</p>
            </blockquote>
            <blockquote *ngIf='post.link' class='accent'>
                <p>
                    <a [href]='post.link' target='_blank'>
                        {{post.caption || post.link}}
                    </a>
                </p>
                <p *ngIf='post.description'>{{post.description}}</p>
            </blockquote>
            <endless-list #commentList [input]='comments'>
                <comments [comments]='commentList.output'></comments>
            </endless-list>
        </div>
    `,
    styleUrls: ['dist/post.component.css']
})
export class PostComponent extends AppRoutingComponent {
    constructor(
        private postService: PostService,
        private mdSnackBar: MdSnackBar,
        private videoService: VideoService,
        appRoutingService: AppRoutingService
    ) {
        super(appRoutingService);
    }

    private PostContentType = PostContentType;

    /*
     * The Post this Component is currently showing.
     */
    post: Post;

    /*
     * The Video of the Post, if any.
     */
    video?: Video;

    /*
     * The Comments on this Post.
     */
    comments: Observable<GraphApiResponse<Comment>>;

    /*
     * Whether the component is still loading.
     */
    private _loaded: boolean;

    @Input()
    loaded: boolean;

    @Input()
    set params(params: Params) {
        this._loaded = this.loaded;
        Observable.fromPromise(this.postService.post(params['post']))
            .finally(() => this._loaded = true)
            .subscribe(
                (post: Post) => {
                    this.post = post;
                    this.comments = post.comments;
                },
                (err: GraphApiError) =>
                    showGraphApiError(this.mdSnackBar, err));
        Observable.fromPromise(this.postService.post(params['post']))
            .map(post => post.video)
            .do(this.video = null)
            .filter(Boolean)
            .concatAll()
            .subscribe(
                (video: Video) => this.video = video,
                (err: GraphApiError) =>
                    showGraphApiError(this.mdSnackBar, err));
    }
}

