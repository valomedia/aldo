import {Injectable} from '@angular/core';

/*
 * The Service providing useful global constants.
 *
 * This may seem silly but avoids confusing double quoting in templates.
 */

@Injectable()
export class AppService {
    readonly MASTER = 'master';
    readonly PROFILE = 'profile';
    readonly PAGE = 'page';
    readonly USER = 'user';
    readonly GROUP = 'group';
    readonly EVENT = 'event';
    readonly APPLICATON = 'application';
    readonly DETAIL = 'detail';
    readonly POST = 'post';
    readonly PRIMARY = 'primary';
    readonly ACCENT = 'accent';
    readonly WARN = 'warn';
    readonly SIDE = 'side';
    readonly OVER = 'over';
    readonly PUSH = 'push';
}

