import {Component, Input} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {Page} from './page';

@Component({
    selector: 'insight-dialog',
    templateUrl: './_insight-dialog.component.html',
    styleUrls: ['./insight-dialog.component.css']
})
export class InsightDialogComponent {
    constructor(protected mdDialogRef: MdDialogRef<Observable<string>>) {}

    @Input()
    page?: Page;
}

