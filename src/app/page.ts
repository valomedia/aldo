
/*
 * A page.
 */

/*
 * A Facebook page as returned by the Facebook API.
 */
export interface Page {
    id: number;
    name: string;
    fan_count: number;
};

/*
 * The simplest valid page.
 *
 * This exists, so the PageService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Page without changing 
 * PageService.
 */
export const EMPTY_PAGE = {
    id: 0,
    name: '',
    fan_count: 0
};

