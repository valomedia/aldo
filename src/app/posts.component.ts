import {Component, OnInit, Input} from '@angular/core';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {Post} from './post';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'posts',
    template: `
        <a routerLink='{{post.path}}' *ngFor='let post of _posts'>
            <md-card>
                <img *ngIf='post.picture' md-card-image [src]='post.picture'>
                <profile [profile]='post.from'></profile>
                <md-card-content *ngIf='post.text'>
                    {{post.text}}
                </md-card-content>
            </md-card>
        </a>
        <md-spinner color='accent' *ngIf='!loaded'>
        </md-spinner>
    `,
    styleUrls: ['dist/posts.component.css']
})
export class PostsComponent implements OnInit {
    constructor(private mdSnackBar: MdSnackBar) {}

    @Input()
    posts: Observable<Post>;

    /*
     * All posts shown by this Component.
     */
    _posts: Post[] = [];

    /*
     * The error that occured, if any.
     */
    graphApiError: GraphApiError;

    /*
     * True if no more posts can be loaded.
     */
    @Input()
    loaded = false;

    ngOnInit() {
        this.posts
            .finally(() => this.loaded = true)
            .subscribe(
                post => this._posts.push(post),
                err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
    }
}

