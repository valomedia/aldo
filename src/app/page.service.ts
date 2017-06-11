import {Injectable} from '@angular/core';

import {Page, EMPTY_PAGE} from './page';
import {FbService, HttpMethod} from './fb.service';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    constructor(private fbService: FbService) {}
    get(path: String): any {
        return this.fbService
            .call(path, HttpMethod.Get, {fields: Object.keys(EMPTY_PAGE)});
    }
    getPages(): Promise<Page[]> {
        return this.get('me/accounts').then((res: {data: Page[]}) =>
            res.data.sort((a,b) => b.fan_count - a.fan_count));
    }
    getPage(id: number): Promise<Page> {
        return this.get(id.toString());
    }
}

