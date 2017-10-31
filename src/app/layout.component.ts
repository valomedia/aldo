import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSidenav, MatSnackBar, MatDialog} from '@angular/material';
import {Location} from '@angular/common';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

import {AppUxService} from './app-ux.service';
import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';
import {AppService} from './app.service';
import {ProfileService} from './profile.service';
import {Profile} from './profile';
import {Page} from './page';
import {GraphApiError} from './graph-api-error';
import {GraphApiErrorComponent} from './graph-api-error.component';
import {InsightDialogComponent} from './insight-dialog.component';
import {SettingsService} from './settings.service';
import {SettingsDialogComponent} from './settings-dialog.component';

/*
 * The Component containing the layout everything else goes into.
 */

@Component({
    selector: 'layout',
    templateUrl: './_layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    constructor(
        protected appUxService: AppUxService,
        protected title: Title,
        protected activatedRoute: ActivatedRoute,
        protected fbService: FbService,
        protected appRoutingService: AppRoutingService,
        protected appService: AppService,
        protected profileService: ProfileService,
        protected matSnackBar: MatSnackBar,
        protected matDialog: MatDialog,
        protected settingsService: SettingsService) {}

    protected _params: Params = {};

    /*
     * Shorthand for appService.SIDE.
     *
     * This is used in the template, because it is shorter.
     */
    protected SIDE = this.appService.SIDE;

    /*
     * Shorthand for appService.PUSH.
     *
     * This is used in the template, because it is shorter.
     */
    protected PUSH = this.appService.PUSH;

    /*
     * Shorthand for appService.OVER.
     *
     * This is used in the template, because it is shorter.
     */
    protected OVER = this.appService.OVER;

    /*
     * Shorthand for appService.POST.
     *
     * This is used in the template, because it is shorter.
     */
    protected POST = this.appService.POST;

    /*
     * The route parameters.
     */
    get params() {
        return this._params;
    }
    set params(params: Params) {
        this._params = params;
        this.page = null;
        if (params[this.appService.PAGE]) {
            this.profileService
                .profile(params[this.appService.PAGE])
                .filter(profile => profile instanceof Page)
                .map(profile => profile as Page)
                .filter(page => !!page.access_token)
                .subscribe(
                    (page: Page) => this.page = page,
                    (err: GraphApiError) =>
                        GraphApiErrorComponent.show(this.matSnackBar, err));
        }
    }

    /*
     * The Page currently being shown, if any.
     *
     * This will contain the page, that the user is currently administrating, so 
     * the necessary tools can be shown in the toolbar.  If no Page is currently 
     * being shown, or if the user is not an admin on the current Page, this 
     * will be null.
     */
    page?: Page;

    @ViewChild('aside')
    aside: MatSidenav;

    @ViewChild('nav')
    nav: MatSidenav;

    ngOnInit() {
        this.appRoutingService
            .events
            .filter(Boolean)
            .map(() => this.appRoutingService.params)
            .do(params =>
                this.aside[params[this.appService.POST] ? 'open' : 'close']())
            .subscribe(params => this.params = params);
    }

    /*
     * Open the InsightDialogComponent.
     */
    openInsightDialog() {
        const matDialogRef = this.matDialog.open(InsightDialogComponent, {
            width: '600px',
            height: '800px'
        });
        matDialogRef.componentInstance.page = this.page;
        matDialogRef.afterClosed().filter(Boolean).subscribe(
            (err: GraphApiError) =>
                GraphApiErrorComponent.show(this.matSnackBar, err));
    }

    /*
     * Open the SettingsDialogComponent.
     */
    openSettingsDialog() {
        const matDialogRef = this.matDialog.open(SettingsDialogComponent, {
            width: '600px',
            height: '400px'
        });
        matDialogRef.componentInstance.settings = this.settingsService.settings;
        matDialogRef.afterClosed().map(Boolean).subscribe(
            (save: boolean) => save
                ? this.settingsService.save()
                : this.settingsService.load());
    }

    /*
     * Refresh the contents.
     */
    refresh() {
        this.appRoutingService.refresh([this.appService.PROFILE]);
    }
}

