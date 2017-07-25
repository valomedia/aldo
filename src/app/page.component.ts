import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MdDialog, MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatAll';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {PostDialogComponent} from './post-dialog.component';
import {showGraphApiError} from './graph-api-error.component';
import {AppUxService} from './app-ux.service';

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'page',
    template: `
        <md-spinner color='accent' *ngIf='!page && !graphApiError'></md-spinner>
        <div *ngIf='page'>
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
                        <span class='text-primary'>
                            (+{{page.new_like_count}})
                        </span>
                    </span>
                    <br>
                    <span
                            *ngIf='page.overall_star_rating'
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
                            (<md-icon>people</md-icon>{{page.rating_count}})
                        </span>
                    </span>
                    <br>
                    <span
                            *ngIf='page.talking_about_count'
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
                </small>
            </h1>
            <span class='app-action'>
                <button md-fab (click)='openPostDialog()'>
                    <md-icon>create</md-icon>
                </button>
            </span>
            <md-tab-group *ngIf='appUxService.cols() == 4'>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>archive</md-icon>
                    </ng-template>
                    <h2>Posts auf deiner Seite</h2>
                </md-tab>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>inbox</md-icon>
                    </ng-template>
                    <h2>Posts mit deiner Seite</h2>
                </md-tab>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>hourglass_full</md-icon>
                    </ng-template>
                    <h2>Geplante Posts</h2>
                </md-tab>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>drafts</md-icon>
                    </ng-template>
                    <h2>Entwürfe für Posts</h2>
                </md-tab>
            </md-tab-group>
            <md-tab-group *ngIf='appUxService.cols() == 8'>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>public</md-icon>
                        Veröffentlichte Posts
                    </ng-template>
                    <div class='flex'>
                        <div class='flex-6-cols'>
                            <h2>Posts auf deiner Seite</h2>
                        </div>
                        <div class='flex-6-cols'>
                            <h2>Posts mit deiner Seite</h2>
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
                        </div>
                        <div class='flex-6-cols'>
                            <h2>Entwürfe für Posts</h2>
                        </div>
                    </div>
                </md-tab>
            </md-tab-group>
            <div *ngIf='appUxService.cols() == 12'>
                    <div class='flex'>
                        <div class='flex-3-cols'>
                            <h2>Posts auf deiner Seite</h2>
                        </div>
                        <div class='flex-3-cols'>
                            <h2>Posts mit deiner Seite</h2>
                        </div>
                        <div class='flex-3-cols'>
                            <h2>Geplante Posts</h2>
                        </div>
                        <div class='flex-3-cols'>
                            <h2>Entwürfe für Posts</h2>
                        </div>
                    </div>
            </div>
        </div>
    `,
    styleUrls: ['dist/page.component.css']
})
export class PageComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private activatedRoute: ActivatedRoute,
        private mdDialog: MdDialog,
        private mdSnackBar: MdSnackBar,
        private appUxService: AppUxService) {}

    @Input()
    page: Page;

    /*
     * The error that occured, if any.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.activatedRoute
            .params
            .switchMap((params: Params) =>
                this.pageService.getPage(+params['id']))
            .subscribe(
                page => this.page = page,
                err => showGraphApiError(this.mdSnackBar, err));
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
            .do(() => 
                this.mdSnackBar.open(
                    "Post wird erstellt...",
                    "",
                    {duration: 2000}))
            .filter(Boolean)
            .concatAll()
            .map((id: string) =>
                this.mdSnackBar
                    .open("Post erstellt", "Öffnen", {duration: 2000})
                    .onAction()
                    .map(() => id))
            .concatAll()
            .subscribe(
                (id: string) => window.open('//facebook.com/' + id, '_blank'),
                (err: GraphApiError) =>
                    this.graphApiError
                        = showGraphApiError(this.mdSnackBar, err));
    }
}

