import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdDialog, MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/concatAll';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import {Page} from '../page';
import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {AppUxService} from '../app-ux.service';
import {PostService} from '../post.service';
import {Post} from '../post';
import {GraphApiResponse} from '../graph-api-response';
import {AppService} from '../app.service';
import {FbService} from '../fb.service';
import {AppRoutingService} from '../app-routing.service';
import {ConfService} from '../conf.service';

import {PostDialogComponent} from './post-dialog.component';

/*
 * The Component showing a single Page in detail.
 *
 * This is only used for the Pages the user is administrating.  Other Pages will 
 * be shown by the more general ProfileComponent.
 */

@Component({
    selector: 'page',
    templateUrl: './_page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent {
    constructor(
        protected mdDialog: MdDialog,
        protected mdSnackBar: MdSnackBar,
        protected appUxService: AppUxService,
        protected postService: PostService,
        protected appService: AppService,
        protected fbService: FbService,
        protected appRoutingService: AppRoutingService,
        protected confService: ConfService
    ) {
        this._newPosts = new Subject<Post>();
        this.newPosts = this._newPosts.do(() => this.pending--);
    }

    protected _page?: Page;
    protected pending = 0;
    protected _newPosts: Subject<Post>;

    /*
     * Posts by this Page.
     */
    posts: Observable<GraphApiResponse<Post>>;

    /*
     * Posts with this Page.
     */
    tagged: Observable<Post>;

    /*
     * New Posts written by the user since they opened this Page.
     */
    newPosts: Observable<Post>;

    /*
     * The Page currently shown.
     */
    @Input()
    set page(page: Page|undefined) {
        if (page) {
            this._page = page;
            this.posts = page.posts;
            this.tagged = page.tagged.concatMap(
                (posts: GraphApiResponse<Post>) => posts.expanded);
        }
    }
    get page() {
        return this._page;
    }

    /*
     * Open the posting dialog.
     */
    openPostDialog() {
        const mdDialogRef = this.mdDialog.open(PostDialogComponent, {
            width: '600px',
            height: '400px'
        });
        mdDialogRef.componentInstance.page = this.page;
        mdDialogRef
            .afterClosed()
            .filter(Boolean)
            .do(() =>
                this.mdSnackBar.open(
                    "Post wird erstellt...",
                    "",
                    {duration: this.confService.app.baseDelay}))
            .concatAll()
            .do(() => this.pending++)
            .delay(this.confService.app.baseDelay)
            .map((id: string) =>
                this.mdSnackBar
                    .open(
                        "Post erstellt",
                        "Öffnen",
                        {duration: this.confService.app.baseDelay})
                    .onAction()
                    .map(() => id))
            .delay(this.confService.app.baseDelay)
            .do(() => this.page
                .posts
                .concatMap(
                    (posts: GraphApiResponse<Post>) => posts.expanded)
                .first()
                .subscribe(post => this._newPosts.next(post)))
            .concatAll()
            .subscribe(
                (id: string) => window.open('//facebook.com/' + id, '_blank'),
                (err: GraphApiError) =>
                    GraphApiErrorComponent.show(this.mdSnackBar, err));
    }
}

