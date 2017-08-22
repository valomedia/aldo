import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdDialog, MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/concatAll';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {PostDialogComponent} from './post-dialog.component';
import {showGraphApiError} from './graph-api-error.component';
import {AppUxService} from './app-ux.service';
import {PostService} from './post.service';
import {Post} from './post';
import {GraphApiResponse} from './graph-api-response';
import {AppRoutingComponent} from './app-routing.component';
import {AppRoutingService} from './app-routing.service';
import {AppService} from './app.service';

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'page',
    templateUrl: './_page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent extends AppRoutingComponent {
    constructor(
        private pageService: PageService,
        private mdDialog: MdDialog,
        private mdSnackBar: MdSnackBar,
        private appUxService: AppUxService,
        private postService: PostService,
        private appService: AppService,
        appRoutingService: AppRoutingService
    ) {
        super(appRoutingService);
    }

    /*
     * The Page currently shown.
     */
    page: Page;

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
    newPosts = new Subject<Post>();

    /*
     * Whether the component is still loading.
     */
    private _loaded: boolean;

    @Input()
    loaded: boolean;

    @Input()
    set params(params: Params) {
        this._loaded = this.loaded;
        Observable
            .fromPromise(this.pageService.page(params[this.appService.PROFILE]))
            .finally(() => this._loaded = true)
            .subscribe(
                (page: Page) => {
                    this.page = page;
                    this.posts = page.posts;
                    this.tagged = page
                        .tagged
                        .concatMap((posts: GraphApiResponse<Post>) =>
                            posts.expanded);
                },
                (err: GraphApiError) =>
                    showGraphApiError(this.mdSnackBar, err));
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
                    {duration: 2000}))
            .concatAll()
            .do((id: string) =>
                this.postService
                    .post(id)
                    .then(post => this.newPosts.next(post))
                    .catch(err => this.newPosts.error(err)))
            .map((id: string) =>
                this.mdSnackBar
                    .open("Post erstellt", "Öffnen", {duration: 2000})
                    .onAction()
                    .map(() => id))
            .concatAll()
            .subscribe(
                (id: string) => window.open('//facebook.com/' + id, '_blank'),
                (err: GraphApiError) =>
                    showGraphApiError(this.mdSnackBar, err));
    }
}

