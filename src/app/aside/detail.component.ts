import {Component, Input, forwardRef} from '@angular/core';
import {Params} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {Post} from '../post';
import {PostService} from '../post.service';
import {GraphApiError} from '../graph-api-error';
import {GraphApiErrorComponent} from '../graph-api-error.component';
import {AppRoutingComponent} from '../app-routing.component';
import {AppRoutingService} from '../app-routing.service';
import {AppService} from '../app.service';

/*
 * The Component showing Posts in detail.
 */

@Component({
    selector: 'detail',
    templateUrl: './_detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent extends AppRoutingComponent {
    constructor(
        protected postService: PostService,
        protected matSnackBar: MatSnackBar,
        protected appService: AppService,
        appRoutingService: AppRoutingService
    ) {
        super(appRoutingService);
    }

    /*
     * Whether the component is still loading.
     */
    protected _loaded = false;

    protected _params?: Params;

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
     * The Post this Component is currently showing.
     */
    post: Observable<Post>;

    @Input()
    set params(params: Params|undefined) {
        if (params) {
            this._params = this.appRoutingService.params;

            if (!params[this.appService.POST]) { return; }
            this._loaded = this.loaded;
            this.post = this.postService.post(params[this.appService.POST]);
            this.post
                .finally(() => this._loaded = true)
                .subscribe(
                    null,
                    (err: GraphApiError) =>
                        GraphApiErrorComponent.show(this.matSnackBar, err));
        }
    }
    get params() {
        return this._params;
    }
}

