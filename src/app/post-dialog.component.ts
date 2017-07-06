import {Component, Input} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {Page} from './page';
import {PageService} from './page.service';

@Component({
    selector: 'post-dialog',
    template: `
        <h1 md-dialog-title>Post erstellen</h1>
        <md-dialog-content>
            <md-input-container>
                <textarea
                        mdInput
                        mdTextareaAutosize
                        #text
                        placeholder="Schreib etwas..."></textarea>
            </md-input-container>
            <md-input-container>
                <input mdInput #link placeholder="Füge einen Link hinzu...">
            </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
            <button
                    *ngIf='page'
                    md-button
                    (click)='post(text.value, link.value)'
                    color='primary'>
                Post erstellen
                <md-icon>publish</md-icon>
            </button>
            <button
                    md-button
                    [md-dialog-close]='undefined'>
                Abbrechen
                <md-icon>cancel</md-icon>
            </button>
        </md-dialog-actions>
    `,
    styleUrls: ['dist/post-dialog.component.css']
})
export class PostDialogComponent {
    constructor(
        private mdDialogRef: MdDialogRef<Promise<String>>,
        private pageService: PageService) {}

    @Input()
    page: Page;

    /*
     * Post to a given String to this Page.
     */
    post(text: String, link: String) {
        this.mdDialogRef.close(this.pageService.postMessage(this.page, text, link));
    }
}

