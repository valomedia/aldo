import {Directive, HostListener} from '@angular/core';

/*
 * Directive for all components of the layout.
 *
 * This will make its content scrollable, give it some padding and re-dispatch 
 * all scroll events on the component to window.
 */

@Directive({selector: '[app-content]'})
export class AppContentDirective {
    /*
     * Take an already dispatched Event and dispatch a copy of it on window.
     *
     * This is used to redispatch scroll events from the app content, so browser 
     * chrome will hide correctly on mobile.
     */
    @HostListener('scroll', ['$event'])
    onScroll(
        event: Event & {
            constructor: new (typeArg: string, eventInit?: EventInit) => Event
        }
    ) {
        window.dispatchEvent(new event.constructor(event.type, event));
    }
}

