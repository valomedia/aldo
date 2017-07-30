import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

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
interface GraphApiResponseType<T> {
    data: T[];
    paging?: {
        cursors: {
            before: string,
            after: string
        },
        next?: string,
        previous?: string
    };
    next: () => Promise<GraphApiResponseType<T>|null>;
}

/*
 * A GraphAPI-response as used internally.
 */
export class GraphApiResponse<T> {
    constructor(kwargs: any, next: () => Promise<GraphApiResponse<T>|null>) {
        Object.assign(
            this,
            kwargs.data ? {next, ...kwargs} : {data: [kwargs], next: next});
    }

    /*
     * Fetch all results.
     *
     * This will recursively call the API to get all remaining results from the 
     * set this response belongs to, returning an Observable that will observe 
     * each individual T.
     */
    get dump() {
        return Observable
            .from([this])
            .expand(res => Observable.fromPromise(res.next()).filter(Boolean))
            .concatMap(res => res.data)
    }
}
export interface GraphApiResponse<T> extends GraphApiResponseType<T> {}

