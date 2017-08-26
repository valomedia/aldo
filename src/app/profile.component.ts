import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {Profile} from './profile';
import {Page} from './page';
import {ProfileService} from './profile.service';
import {GraphApiError} from './graph-api-error';
import {GraphApiErrorComponent} from './graph-api-error.component';
import {AppUxService} from './app-ux.service';
import {AppRoutingComponent} from './app-routing.component';
import {AppRoutingService} from './app-routing.service';
import {AppService} from './app.service';

/*
 * The Component showing a single Profile in detail.
 */

@Component({
    selector: 'profile',
    templateUrl: './_profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends AppRoutingComponent {
    constructor(
        protected profileService: ProfileService,
        protected mdSnackBar: MdSnackBar,
        protected appService: AppService,
        appRoutingService: AppRoutingService
    ) {
        super(appRoutingService);
    }

    @Input()
    loaded: boolean;

    /*
     * The Profile currently shown.
     */
    profile: Profile;

    /*
     * Whether the Component is still loading.
     */
    protected _loaded: boolean;

    @Input()
    set params(params: Params) {
        this._loaded = this.loaded;
        this.profileService
            .profile(params[this.appService.PAGE])
            .finally(() => this._loaded = true)
            .subscribe(
                (profile: Profile) => this.profile = profile,
                (err: GraphApiError) =>
                    GraphApiErrorComponent.show(this.mdSnackBar, err));
    }

    /*
     * Whether the Component is showing a Page.
     */
    get isPage() {
        return this.profile instanceof Page;
    }
}

