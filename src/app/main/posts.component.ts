import {Component, Input, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {Post} from '../post';

/*
 * The Component showing the list of posts.
 */

@Component({
    selector: 'posts',
    templateUrl: './_posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent {
    constructor(
        protected mdSnackBar: MdSnackBar,
        protected activatedRoute: ActivatedRoute) {}

    /*
     * All posts shown by this Component.
     */
    protected _posts: Post[];

    /*
     * True if no more posts can be loaded.
     */
    protected _loaded: boolean;

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
    set posts(posts: Observable<Post>|undefined) {
        if (posts) {
            this._posts = [];
            this._loaded = this.loaded;
            posts
                .finally(() => this._loaded = true)
                .subscribe(
                    post => this._posts.push(post),
                    err => GraphApiErrorComponent.show(this.mdSnackBar, err));
        }
    }
}

