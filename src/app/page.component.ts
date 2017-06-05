import {Component, Input} from '@angular/core';
import {Page} from './page';

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
        </div>
        `
})
export class PageComponent {
    @Input() page: Page;
}

