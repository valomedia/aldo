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
        <md-spinner color='accent' *ngIf='!loaded'></md-spinner>
    `,
    styleUrls: ['dist/comments.component.css']
})
export class CommentsComponent implements OnInit {
    constructor(private mdSnackBar: MdSnackBar) {}

    @Input()
    comments: Observable<Comment>;

    @Input()
    loaded: Boolean;

    /*
     * All Comments shown by this Component.
     */
    _comments: Comment[] = [];

    ngOnInit() {
        this.comments
            .finally(() => this.loaded = true)
            .subscribe(
                comment => this._comments.push(comment),
                err => showGraphApiError(this.mdSnackBar, err));
    }
}

