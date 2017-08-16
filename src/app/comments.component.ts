import {Component, Input} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {Comment} from './comment';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'comments',
    templateUrl: './_comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    constructor(private mdSnackBar: MdSnackBar) {}

    /*
     * All Comments shown by this Component.
     */
    _comments: Comment[];

    /*
     * Whether more comments can currently be loaded.
     */
    _loaded: boolean;

    @Input()
    loaded: boolean;

    @Input()
    set comments(comments: Observable<Comment>) {
        this._comments = [];
        this._loaded = this.loaded;
        comments
            .finally(() => this._loaded = true)
            .subscribe(
                comment => this._comments.push(comment),
                err => showGraphApiError(this.mdSnackBar, err));
    }
}

