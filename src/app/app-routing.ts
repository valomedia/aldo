import {ReflectiveInjector} from '@angular/core';

import {UtilService} from './util.service';
import {AppService} from './app.service';

/*
 * Routing configuration.
 */

export class AppRouting {
    protected static appService: AppService = ReflectiveInjector
        .resolveAndCreate([UtilService])
        .get(UtilService)
        .inject(AppService);

    /*
     * The route parameter names in the order the parameters are encoded in the url.
     */
    static readonly PARAMS = [AppRouting.appService.MASTER, AppRouting.appService.DETAIL];

    /*
     * Aliases for the route parameter names.
     */
    static readonly ALIASES = {
        [AppRouting.appService.MASTER]: AppRouting.appService.MASTER,
        [AppRouting.appService.PROFILE]: AppRouting.appService.MASTER,
        [AppRouting.appService.PAGE]: AppRouting.appService.MASTER,
        [AppRouting.appService.USER]: AppRouting.appService.MASTER,
        [AppRouting.appService.GROUP]: AppRouting.appService.MASTER,
        [AppRouting.appService.EVENT]: AppRouting.appService.MASTER,
        [AppRouting.appService.APPLICATON]: AppRouting.appService.MASTER,
        [AppRouting.appService.DETAIL]: AppRouting.appService.DETAIL,
        [AppRouting.appService.POST]: AppRouting.appService.DETAIL,
    };
}

