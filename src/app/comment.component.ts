import {Component, Input, Inject, ViewChild, ElementRef} from '@angular/core';
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
        <div *ngIf='_comment.attachment'>
            <a *ngIf='!video' [href]='_comment.attachment.url' target='_blank'>
                <img md-card-image [src]='_comment.attachment.media.image.src'>
            </a>
            <video
                    *ngIf='video'
                    md-card-image
                    controls
                    preload='metadata'
                    [poster]='_comment.attachment.media.image.src'>
                <source [src]='video.source'>
            </video>
        </div>
        <profile [profile]='_comment.from'></profile>
        <md-card-content *ngIf='_comment.message'>
            <p>{{_comment.message}}</p>
        </md-card-content>
        <md-card-content>
            <blockquote *ngFor='let comment of comments'>
                <p>
                    <strong>
                        <span class='text-primary'>@</span>{{comment.from.name}}
                    </strong>
                    <a
                            *ngIf='comment.attachment'
                            md-button
                            color='accent'
                            class='app-icon-button'
                            [href]='comment.attachment.url'
                            target='_blank'>
                        <md-icon>attachment</md-icon>
                    </a>
                    <br>
                    {{comment.message}}
                </p>
            </blockquote>
            <md-spinner *ngIf='!_loaded' color='accent'></md-spinner>
        </md-card-content>
        <md-card-footer>
            <div>
                <p>
                    <span
                            mdTooltip="Likes"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'>
                        <span class='text-primary'>
                            <md-icon>thumb_up</md-icon>
                        </span>
                        <span class='text-accent'>
                            <strong>{{_comment.like_count}}</strong>
                        </span>
                    </span>
                    <span
                            mdTooltip="Antworten"
                            mdTooltipShowDelay='1500'
                            mdTooltipHideDelay='1500'>
                        <span class='text-primary'>
                            <md-icon>reply</md-icon>
                        </span>
                        <span class='text-accent'>
                            <strong>{{_comment.comment_count}}</strong>
                        </span>
                    </span>
                </p>
            </div>
        </md-card-footer>
        <md-card-actions>
            <div class='dummy-input'>
                <input
                        #clipboardDummy
                        type='text'
                        value='https://facebook.com/{{_comment.id}}'>
            </div>
            <a md-button (click)='copy()'>
                Link kopieren
                <md-icon>insert_link</md-icon>
            </a>
            <a
                    md-button
                    color='primary'
                    href='//facebook.com/{{_comment.id}}'
                    target='_blank'>
                Facebook öffnen
                <md-icon>open_in_browser</md-icon>
            </a>
        </md-card-actions>
    `,
    styleUrls: ['dist/comment.component.css']
})
export class CommentComponent {
    constructor(
        private mdSnackBar: MdSnackBar,
        @Inject(DOCUMENT)
        private document: Document) {}

    private _loaded: boolean;

    /*
     * The Comment this Component is currently displaying.
     */
    private _comment: Comment;

    /*
     * The Comments on this Comment, if any.
     */
    private comments: Comment[];

    /*
     * The Video of the Comment, if any.
     */
    private video?: Video;

    @ViewChild('clipboardDummy')
    clipboardDummy: ElementRef;

    @Input()
    loaded: boolean;

    @Input()
    set comment(comment: Comment) {
        this._loaded = this.loaded;
        this.comments = [];
        this.video = null;
        this._comment = comment;
        comment
            .comments
            .finally(() => this._loaded = true)
            .subscribe(
                comment => this.comments.push(comment),
                err => showGraphApiError(this.mdSnackBar, err));
        comment.video
            && comment
                .video
                .then(video => this.video = video)
                .catch(err => showGraphApiError(this.mdSnackBar, err));
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

