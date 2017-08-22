import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {Profile} from './profile';
import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';
import {showGraphApiError} from './graph-api-error.component';
import {AppUxService} from './app-ux.service';
import {AppRoutingComponent} from './app-routing.component';
import {AppRoutingService} from './app-routing.service';
import {AppService} from './app.service';

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'profile',
    templateUrl: './_profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends AppRoutingComponent {
    constructor(
        private pageService: PageService,
        private mdSnackBar: MdSnackBar,
        private appService: AppService,
        appRoutingService: AppRoutingService
    ) {
        super(appRoutingService);
    }

    /*
     * The Profile currently shown.
     */
    profile: Profile;

    /*
     * Whether the Component is still loading.
     */
    private _loaded: boolean;

    @Input()
    loaded: boolean;

    @Input()
    set params(params: Params) {
        this._loaded = this.loaded;
        Observable
            .fromPromise(this.pageService.page(params[this.appService.PAGE]))
            .finally(() => this._loaded = true)
            .subscribe(
                (page: Page) => this.profile = page,
                (err: GraphApiError) =>
                    showGraphApiError(this.mdSnackBar, err));
    }

    /*
     * Whether the Component is showing a Page.
     */
    get isPage() {
        return this.profile instanceof Page;
    }
}

