import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {Page} from './page';
import {Insight} from './insight';
import {GraphApiError} from './graph-api-error';

/*
 * The MatDialog showing the insights for a page.
 */

@Component({
    selector: 'insight-dialog',
    templateUrl: './_insight-dialog.component.html',
    styleUrls: ['./insight-dialog.component.css']
})
export class InsightDialogComponent {
    constructor(protected matDialogRef: MatDialogRef<Observable<string>>) {}

    protected _page?: Page;

    loaded = false;

    insights: Insight[] = [];

    @Input()
    set page(page: Page|null) {
        if (page) {
            this._page = page;
            page
                .insights
                .finally(() => this.loaded = true)
                .subscribe(
                    (insight: Insight) => this.insights.push(insight),
                    (err: GraphApiError) => this.matDialogRef.close(err));
        }
    }
    get page() {
        return this._page;
    }
}

