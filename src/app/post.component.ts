import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {Post} from './post';
import {PostService} from './post.service';
import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';

/*
 * The Component showing a single post in detail.
 */

@Component({
    selector: 'post',
    template: `
        <md-spinner color='accent' *ngIf='!post && !graphApiError'></md-spinner>
        <div *ngIf='post'>
            <h1>{{post.from.name}}</h1>
        </div>
    `,
    styleUrls: ['dist/post.component.css']
})
export class PostComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private postService: PostService,
        private mdSnackBar: MdSnackBar) {}

    @Input()
    post: Post;

    /*
     * The error that occured, if any.
     */
    graphApiError?: GraphApiError;

    ngOnInit() {
        this.activatedRoute
            .params
            .first()
            .switchMap((params: Params) =>
                this.postService.post(params['page'] + '_' + params['post']))
            .subscribe(
                post => this.post = post,
                err =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));

    }
}

