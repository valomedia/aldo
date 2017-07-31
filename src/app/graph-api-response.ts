import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import {Expandable, ExpandableType} from './expandable';

/*
 * Classes related to replies from the GraphAPI.
 */

/*
 * An internal type for GraphAPI-responses.
 *
 * Here non-paged replies have had their content added to the data field, to 
 * make handling easier.  There is no type for the actual replies from the API, 
 * because the replies have no common structure.
 */
interface GraphApiResponseType<T> extends ExpandableType<T> {
    paging?: {
        cursors: {
            before: string,
            after: string
        },
        next?: string,
        previous?: string
    };
}

/*
 * A GraphAPI-response as used internally.
 */
export class GraphApiResponse<T> extends Expandable<T> {
    constructor(kwargs: any, next: () => Observable<GraphApiResponse<T>>) {
        super();
        Object.assign(
            this,
            kwargs.data ? {next, ...kwargs} : {data: [kwargs], next: next});
    }

    /*
     * Filler, to make the typechecker happy.
     */
    next() {
        return Observable.empty();
    }
}
export interface GraphApiResponse<T> extends GraphApiResponseType<T> {}

