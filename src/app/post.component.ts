import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
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

/*
 * The Component showing a single post in detail.
 */

@Component({
    selector: 'post',
    template: `
        <md-spinner color='accent' *ngIf='!post && !graphApiError'></md-spinner>
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
export class PostComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private postService: PostService,
        private mdSnackBar: MdSnackBar,
        private videoService: VideoService) {}

    private PostContentType = PostContentType;

    @Input()
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
     * The error that occured, if any.
     */
    graphApiError?: GraphApiError;

    ngOnInit() {
        const post = this.activatedRoute
            .params
            .first()
            .switchMap((params: Params) =>
                this.postService.post(params['post']));
        post.subscribe(
            post => this.post = post,
            err =>
                this.graphApiError = showGraphApiError(this.mdSnackBar, err));
        post
            .map(post => post.video)
            .filter(Boolean)
            .concatAll()
            .subscribe(
                (video: Video) => this.video = video,
                (err: GraphApiError) =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
        this.comments = post.switchMap(post => post.comments);
    }
}

