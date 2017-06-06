import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {Page} from './page';
import {PageService} from './page.service';

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'page',
    template: `
        <div *ngIf='page'>
            <h2>{{page.name}} – Detailansicht</h2>
            <div><label>id: </label>{{page.id}}</div>
            <div>
                <label>name:</label>
                <input [(ngModel)]='page.name' placeholder="Seitenname">
            </div>
            <button (click)='this.locationService.back()'>Zurück</button>
        </div>
        `
})
export class PageComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private activatedRoute: ActivatedRoute,
        private locationService: Location) {}

    @Input() page: Page;

    ngOnInit(): void {
        this.activatedRoute
            .params
            .switchMap((params: Params) => this.pageService.getPage(+params['id']))
            .subscribe(page => this.page = page);
    }
}

