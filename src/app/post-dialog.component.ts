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
                    [md-dialog-close]='undefined'>
                Abbrechen
                <md-icon>cancel</md-icon>
            </button>
            <button
                    md-button
                    [md-dialog-close]='return(1)'
                    color='primary'>
                Post erstellen
                <md-icon>publish</md-icon>
            </button>
        </md-dialog-actions>
    `
})
export class PostDialogComponent {
    constructor(private mdDialogRef: MdDialogRef<Promise<Number>>) {}
    return(id: Number) { return Promise.resolve(id); }
}

