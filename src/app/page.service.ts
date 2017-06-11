import {Injectable} from '@angular/core';

import {Page} from './page';
import {FbService, HttpMethod} from './fb.service';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    constructor(private fbService: FbService) {}
    getPages(): Promise<Page[]> {
        return this.fbService
            .call('me/accounts', HttpMethod.Get, {fields: 'name'})
            .then((res: {data: Page[]}) => res.data);
    }
    getPage(id: number): Promise<Page> {
        return this.fbService.call(id.toString());
    }
}

