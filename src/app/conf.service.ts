import {Injectable} from '@angular/core';

/*
 * The Service providing global settings.
 */

/*
 * A permission.
 *
 * The required field is not jet checked.
 */
interface Perm {
    required: boolean;
    desc: string;
    msg?: string;
}

/*
 * The settings object available in the global scope.
 */
declare var conf: {
    fb: {
        appID: string;
        version: string;
        sdkUrl: string;
        apiUrl: string;
        videoUploadUrl: string;
        fileSizeLimit: number;
        videoSizeLimit: number;
        videoFormats: string[];
    };
    perms: {[name: string]: Perm};
}

@Injectable()
export class ConfService {

    /*
     * Configuration parameters necessary to talk to Facebook's APIs.
     */
    fb = conf.fb;

    /*
     * Configuration for the permissions the app requests.
     */
    perms = conf.perms;
}

