import {Injectable} from '@angular/core';

import {PARAMS} from './app-routing';

/*
 * The Service providing useful global constants.
 */

@Injectable()
export class AppService {
    PARAMS = PARAMS;
    PROFILE = 'profile'
    PAGE = 'profile';
    USER = 'profile';
    GROUP = 'profile';
    EVENT = 'profile';
    APPLICATON = 'profile';
    POST = 'post';
    PRIMARY = 'primary';
    ACCENT = 'accent';
    WARN = 'warn';
    SIDE = 'side';
    OVER = 'over';
    PUSH = 'push';
}

