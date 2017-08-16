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
    templateUrl: './_post.component.html',
    styleUrls: ['./post.component.css']
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

