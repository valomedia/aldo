import {Component, Input, Inject, ViewChild, ElementRef} from '@angular/core';
import {MdSnackBar} from '@angular/material';

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
        protected mdSnackBar: MdSnackBar,
        protected utilService: UtilService,
        protected appRoutingService: AppRoutingService) {}

    @Input()
    loaded: boolean;

    protected params = this.appRoutingService.params;
    protected _loaded: boolean;

    /*
     * The Comment this Component is currently displaying.
     */
    protected _comment: Comment;

    /*
     * The Comments on this Comment, if any.
     */
    protected comments: Comment[];

    /*
     * The Video of the Comment, if any.
     */
    protected video?: Video;

    @Input()
    set comment(comment: Comment) {
        this._loaded = this.loaded;
        this.comments = [];
        this.video = null;
        this._comment = comment;
        comment.comments.finally(() => this._loaded = true).subscribe(
            comment => this.comments.push(comment),
            err => GraphApiErrorComponent.show(this.mdSnackBar, err));
        if (comment.video) {
            comment.video.subscribe(
                video => this.video = video,
                err => GraphApiErrorComponent.show(this.mdSnackBar, err));
        }
    }
}

