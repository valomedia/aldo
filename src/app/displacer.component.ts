import {
    Component,
    ViewChild,
    OnDestroy,
    AfterViewInit,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    OnInit
} from '@angular/core';
import {DomPortalHost} from '@angular/material';

import {DisplacerPortalDirective} from './displacer-portal.directive';

/*
 * Displaces a Component into the #displacer-target.
 *
 * This Component will move its contents to a more convenient location.  This is 
 * used to work around https://github.com/angular/material2/issues/998, code 
 * adapted from https://gist.github.com/fxck/b668f7fec77d7b28d8c7ce6b706601f7.
 */

@Component({
    selector: 'displacer',
    template: `
        <ng-template displacer-portal>
            <div app-content>
                <div class='displacer-content'>
                    <div class='positioning-anchor'>
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </ng-template>
    `,
    styleUrls: ['dist/displacer.component.css']
})
export class DisplacerComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector) {}

    @ViewChild(DisplacerPortalDirective)
    private displacerPortalDirective: DisplacerPortalDirective;

    private domPortalHost: DomPortalHost;

    ngOnInit() {
        this.domPortalHost = new DomPortalHost(
            document.getElementById('displacer-target'),
            this.componentFactoryResolver,
            this.applicationRef,
            this.injector);
    }

    ngOnDestroy() {
        this.domPortalHost.detach();
    }

    ngAfterViewInit() {
        this.domPortalHost.attachTemplatePortal(this.displacerPortalDirective);
    }
}

