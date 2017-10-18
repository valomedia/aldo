import {Injectable} from '@angular/core';

import {Settings} from './settings';
import {AppService} from './app.service';

/*
 * The Service retrieving and storing the Settings.
 */

@Injectable()
export class SettingsService {
    constructor(protected appService: AppService) {
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
            JSON.parse(
                window.localStorage.getItem(this.appService.SETTINGS)));
    }

    /*
     * Save Settings to localStorage.
     */
    save() {
        window.localStorage.setItem(
            this.appService.SETTINGS,
            JSON.stringify(this.settings));
    }
}

