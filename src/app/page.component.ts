import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdDialog, MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/concatAll';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'page',
    template: `
        <md-spinner color='accent' *ngIf='!_loaded'></md-spinner>
        <div *ngIf='page'>
            <div>
                <h1>
                    {{page.name}}
                    <br>
                    <small>
                        <span
                                mdTooltip="Likes (neue Likes)"
                                mdTooltipShowDelay='1500'
                                mdTooltipHideDelay='1500'>
                            <span class='text-primary'>
                                <md-icon>thumb_up</md-icon>
                            </span>
                            <span class='text-accent'>
                                {{page.fan_count}}
                            </span>
                            <span
                                    *ngIf='page.new_like_count' 
                                    class='text-primary'>
                                (+{{page.new_like_count}})
                            </span>
                        </span>
                        <span *ngIf='page.overall_star_rating'>
                            <br>
                            <span
                                    mdTooltip="Bewertung (Anzahl Bewertungen)"
                                    mdTooltipShowDelay='1500'
                                    mdTooltipHideDelay='1500'>
                                <span class='text-primary'>
                                    <md-icon>star</md-icon>
                                </span>
                                <span class='text-accent'>
                                    {{page.overall_star_rating}}
                                </span>
                                <span class='text-primary'>
                                    (<md-icon>people</md-icon><!--
                                        -->{{page.rating_count}})
                                </span>
                            </span>
                        </span>
                        <span *ngIf='page.talking_about_count'>
                            <br>
                            <span
                                    mdTooltip="Nutzer, die über die Seite reden"
                                    mdTooltipShowDelay='1500'
                                    mdTooltipHideDelay='1500'>
                                <span class='text-primary'>
                                    <md-icon>forum</md-icon>
                                </span>
                                <span class='text-accent'>
                                    {{page.talking_about_count}}
                                </span>
                            </span>
                        </span>
                    </small>
                </h1>
            </div>
            <displacer>
                <span class='app-action'>
                    <button md-fab (click)='openPostDialog()'>
                        <md-icon>create</md-icon>
                    </button>
                </span>
            </displacer>
            <div>
                <md-tab-group *ngIf='appUxService.cols == 4'>
                    <md-tab>
                        <ng-template md-tab-label>
                            <md-icon>archive</md-icon>
                        </ng-template>
                        <h2>Posts auf deiner Seite</h2>
                        <posts [posts]='newPosts' loaded='true'></posts>
                        <endless-list #postsHandset [input]='posts'>
                            <posts [posts]='postsHandset.output'></posts>
                        </endless-list>
                    </md-tab>
                    <md-tab>
                        <ng-template md-tab-label>
                            <md-icon>inbox</md-icon>
                        </ng-template>
                        <h2>Posts mit deiner Seite</h2>
                        <posts [posts]='tagged'></posts>
                    </md-tab>
                    <md-tab>
                        <ng-template md-tab-label>
                            <md-icon>hourglass_full</md-icon>
                        </ng-template>
                        <h2>Geplante Posts</h2>
                        <missing-feature></missing-feature>
                    </md-tab>
                    <md-tab>
                        <ng-template md-tab-label>
                            <md-icon>drafts</md-icon>
                        </ng-template>
                        <h2>Entwürfe für Posts</h2>
                        <missing-feature></missing-feature>
                    </md-tab>
                </md-tab-group>
                <md-tab-group *ngIf='appUxService.cols == 8'>
                    <md-tab>
                        <ng-template md-tab-label>
                            <md-icon>public</md-icon>
                            Veröffentlichte Posts
                        </ng-template>
                        <div class='flex'>
                            <div class='flex-6-cols'>
                                <h2>Posts auf deiner Seite</h2>
                                <posts [posts]='newPosts' loaded='true'></posts>
                                <endless-list #postsTablet [input]='posts'>
                                    <posts [posts]='postsTablet.output'></posts>
                                </endless-list>
                            </div>
                            <div class='flex-6-cols'>
                                <h2>Posts mit deiner Seite</h2>
                                <posts [posts]='tagged'></posts>
                            </div>
                        </div>
                    </md-tab>
                    <md-tab>
                        <ng-template md-tab-label>
                            <md-icon>lock</md-icon>
                            Zukünftige Posts
                        </ng-template>
                        <div class='flex'>
                            <div class='flex-6-cols'>
                                <h2>Geplante Posts</h2>
                                <missing-feature></missing-feature>
                            </div>
                            <div class='flex-6-cols'>
                                <h2>Entwürfe für Posts</h2>
                                <missing-feature></missing-feature>
                            </div>
                        </div>
                    </md-tab>
                </md-tab-group>
                <div *ngIf='appUxService.cols == 12'>
                    <div class='flex'>
                        <div class='flex-4-cols'>
                            <h2>Posts auf deiner Seite</h2>
                            <posts [posts]='newPosts' loaded='true'></posts>
                            <endless-list #postsDesktop [input]='posts'>
                                <posts [posts]='postsDesktop.output'></posts>
                            </endless-list>
                        </div>
                        <div class='flex-4-cols'>
                            <h2>Posts mit deiner Seite</h2>
                            <posts [posts]='tagged'></posts>
                        </div>
                        <div class='flex-4-cols'>
                            <h2>Geplante Posts</h2>
                            <missing-feature></missing-feature>
                            <h2>Entwürfe für Posts</h2>
                            <missing-feature></missing-feature>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['dist/page.component.css']
})
export class PageComponent extends AppRoutingComponent {
    constructor(
        private pageService: PageService,
        private mdDialog: MdDialog,
        private mdSnackBar: MdSnackBar,
        private appUxService: AppUxService,
        private postService: PostService,
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
        Observable.fromPromise(this.pageService.page(params['page']))
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

