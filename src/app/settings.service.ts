import {Injectable} from '@angular/core';

import {Settings} from './settings';

/*
 * The Service retrieving and storing the Settings.
 */

@Injectable()
export class SettingsService {

    /*
     * The global Settings singleton.
     */
    get settings() {
        return SETTINGS;
    }
    set settings(settings: Settings) {
        SETTINGS = settings;
    }
}

let SETTINGS = new Settings();

