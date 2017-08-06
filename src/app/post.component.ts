import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {Post} from './post';
import {PostService} from './post.service';
import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {PostContentType} from './post';
import {VideoService} from './video.service';
import {Video} from './video';

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
            <h1>
                <span><img [src]='post.from.picture'></span>
                {{post.from.name}}
            </h1>
            <blockquote>
                <p>{{post.text}}</p>
            </blockquote>
            <blockquote *ngIf='post.link' class='accent'>
                <p>
                    <a [href]='post.link' target='_blank'>{{post.link}}</a>
                </p>
            </blockquote>
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
     * The video of the post, if any.
     */
    video?: Video;

    /*
     * The error that occured, if any.
     */
    graphApiError?: GraphApiError;

    ngOnInit() {
        const post = this.activatedRoute
            .params
            .first()
            .switchMap((params: Params) =>
                this.postService.post(params['page'] + '_' + params['post']));
        post.subscribe(
            post => this.post = post,
            err =>
                this.graphApiError = showGraphApiError(this.mdSnackBar, err));
        post
            .filter(post => post.contentType == PostContentType.video)
            .concatMap(post => post.video)
            .subscribe(
                video => this.video = video,
                err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
    }
}

