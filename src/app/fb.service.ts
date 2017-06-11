import {Injectable} from '@angular/core';

/*
 * The Service providing the Facebook API.
 */

export enum HttpMethod {
    Get,
    Post,
    Delete
}

declare var FB: {
    init: (params: any) => void;
    api: (
        path: String,
        method: String,
        params: any,
        callback: (response: any) => void) => void;
    ui: (params: any, callback: (response: any) => void) => void;
};

@Injectable()
export class FbService {
    call(path: String, method = HttpMethod.Get, params = {}) {
            return new Promise((resolve, reject) =>
                FB.api(path, HttpMethod[method], params, (res) => {
                    if (res.error) { reject(res); }
                    resolve(res)
                }));
    }
}

