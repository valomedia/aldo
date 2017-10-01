import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import {AppRoutingService} from './app-routing.service';

/*
 * Routing Directive.
 *
 * This Directive can be used to associate an AppRoutingComponent with one or 
 * multiple route parameters.  The Component will be automatically shown 
 * whenever all parameters it depends on are available, while none of the 
 * parameters it conflicts with are available.  If neither depends, nor 
 * conflicts are provided, the Component will be used as a fallback, shown if 
 * (and only if) the route is invalid.
 */

@Directive({selector: '[appRouting]'})
export class AppRoutingDirective implements OnInit {
    constructor(
        protected appRoutingService: AppRoutingService,
        protected templateRef: TemplateRef<any>,
        protected viewContainerRef: ViewContainerRef) {}

    protected hasView = false;
    protected _depends: string[] = [];
    protected _conflicts: string[] = [];

    @Input()
    set appRouting(depends: string|null|undefined) {
        this._depends = depends ? depends.split(/\s/) : [];
    }

    @Input()
    set appRoutingConflicts(conflicts: string|null|undefined) {
        this._conflicts = conflicts ? conflicts.split(/\s/) : [];
    }

    /*
     * Show the Component.
     */
    show() {
        if (this.hasView) { return; }
        this.hasView = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    /*
     * Hide the Component.
     */
    hide() {
        if (!this.hasView) { return; }
        this.hasView = false;
        this.viewContainerRef.clear();
    }


    ngOnInit() {
        // Handle regular Components.
        this.appRoutingService
            .events
            .map(() => this.appRoutingService.params)
            .filter(() => !!this._depends.length || !!this._conflicts.length)
            .map(params => !!params
                && this._depends
                    .map(depend => !!params[depend])
                    .reduce((acc, v) => acc && v, true)
                && !this._conflicts
                    .map(conflict => !!params[conflict])
                    .reduce((acc, v) => acc || v, false))
            .subscribe(condition => condition ? this.show() : this.hide());

        // Handle fallback Components.
        this.appRoutingService
            .events
            .map(() => this.appRoutingService.params)
            .filter(() => !this._depends.length && !this._conflicts.length)
            .map(Boolean)
            .subscribe(valid => valid ? this.hide() : this.show());
    }
}

