import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/bufferCount';

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
        protected matSnackBar: MatSnackBar,
        protected activatedRoute: ActivatedRoute) {}

    /*
     * All posts shown by this Component.
     */
    protected _posts: Post[][];

    /*
     * True if no more posts can be loaded.
     */
    protected _loaded: boolean;

    /*
     * The internal number of columns.
     *
     * The number of columns is locked, once the Observable is set.
     */
    protected _cols: number;

    /*
     * The number of columns (out of twelve), each post should use.
     */
    @Input()
    cols = 12;

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
            this._cols = this.cols;
            this._posts = Array.from(
                {length: Math.floor(12 / this._cols)},
                () => []);
            this._loaded = this.loaded;
            posts
                .finally(() => this._loaded = true)
                .bufferCount(Math.floor(12 / this._cols))
                .subscribe(
                    posts => posts.map((e: Post, i: number) => this._posts[i].push(e)),
                    err => GraphApiErrorComponent.show(this.matSnackBar, err));
        }
    }
}

