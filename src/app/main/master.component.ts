import {Component, Input} from '@angular/core';
import {Params} from '@angular/router';
import {MdSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {Profile} from '../profile';
import {ProfileService} from '../profile.service';
import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {AppRoutingComponent} from '../app-routing.component';
import {AppRoutingService} from '../app-routing.service';
import {AppService} from '../app.service';

/*
 * The Component showing Profiles.
 */

@Component({
    selector: 'master',
    templateUrl: './_master.component.html',
    styleUrls: ['./master.component.css']
})
export class MasterComponent extends AppRoutingComponent {
    constructor(
        protected profileService: ProfileService,
        protected mdSnackBar: MdSnackBar,
        protected appService: AppService,
        appRoutingService: AppRoutingService
    ) {
        super(appRoutingService);
    }

    protected _params?: Params;

    /*
     * Whether the Component is still loading.
     */
    protected _loaded: boolean;

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
     * The Profile currently shown.
     */
    profile: Observable<Profile>;

    test1: Profile;
    test2: Profile;

    @Input()
    set params(params: Params|undefined) {
        if (params) {
            this._params = params;
            if (!params[this.appService.PROFILE]) { return; }
            this._loaded = this.loaded;
            this.profile = this.profileService
                .profile(params[this.appService.PROFILE]);
            this.profile
                .finally(() => this._loaded = true)
                .subscribe(
                    null,
                    (err: GraphApiError) =>
                        GraphApiErrorComponent.show(this.mdSnackBar, err));
            this.profile.subscribe(x => this.test1 = x);
            this.profile.subscribe(x => this.test2 = x);
        }
    }
    get params() {
        return this._params;
    }
}

