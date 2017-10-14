import {Component, Input} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {Comment} from '../comment';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'comments',
    templateUrl: './_comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    constructor(protected mdSnackBar: MdSnackBar) {}

    /*
     * All Comments shown by this Component.
     */
    _comments: Comment[];

    /*
     * Whether more comments can currently be loaded.
     */
    _loaded = false;

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
    set comments(comments: Observable<Comment>|undefined) {
        if (comments) {
            this._comments = [];
            this._loaded = this.loaded;
            comments
                .finally(() => this._loaded = true)
                .subscribe(
                    comment => this._comments.push(comment),
                    err => GraphApiErrorComponent.show(this.mdSnackBar, err));
        }
    }
}

