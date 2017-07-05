import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'post-dialog',
    template: `
        <h1 md-dialog-title>Post erstellen</h1>
        <md-dialog-content></md-dialog-content>
        <md-dialog-actions>
            <button
                    md-button
                    class='pad'
                    [md-dialog-close]='""'>
                Abbrechen
            </button>
            <button
                    md-raised-button
                    [md-dialog-close]='"Not implemented"'
                    class='pad'
                    color='primary'>
                Post erstellen
            </button>
        </md-dialog-actions>
    `
})
export class PostDialogComponent {
    constructor(private mdDialogRef: MdDialogRef<String>) {}
}

