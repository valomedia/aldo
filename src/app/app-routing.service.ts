import {Injectable} from '@angular/core';
import {Router, NavigationEnd, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';

import {AppService} from './app.service';

/*
 * The service providing routing for the app.
 *
 * This suits my usecase better than Angular's router.
 */

@Injectable()
export class AppRoutingService {
    constructor(
        private router: Router,
        private location: Location,
        private appService: AppService) {}

    events = this.router
        .events
        .filter(event => event instanceof NavigationEnd)
        .map((event: NavigationEnd) => this.parse(event.url))
        .publishBehavior(this.params)
        .refCount();

    /*
     * Parse the parameters from a path.
     */
    parse?(path: string): Params|null {
        return path
            .split('/')
            .slice(1)
            .map((v, i) => this.appService.PARAMS[i]
                    ? (v ? {[this.appService.PARAMS[i]]: v} : {})
                    : null)
            .filter(param => !param
                || !Object.keys(param).length
                || param[Object.keys(param)[0]] != '_')
            .reduce((o, e) => o && e ? Object.assign(o, e) : null, {});
    }

    /*
     * Get the current route parameters.
     */
    get params(): Params|null {
        return this.parse(this.location.path());
    }

    /*
     * Set any number of parameters.
     *
     * Any parameters not passed will be kept as is, any parameter that is set 
     * to a falsy value will become undefined.
     */
    set params(params: Params|null) {
        this.router.navigateByUrl(
            params
                ? this.appService.PARAMS
                    .map(k =>
                        (params.hasOwnProperty(k) ? params[k] : this.params[k])
                            || '_')
                    .join('/')
                    .replace(/(_\/)*_$/, '')
                : '/');
    }

    /*
     * Refresh all routed Components.
     *
     * This will browse to a bogus route and back, to force all routed 
     * Components being rebuilt.
     */
    refresh() {
        const params = this.params;
        this.router.navigateByUrl(
            Array(this.appService.PARAMS.length + 1).join('/_'),
            {skipLocationChange: true});
        setTimeout(() => this.params = params);
    }
}

