import {Injectable} from '@angular/core';
import {Router, NavigationEnd, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {AppRouting} from './app-routing';

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

    protected static normalize(params: Params) {
        if (!params) { return null; }
        const result = Object.keys(params)
            .map(k => ({[AppRouting.ALIASES[k]]: params[k]}))
            .reduce((o, e) => Object.assign(o, e), {});
        return Object.keys(AppRouting.ALIASES)
            .filter(k => result.hasOwnProperty(AppRouting.ALIASES[k]))
            .map(k => ({[k]: result[AppRouting.ALIASES[k]]}))
            .reduce((o, e) => Object.assign(o, e), {});
    }

    /*
     * Parse the parameters from a path.
     */
    parse(path: string): Params|null {
        const result = path
            .split('/')
            .slice(1)
            .map((v, i) => AppRouting.PARAMS[i]
                    ? (v ? {[AppRouting.PARAMS[i]]: v} : {})
                    : null)
            .filter(param => !param
                || !Object.keys(param).length
                || param[Object.keys(param)[0]] !== '_')
            .reduce((o, e) => o && e ? Object.assign(o, e) : null, {});
        return AppRoutingService.normalize(result);
    }

    /*
     * Get the current route Params.
     *
     * This will return null if the route is invalid.
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
                ? AppRouting.PARAMS
                    .map(k =>
                        (AppRoutingService.normalize(params).hasOwnProperty(k)
                                ? AppRoutingService.normalize(params)[k]
                                : this.params[k])
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
    refresh(params = AppRouting.PARAMS) {
        this.events.next(
            AppRoutingService.normalize(
                params
                    .map(k => ({[k]: this.params[k]}))
                    .reduce((o, e) => Object.assign(o, e), {})));
    }
}

