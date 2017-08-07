import {Component, OnInit, Input} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {Comment} from './comment';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'comments',
    template: `
        <md-card *ngFor='let comment of _comments'>
            <comment [comment]='comment'></comment>
        </md-card>
        <md-spinner color='accent' *ngIf='!loaded'>
        </md-spinner>
    `,
    styleUrls: ['dist/comments.component.css']
})
export class CommentsComponent implements OnInit {
    constructor(private mdSnackBar: MdSnackBar) {}

    @Input()
    comments: Observable<Comment>;

    /*
     * All Comments shown by this Component.
     */
    _comments: Comment[] = [];

    /*
     * The error that occured, if any.
     */
    graphApiError: GraphApiError;

    /*
     * True if no more Comments can be loaded.
     */
    @Input()
    loaded = false;

    ngOnInit() {
        this.comments
            .finally(() => this.loaded = true)
            .subscribe(
                comment => this._comments.push(comment),
                err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
    }
}

