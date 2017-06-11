
/*
 * Errors from the GraphAPI.
 */

/*
 * The different error classes.
 */
export enum GraphApiErrorType {
    UnhandledError,
    Registration,
    Account,
    Password,
    Connection,
    Facebook,
    Overload,
    Permission,
    Blocked,
    Duplicate,
    DeadLink,
    Session
}

let msgs: String[] = [];
msgs[GraphApiErrorType.UnhandledError] = 
    "Bitte kontaktiere den Support, wir werden das Problem sofort beheben.";
msgs[GraphApiErrorType.Registration] = 
    "Registriere dich mit deinem Facebook-Account und versuche es erneut.";
msgs[GraphApiErrorType.Account] = 
    "Bitte melde dich bei Facebook an, um das Problem zu beheben.";
msgs[GraphApiErrorType.Password] = 
    "Bitte melde dich mit deinem neuen Passwort an.";
msgs[GraphApiErrorType.Connection] = 
    "Überprüfe deine Internetverbindung, oder probiere es später nochmal.";
msgs[GraphApiErrorType.Facebook] = 
    "Bitte probiere es später noch einmal.";
msgs[GraphApiErrorType.Overload] = 
    "Wenn der Fehler morgen immer noch auftritt, kontaktiere den Support.";
msgs[GraphApiErrorType.Permission] = 
    "Bitte prüfe, ob du alle nötigen Berechtigungen erteilt hast.";
msgs[GraphApiErrorType.Blocked] = 
    "Bitte probiere es morgen noch einmal.";
msgs[GraphApiErrorType.Duplicate] = 
    "Ändere den Inhalt deines Postes, um einen neuen Post zu erstellen.";
msgs[GraphApiErrorType.DeadLink] = 
    "Bitte überprüfe, dass alle Links in deinem Post auch funktionieren.";
msgs[GraphApiErrorType.Session] = 
    "Bitte melde dich erneut an.";

let titles: String[] = [];
titles[GraphApiErrorType.UnhandledError] = 
    "Es ist ein unerwarteter Fehler aufgetreten";
titles[GraphApiErrorType.Registration] = 
    "Aldo ist nicht mit deinem Facebook-Account verbunden";
titles[GraphApiErrorType.Account] = 
    "Es gibt ein Problem mit deinem Facebook-Account";
titles[GraphApiErrorType.Password] = 
    "Dein Passwort hat sich geändert";
titles[GraphApiErrorType.Connection] = 
    "Aldo kann keine Verbindung mit Facebook herstellen";
titles[GraphApiErrorType.Facebook] = 
    "Facebook hat ein vorrübergehendes Problem";
titles[GraphApiErrorType.Overload] = 
    "Aldo ist überlastet";
titles[GraphApiErrorType.Permission] = 
    "Aldo hat keine Berechtigung für diese Aktion";
titles[GraphApiErrorType.Blocked] = 
    "Dein Account wurde wegen einer Regelverletzung vorübergehend gesperrt";
titles[GraphApiErrorType.Duplicate] = 
    "Du hast versehentlich zwei mal das Gleiche gepostet";
titles[GraphApiErrorType.DeadLink] = 
    "Du hast dich beim Eingeben eines Links vertippt";
titles[GraphApiErrorType.Session] = 
    "Deine Sitzung ist abgelaufen oder geschlossen worden";

/*
 * The kind of error Facebook will return on a failed call to the GraphAPI.
 */
export class GraphApiError {
    constructor({
        message,
        type = '',
        code,
        error_subcode = 0,
        error_user_title = '',
        error_user_msg = '',
        fbtrace_id
    }: {
        message: String,
        type?: String,
        code: number,
        error_subcode?: number,
        error_user_title?: String,
        error_user_msg?: String,
        fbtrace_id: String
    }) {}

    /*
     * Facebook's error message.
     */
    message: String;

    /*
     * The type of error for named errors.
     */
    type: String;

    /*
     * Primary error code.
     */
    code: number;

    /*
     * Secondary error code.
     */
    error_subcode: number;

    /*
     * A message from Facebook, describing the error for the user.
     */
    error_user_msg: String;

    /*
     * A dialog title from Facebook, describing the error for the user.
     */
    error_user_title: String;

    /*
     * An identifyer used for Debugging internally by Facebook.
     */
    fbtrace_id: String;

    /*
     * Resolve the error codes to a class of error.
     */
    getErrorClass() {
        if (this.error_subcode == 458) {
            return GraphApiErrorType.Registration;
        }
        if (this.error_subcode == 459 || this.error_subcode == 464) {
            return GraphApiErrorType.Account;
        }
        if (this.error_subcode == 460) {
            return GraphApiErrorType.Password;
        }
        if (this.code == 1) {
            return GraphApiErrorType.Connection;
        }
        if (this.code == 2) {
            return GraphApiErrorType.Facebook;
        }
        if (this.code == 4 || this.code == 17 || this.code == 341) {
            return GraphApiErrorType.Overload;
        }
        if (this.code == 10 || this.code < 300 && this.code >= 200) {
            return GraphApiErrorType.Permission;
        }
        if (this.code == 368) {
            return GraphApiErrorType.Blocked;
        }
        if (this.code == 506) {
            return GraphApiErrorType.Duplicate;
        }
        if (this.code == 1609005) {
            return GraphApiErrorType.DeadLink;
        }
        if (this.error_subcode == 463
            || this.error_subcode == 467
            || this.code == 102
            || this.code == 190
            || this.code >= 200 && this.code < 300
            || this.type == 'OAuthException'
        ) {
            return GraphApiErrorType.Session;
        }
        return GraphApiErrorType.UnhandledError;
    }

    /*
     * Get an appropriate help message for the user.
     */
    getMsg(): String {
        return this.error_user_msg || msgs[this.getErrorClass()];
    }

    /*
     * Get a short error description for use as dialog box title.
     */
    getTitle(): String {
        return this.error_user_title || titles[this.getErrorClass()];
    }
}

