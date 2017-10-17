import {Injectable} from '@angular/core';

import {Settings} from './settings';

/*
 * The Service retrieving and storing the Settings.
 */

@Injectable()
export class SettingsService {
    constructor() {
        if (!this.settings) { this.load(); }
    }

    private static _settings: Settings;

    /*
     * The Settings singleton.
     */
    get settings() {
        return SettingsService._settings;
    }
    set settings(settings: Settings) {
        SettingsService._settings = settings;
    }

    /*
     * Load Settings from localStorage.
     */
    load() {
        this.settings = new Settings(
            JSON.parse(window.localStorage.getItem('settings')));
    }

    /*
     * Save Settings to localStorage.
     */
    save() {
        window.localStorage.setItem('settings', JSON.stringify(this.settings));
    }
}

