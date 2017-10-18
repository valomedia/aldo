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
import {DomPortalHost} from '@angular/cdk/portal';

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
    templateUrl: './_displacer.component.html',
    styleUrls: ['./displacer.component.css']
})
export class DisplacerComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected applicationRef: ApplicationRef,
        protected injector: Injector) {}

    @ViewChild(DisplacerPortalDirective)
    protected displacerPortalDirective: DisplacerPortalDirective;

    protected domPortalHost: DomPortalHost;

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

