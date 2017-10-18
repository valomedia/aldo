import {Component, Input} from '@angular/core';

import {Insight} from './insight';

/*
 * The Component showing the table of insights.
 */

@Component({
    selector: 'insight',
    templateUrl: './_insight.component.html',
    styleUrls: ['./insight-dialog.component.css']
})
export class InsightComponent {
    @Input()
    insight?: Insight;

    displayedColumns = ['name', 'day', 'week', 'days_28'];
}

