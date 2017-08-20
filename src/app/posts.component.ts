import {Component, Input, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';

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
        <a *ngFor='let post of _posts' [appLink]='{post: post.id}'>
            <md-card>
                <img *ngIf='post.picture' md-card-image [src]='post.picture'>
                <profile [profile]='post.from'></profile>
                <md-card-content *ngIf='post.text'>
                    {{post.text}}
                </md-card-content>
            </md-card>
        </a>
        <md-spinner color='accent' *ngIf='!_loaded'></md-spinner>
    `,
    styleUrls: ['dist/posts.component.css']
})
export class PostsComponent {
    constructor(
        private mdSnackBar: MdSnackBar,
        private activatedRoute: ActivatedRoute) {}

    /*
     * All posts shown by this Component.
     */
    private _posts: Post[];

    /*
     * True if no more posts can be loaded.
     */
    private _loaded: boolean;

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

