import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MdSidenav} from '@angular/material';
import {Location} from '@angular/common';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

import {AppUxService} from './app-ux.service';
import {FbService} from './fb.service';
import {AppRoutingService} from './app-routing.service';
import {AppService} from './app.service';

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
        protected router: Router,
        protected fbService: FbService,
        protected location: Location,
        protected appRoutingService: AppRoutingService,
        protected appService: AppService) {}

    /*
     * The route parameters.
     */
    protected params: Params = {};

    /*
     * Whether the dark-theme is active.
     */
    dark = false;

    @ViewChild('aside')
    aside: MdSidenav;

    ngOnInit() {
        this.appRoutingService
            .events
            .filter(Boolean)
            .map(() => this.appRoutingService.params)
            .do(params =>
                this.aside[params[this.appService.POST] ? 'open' : 'close']())
            .subscribe(params => this.params = params);
    }
}

