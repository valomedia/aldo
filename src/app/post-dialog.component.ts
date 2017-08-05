import {Component, Input} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {Page, ContentType} from './page';
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
                        [(ngModel)]='text'
                        placeholder="Schreib etwas..."></textarea>
            </md-input-container>
            <md-tab-group [(selectedIndex)]='contentType'>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>insert_link</md-icon>
                        Link hinzufügen
                    </ng-template>
                    <md-input-container>
                        <input
                                mdInput
                                [(ngModel)]='link'
                                placeholder="Füge einen Link hinzu...">
                    </md-input-container>
                </md-tab>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>insert_photo</md-icon>
                        Bild hinzufügen
                    </ng-template>
                    <md-input-container>
                        <input
                                mdInput
                                [(ngModel)]='photo'
                                placeholder="Link zum Bild...">
                    </md-input-container>
                </md-tab>
                <md-tab>
                    <ng-template md-tab-label>
                        <md-icon>movie</md-icon>
                        Video hinzufügen
                    </ng-template>
                    <md-input-container>
                        <input
                                mdInput
                                [(ngModel)]='video'
                                placeholder="Link zum Video...">
                    </md-input-container>
                </md-tab>
            </md-tab-group>
        </md-dialog-content>
        <md-dialog-actions>
            <button
                    *ngIf='page'
                    md-button
                    (click)='post()'
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
     * ContentType selected by the user.
     */
    contentType = ContentType.Link;

    /*
     * Text entered by the user.
     */
    text = '';

    /*
     * Link entered by the user.
     */
    link = '';

    /*
     * Photo url entered by the user.
     */
    photo = '';

    /*
     * Video url entered by the user.
     */
    video = '';

    /*
     * Post to a given String to this Page.
     */
    post() {
        this.mdDialogRef.close(
            this.pageService.postMessage(
                this.page,
                this.text,
                this.contentType,
                this[ContentType[this.contentType].toLowerCase()]));
    }
}

