import {Component, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {OverlayRef, Overlay, OverlayState} from '@angular/material';

import {DisplacerPortalDirective} from './displacer-portal.directive';

/*
 * Displaces a Component into the <body>.
 *
 * This Component will move its contents into the body. To work around 
 * https://github.com/angular/material2/issues/998, the code was taken from 
 * https://gist.github.com/fxck/b668f7fec77d7b28d8c7ce6b706601f7.
 */

@Component({
    selector: 'displacer',
    template: `
        <ng-template displacer-portal>
            <ng-content></ng-content>
        </ng-template>
    `,
    styleUrls: ['dist/displacer.component.css']
})
export class DisplacerComponent implements OnDestroy, AfterViewInit {
    constructor(private overlay: Overlay) {}

    private config = new OverlayState();

    @ViewChild(DisplacerPortalDirective)
    private portal: DisplacerPortalDirective;

    private overlayRef: OverlayRef|undefined = undefined;

    public ngOnDestroy() {
        this.overlayRef.detach();
    }

    public ngAfterViewInit() {
        this.overlayRef = this.overlay.create(this.config);
        this.overlayRef.attach(this.portal);
    }
}

