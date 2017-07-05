import {Injectable} from '@angular/core';

/*
 * The service providing information about how to layout the app.
 */

@Injectable()
export class AppUxService {
    /*
     * Calculates whether the aside will show as sidebar.
     */
    asideMode() { return window.innerWidth >= 1264 ? 'side' : 'push'; }

    /*
     * Calculates the number of columns in the layout.
     */
    cols() {
        if (window.innerWidth < 600) { return 4; }
        if (window.innerWidth < 840) { return 8; }
        return 12;
    }

    /*
     * Calculates the size of the gutters between items.
     */
    gutterSize() {
        return window.innerWidth < 960
            && window.innerHeight < 600
            || window.innerWidth < 600
            ? 16
            : 24;
    }
}
