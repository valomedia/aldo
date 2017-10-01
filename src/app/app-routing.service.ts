import {Injectable} from '@angular/core';
import {Router, NavigationEnd, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {AppService} from './app.service';

/*
 * The service providing routing for the app.
 *
 * This suits my usecase better than Angular's router.
 */

@Injectable()
export class AppRoutingService {
    constructor(
        protected router: Router,
        protected location: Location,
        protected appService: AppService
    ) {
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .map((event: NavigationEnd) => this.parse(event.url))
            .mergeScan(
                ([_, last], next) => Observable.of([last || {}, next]),
                [{}, {}],
                1)
            .map(([last, next]) => next
                ? Object
                    .keys(next)
                    .filter(k => last[k] !== next[k])
                    .map(k => ({[k]: next[k]}))
                    .reduce((o, e) => Object.assign(o, e), {})
                : null)
            .skip(1)
            .subscribe(this.events);
    }

    /*
     * This will emit the set of Params that has changed on each NavigationEnd.
     *
     * If the user navigates to an invalid route, this will emit null.
     */
    events = new BehaviorSubject<Params>(this.params);

    /*
     * Parse the parameters from a path.
     */
    parse(path: string): Params|null {
        return path
            .split('/')
            .slice(1)
            .map((v, i) => this.appService.PARAMS[i]
                    ? (v ? {[this.appService.PARAMS[i]]: v} : {})
                    : null)
            .filter(param => !param
                || !Object.keys(param).length
                || param[Object.keys(param)[0]] !== '_')
            .reduce((o, e) => o && e ? Object.assign(o, e) : null, {});
    }

    /*
     * Get the current route Params.
     *
     * This will null if the route is invalid.
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
     * Trigger a soft reload.
     *
     * This will refresh the Params, triggering routed components to be rebuilt.  
     * If a list of parameter names is passed, only those will be refreshed.
     */
    refresh(params = this.appService.PARAMS) {
        this.events.next(
            params
                .map(k => ({[k]: this.params[k]}))
                .reduce((o, e) => Object.assign(o, e), {}));
    }
}

