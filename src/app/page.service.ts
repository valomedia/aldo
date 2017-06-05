import {Injectable} from '@angular/core';

import {Page} from './page';
import {PAGES} from './mock-pages';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    pages = (): Promise<Page[]> => new Promise(
        resolve => setTimeout(() => resolve(PAGES), 400));
}
