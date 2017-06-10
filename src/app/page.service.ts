import {Injectable} from '@angular/core';

import {Page} from './page';
import {PAGES} from './mock-pages';

/*
 * The Service providing the Pages.
 */

@Injectable()
export class PageService {
    getPages(): Promise<Page[]> {
        // Simulate loading time.
        return new Promise(resolve => setTimeout(() => resolve(PAGES), 400));
    }
    getPage(id: number): Promise<Page> {
        return this.getPages()
            .then(pages => pages.find(page => page.id === id));
    }
}

