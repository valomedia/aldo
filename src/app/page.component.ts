import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {MdDialog, MdSnackBar} from '@angular/material';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concat';
import {Observable} from 'rxjs/Observable';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {PostDialogComponent} from './post-dialog.component';

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'page',
    template: `
        <md-spinner color='accent' *ngIf='!page && !graphApiError'></md-spinner>
        <div *ngIf='page'>
            <h1>{{page.name}} ({{page.fan_count}} Likes)</h1>
            <span class='app-action'>
                <button md-fab (click)='openPostDialog()'>
                    <i class='material-icons'>create</i>
                </button>
            </span>
        </div>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
        `
})
export class PageComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private activatedRoute: ActivatedRoute,
        private locationService: Location,
        private mdDialog: MdDialog,
        private mdSnackBar: MdSnackBar) {}

    @Input()
    page: Page;

    /*
     * Any errors returned when trying to get the page info.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.activatedRoute
            .params
            .switchMap((params: Params) => 
                this.pageService.getPage(+params['id']))
            .first()
            .toPromise()
            .then(page => this.page = page)
            .catch(err => this.graphApiError = err);
    }

    /*
     * Post to a given String to this Page.
     */
    post(text: String): void {
        this.pageService
            .postMessage(this.page, text)
            .then(id => alert('Post erstellt: ' + id))
            .catch(err => this.graphApiError = err);
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
            .map((res: Number) =>
                this.mdSnackBar
                    .open("Post erstellt", "Öffnen", {duration: 2000})
                    .onAction()
                    .map(() => res))
            .concatAll()
            .concat(Observable.of(0))
            .first()
            .toPromise()
            .then((res: Number) => {
                if (res) { alert("Not Implemented"); }
            })
            .catch((err: GraphApiError) => this.graphApiError = err);
    }
}

