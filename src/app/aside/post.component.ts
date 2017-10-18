import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {Post} from '../post';
import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {PostContentType} from '../post';
import {Video} from '../video';
import {GraphApiResponse} from '../graph-api-response';
import {Comment} from '../comment';
import {AppService} from '../app.service';
import {AppUxService} from '../app-ux.service';
import {UtilService} from '../util.service';
import {AppRoutingService} from '../app-routing.service';

/*
 * The Component showing a single Post in detail.
 */

@Component({
    selector: 'post',
    templateUrl: './_post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent {
    constructor(
        protected matSnackBar: MatSnackBar,
        protected appService: AppService,
        protected appUxService: AppUxService,
        protected utilService: UtilService,
        protected appRoutingService: AppRoutingService
    ) {}

    /*
     * The Post this Component is currently showing.
     */
    protected _post?: Post;

    protected PostContentType = PostContentType;

    /*
     * The Video of the Post, if any.
     */
    video?: Video;

    /*
     * The Comments on this Post.
     */
    comments: Observable<GraphApiResponse<Comment>>;

    /*
     * The ID of the Profile the user is currently looking at.
     *
     * This is used to check whether the show profile button needs to be 
     * disabled.
     */
    @Input()
    profileId?: string;

    @Input()
    set post(post: Post|undefined) {
        if (post) {
            this._post = post;
            this.comments = post.comments;
            this.video = null;
            if (post.video) {
                post.video.subscribe(
                    (video: Video) => this.video = video,
                    (err: GraphApiError) =>
                        GraphApiErrorComponent.show(this.matSnackBar, err));
            }
        }
    }
    get post() {
        return this._post;
    }
}

