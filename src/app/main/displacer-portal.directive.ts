import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';

/*
 * A Directive from TemplatePortal for use by the DisplacerComponent.
 *
 * This Directive was adapted from a piece of code found at 
 * https://gist.github.com/fxck/b668f7fec77d7b28d8c7ce6b706601f7.
 */

@Directive({selector: '[displacer-portal]'})
export class DisplacerPortalDirective extends TemplatePortal<any> {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}

