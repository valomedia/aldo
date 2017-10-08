
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
    Session,
    Name,
    Rate,
    VideoUploadTransient,
    Aldo,
    VideoUpload,
    Abuse
}

let msgs: string[] = [];
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
msgs[GraphApiErrorType.Name] = 
    "Überprüfe die URL auf der du dich befindest";
msgs[GraphApiErrorType.Rate] = 
    "Mach bitte langsamer";
msgs[GraphApiErrorType.VideoUploadTransient] = 
    "Versuche es erneut, kontaktiere uns, wenn der Fehler weiterhin auftritt.";
msgs[GraphApiErrorType.Aldo] = 
    "Bitte kontaktiere den Support, damit wir das Problem beheben können.";
msgs[GraphApiErrorType.VideoUpload] = 
    "Konvertiere dein Video in ein anderes Format und versuche es erneut.";
msgs[GraphApiErrorType.Abuse] = 
    "Kontaktiere Facebook, um genauere Informationen zu erhalten.";

let titles: string[] = [];
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
titles[GraphApiErrorType.Name] = 
    "Seiten können nur über ihre ID aufgerufen werden";
titles[GraphApiErrorType.Rate] = 
    "Das API-Limit für deine Seite ist überschritten";
titles[GraphApiErrorType.VideoUploadTransient] = 
    "Beim Hochladen deines Videos ist ein Fehler aufgetreten";
titles[GraphApiErrorType.Aldo] = 
    "Aldo hat ein Problem verursacht";
titles[GraphApiErrorType.VideoUpload] = 
    "Bei der Verarbeitung deines Videos ist ein Fehler aufgetreten";
titles[GraphApiErrorType.Abuse] = 
    "Facebooks Algorithmen haben diese aktion als Missbrauch eingestuft";

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
        message?: string,
        type?: string,
        code: number,
        error_subcode?: number,
        error_user_title?: string,
        error_user_msg?: string,
        fbtrace_id?: string
    }) {
        this.message = message;
        this.type = type;
        this.code = code;
        this.error_subcode = error_subcode;
        this.error_user_title = error_user_title;
        this.error_user_msg = error_user_msg;
        this.fbtrace_id = fbtrace_id;
    }

    /*
     * Facebook's error message.
     */
    message: string;

    /*
     * The type of error for named errors.
     */
    type: string;

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
    error_user_msg: string;

    /*
     * A dialog title from Facebook, describing the error for the user.
     */
    error_user_title: string;

    /*
     * An identifyer used for Debugging internally by Facebook.
     */
    fbtrace_id: string;

    /*
     * Resolve the error codes to a class of error.
     */
    get errorClass() {
        if (this.code === 6001 || this.code === 356 || this.code === 390) {
            return GraphApiErrorType.VideoUploadTransient;
        }
        if (this.code === 100 || this.code === 2500) {
            return GraphApiErrorType.Aldo;
        }
        if (this.code === 6000) {
            return GraphApiErrorType.VideoUpload;
        }
        if (this.code === 389) {
            return GraphApiErrorType.DeadLink;
        }
        if (this.error_subcode === 458) {
            return GraphApiErrorType.Registration;
        }
        if (this.error_subcode === 459 || this.error_subcode === 464) {
            return GraphApiErrorType.Account;
        }
        if (this.error_subcode === 460) {
            return GraphApiErrorType.Password;
        }
        if (this.code === 1) {
            return GraphApiErrorType.Connection;
        }
        if (this.code === 2) {
            return GraphApiErrorType.Facebook;
        }
        if (this.code === 4 || this.code === 17 || this.code === 341) {
            return GraphApiErrorType.Overload;
        }
        if (this.code === 10 || this.code < 300 && this.code >= 200) {
            return GraphApiErrorType.Permission;
        }
        if (this.code === 32) {
            return GraphApiErrorType.Rate;
        }
        if (this.code === 368) {
            return GraphApiErrorType.Blocked;
        }
        if (this.code === 506) {
            return GraphApiErrorType.Duplicate;
        }
        if (this.code === 803) {
            return GraphApiErrorType.Name;
        }
        if (this.code === 1609005) {
            return GraphApiErrorType.DeadLink;
        }
        if (this.error_subcode === 463
            || this.error_subcode === 467
            || this.code === 102
            || this.code === 190
            || this.code >= 200 && this.code < 300
            || this.type === 'OAuthException'
        ) {
            return GraphApiErrorType.Session;
        }
        return GraphApiErrorType.UnhandledError;
    }

    /*
     * Get an appropriate help message for the user.
     */
    get msg(): string {
        return this.error_user_msg || msgs[this.errorClass];
    }

    /*
     * Get a short error description for use as dialog box title.
     */
    get title(): string {
        return this.error_user_title || titles[this.errorClass];
    }
}

