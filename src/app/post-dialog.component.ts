import {Component, Input} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {Page, ContentType} from './page';
import {PageService} from './page.service';

@Component({
    selector: 'post-dialog',
    templateUrl: './_post-dialog.component.html',
    styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {
    constructor(
        private mdDialogRef: MdDialogRef<Promise<string>>,
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
            this.pageService.postMsg(
                this.page,
                this.text,
                this.contentType,
                this[ContentType[this.contentType].toLowerCase()]));
    }
}

