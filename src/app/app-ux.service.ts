import {Injectable} from '@angular/core';

/*
 * The service providing information about how to layout the app.
 */

@Injectable()
export class AppUxService {
    /*
     * Calculates whether the aside will show as sidebar.
     */
    get asideMode() { return window.innerWidth >= 1264 ? 'side' : 'push'; }

    /*
     * Calculates the number of columns in the layout.
     */
    get cols() {
        if (window.innerWidth < 600) { return 4; }
        if (window.innerWidth < 840) { return 8; }
        return 12;
    }

    /*
     * Calculates the size of the gutters between items.
     */
    get gutterSize() {
        return window.innerWidth < 960
            && window.innerHeight < 600
            || window.innerWidth < 600
            ? 16
            : 24;
    }

    /*
     * Calculates the width of cards in twelths of the overall width.
     */
    get cardWidth() {
        switch (this.cols) {
            case 12: return 4;
            case 8: return 6;
            default: return 12;
        }
    }
}

