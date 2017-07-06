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
        </div>
        `
})
export class PageComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private activatedRoute: ActivatedRoute,
        private mdDialog: MdDialog,
        private mdSnackBar: MdSnackBar) {}

    @Input()
    page: Page;

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
     * Post to a given String to this Page.
     */
    post(text: String): void {
        this.pageService
            .postMessage(this.page, text)
            .then(id => alert('Post erstellt: ' + id))
            .catch(err => showGraphApiError(this.mdSnackBar, err))
    }

    /*
     * Open the posting dialog.
     */
    openPostDialog() {
        this.mdDialog
            .open(PostDialogComponent)
            .afterClosed()
            .filter(Boolean)
            .concatAll()
            .map((id: Number) =>
                this.mdSnackBar
                    .open("Post erstellt", "Öffnen", {duration: 2000})
                    .onAction()
                    .map(() => id))
            .concatAll()
            .subscribe(
                (id: Number) => alert("Not Implemented"),
                (err: GraphApiError) => showGraphApiError(this.mdSnackBar, err));
    }
}

