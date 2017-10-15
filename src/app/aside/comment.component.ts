import {Component, Input, Inject, ViewChild, ElementRef} from '@angular/core';
import {MatSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {Comment} from '../comment';
import {Video} from '../video';
import {UtilService} from '../util.service';
import {AppRoutingService} from '../app-routing.service';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'comment',
    templateUrl: './_comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent {
    constructor(
        protected matSnackBar: MatSnackBar,
        protected utilService: UtilService,
        protected appRoutingService: AppRoutingService) {}

    protected params = this.appRoutingService.events;
    protected _loaded = false;

    /*
     * The Comment this Component is currently displaying.
     */
    protected _comment?: Comment;

    /*
     * The Comments on this Comment, if any.
     */
    protected comments: Comment[];

    /*
     * The Video of the Comment, if any.
     */
    protected video?: Video;

    /*
     * Whether to override the loading indicator.
     *
     * If the containing Component knows for a fact, that the data to be shown 
     * is already available, it can set this flag to cause to component to never 
     * show a spinner.  This can be helpful in situations, where the spinner 
     * would otherwise only appear for a few milliseconds, causing an 
     * odd-looking twitch in the application.
     */
    @Input()
    loaded = false;

    @Input()
    set comment(comment: Comment|undefined) {
        if (comment) {
            this._loaded = this.loaded;
            this.comments = [];
            this.video = null;
            this._comment = comment;
            comment.comments.finally(() => this._loaded = true).subscribe(
                comment => this.comments.push(comment),
                err => GraphApiErrorComponent.show(this.matSnackBar, err));
            if (comment.video) {
                comment.video.subscribe(
                    video => this.video = video,
                    err => GraphApiErrorComponent.show(this.matSnackBar, err));
            }
        }
    }
    get comment() {
        return this._comment;
    }
}

