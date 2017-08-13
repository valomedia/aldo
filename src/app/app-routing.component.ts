import {Input, OnInit, OnDestroy} from '@angular/core';
import {Params} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {AppRoutingService} from './app-routing.service';

/*
 * Interface for routed Components.
 *
 * This is an interface, that all components that have to get Params from the 
 * AppRoutingDirective must implement.
 */

export abstract class AppRoutingComponent implements OnInit, OnDestroy {
    constructor(private appRoutingService: AppRoutingService) {}

    private subscription: Subscription;

    @Input()
    set params(params: Params) {}

    ngOnInit() {
        this.subscription = this.appRoutingService
            .events
            .filter(Boolean)
            .subscribe(params => this.params = params);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

