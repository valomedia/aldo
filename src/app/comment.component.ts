import {
    Component,
    OnInit,
    Input,
    Inject,
    ViewChild,
    ElementRef
} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {DOCUMENT} from '@angular/common';

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
            <a *ngIf='!video' [href]='comment.attachment.url' target='_blank'>
                <img md-card-image [src]='comment.attachment.media.image.src'>
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
            <p>{{comment.message}}</p>
        </md-card-content>
        <md-card-content>
            <blockquote *ngFor='let comment of comments'>
                <p>
                    <strong>@{{comment.from.name}}</strong>
                    <a
                            *ngIf='comment.attachment'
                            md-button
                            color='primary'
                            class='app-icon-button'
                            [href]='comment.attachment.url'
                            target='_blank'>
                        <md-icon>attachment</md-icon>
                    </a>
                    <br>
                    {{comment.message}}
                </p>
            </blockquote>
        </md-card-content>
        <md-card-footer>
            <div
                    mdTooltip="Likes"
                    mdTooltipShowDelay='1500'
                    mdTooltipHideDelay='1500'>
                <span class='text-primary'>
                    <md-icon>thumb_up</md-icon>
                </span>
                <span class='text-accent'>
                    <strong>{{comment.like_count}}</strong>
                </span>
            </div>
        </md-card-footer>
        <md-card-actions>
            <div class='dummy-input'>
                <input
                        #clipboardDummy
                        type='text'
                        value='https://facebook.com/{{comment.id}}'>
            </div>
            <button md-button (click)='copy()'>
                Link kopieren
                <md-icon>insert_link</md-icon>
            </button>
            <a
                    md-button
                    color='primary'
                    href='//facebook.com/{{comment.id}}'
                    target='_blank'>
                Facebook öffnen
                <md-icon>open_in_browser</md-icon>
            </a>
        </md-card-actions>
    `,
    styleUrls: ['dist/comment.component.css']
})
export class CommentComponent implements OnInit {
    constructor(
        private mdSnackBar: MdSnackBar,
        @Inject(DOCUMENT)
        private document: Document) {}

    @ViewChild('clipboardDummy')
    clipboardDummy: ElementRef;

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
        this.comment.video
            && this.comment
                .video
                .then(video => this.video = video)
                .catch(err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
    }

    /*
     * Copy the link to this comment to the clipboard.
     */
    copy() {
        this.clipboardDummy.nativeElement.select();
        this.document.execCommand('Copy');
        this.mdSnackBar.open("Link kopiert", undefined, {duration: 2000});
    }
}

