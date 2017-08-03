import {Component} from '@angular/core';

/*
 * The Component containing the layout everything else goes into.
 */

@Component({
    selector: 'main',
    template: `
        <div class='app-content' (scroll)='reDispatchEvent($event)'>
            <div>
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styleUrls: ['dist/main.component.css']
})
export class MainComponent {
    /*
     * Take an already dispatched Event and dispatch a copy of it on window.
     *
     * This is used to redispatch scroll events from the main content, so 
     * browser chrome will hide correctly on mobile.
     */
    reDispatchEvent(
        event: Event & {
            constructor: new (typeArg: string, eventInit?: EventInit) => Event
        }
    ) {
        dispatchEvent(new event.constructor(event.type, event));
    }
}

