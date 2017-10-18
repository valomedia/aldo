import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {Settings} from './settings';

/*
 * The MatDialog showing the Settings.
 */

@Component({
    selector: 'settings-dialog',
    templateUrl: './_settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {
    constructor(protected matDialogRef: MatDialogRef<Settings|null>) {}

    @Input()
    settings: Settings;
}

