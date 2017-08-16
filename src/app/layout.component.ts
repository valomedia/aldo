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
        private appUxService: AppUxService,
        private title: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fbService: FbService,
        private location: Location,
        private appRoutingService: AppRoutingService) {}

    /*
     * The route parameters.
     */
    private params: Params = {};

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
            .do(params => params.post && this.aside.open())
            .subscribe(params => this.params = params);
    }
}

