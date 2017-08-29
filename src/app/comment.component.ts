import {Component, Input, Inject, ViewChild, ElementRef} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {DOCUMENT} from '@angular/common';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {Comment} from './comment';
import {Video} from './video';

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

