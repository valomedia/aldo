import {Directive, Input, HostListener} from '@angular/core';
import {Params} from '@angular/router';

import {AppRoutingService} from './app-routing.service';

/*
 * Link Directive.
 *
 * This gets passed Params or null and will make its host Component navigate on 
 * click to the new parameters passed via Params.  Any parameters not passed 
 * will be kept.  To unset a parameter, pass it as null.  Passing null to the 
 * directive instead of Params is a shortcut for unsetting all parameters.
 */

@Directive({selector: '[appLink]'})
export class AppLinkDirective {
    constructor(protected appRoutingService: AppRoutingService) {}

    @Input()
    appLink?: Params|null;

    @HostListener('click')
    onClick() {
        this.appRoutingService.params = this.appLink;
    }
}

