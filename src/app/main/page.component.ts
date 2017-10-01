import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdDialog, MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/concatAll';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';

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

import {PostDialogComponent} from './post-dialog.component';

/*
 * The Component showing a single Page in detail.
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
        protected appRoutingService: AppRoutingService) {}

    protected _page?: Page;

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
                    {duration: 2000}))
            .concatAll()
            .do(() => this.posts = this.page.posts)
            .map((id: string) =>
                this.mdSnackBar
                    .open("Post erstellt", "Öffnen", {duration: 2000})
                    .onAction()
                    .map(() => id))
            .concatAll()
            .subscribe(
                (id: string) => window.open('//facebook.com/' + id, '_blank'),
                (err: GraphApiError) =>
                    GraphApiErrorComponent.show(this.mdSnackBar, err));
    }
}

