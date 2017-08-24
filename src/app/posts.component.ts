import {Component, Input, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {Post} from './post';

/*
 * The Component showing the list of pages.
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

    @Input()
    loaded = false;

    @Input()
    set posts(posts: Observable<Post>) {
        this._posts = [];
        this._loaded = this.loaded;
        posts
            .finally(() => this._loaded = true)
            .subscribe(
                post => this._posts.push(post),
                err => showGraphApiError(this.mdSnackBar, err));
    }
}

