import {Component, OnInit, Input} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {Comment} from './comment';
import {Video} from './video';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'comment',
    template: `
        <div *ngIf='comment.attachment'>
            <a [href]='comment.attachment.url' target='_blank'>
                <img
                        *ngIf='!video'
                        md-card-image
                        [src]='comment.attachment.media.image.src'>
            </a>
            <video
                    *ngIf='video'
                    md-card-image
                    controls
                    preload='metadata'
                    [poster]='comment.attachment.media.image.src'>
                <source [src]='video.source'>
            </video>
        </div>
        <profile [profile]='comment.from'></profile>
        <md-card-content *ngIf='comment.message'>
            {{comment.message}}
        </md-card-content>
    `,
    styleUrls: ['dist/posts.component.css']
})
export class CommentComponent implements OnInit {
    constructor(private mdSnackBar: MdSnackBar) {}

    @Input()
    comment: Comment;

    /*
     * The comments on this Comment, if any.
     */
    comments: Comment[] = [];

    /*
     * The Video of the Comment, if any.
     */
    video?: Video;

    /*
     * The error that occured, if any.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.comment
            .comments
            .subscribe(
                comment => this.comments.push(comment),
                err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
        this.comment
            .video
            .then(video => this.video = video)
            .catch(err =>
                this.graphApiError = showGraphApiError(this.mdSnackBar, err));
    }
}

