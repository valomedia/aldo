
/*
 * The Settings the user can set in the app.
 */

export class Settings {
    constructor(settings?: Settings) {
        if (settings) { Object.assign(this, settings); }
    }

    /*
     * Settings, that change the optics of the application.
     */
    ui = {
        dark: false
    }
}

