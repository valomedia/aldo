import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/concatMap';

/*
 * Asynchronous linked list.
 *
 * This represents an object, that is part of a stream, where the stream is not 
 * managed by some othor object, but rather each object knows how to get to the 
 * next one.
 */

export interface ExpandableType<T> {
    data: T[];
    next: () => Promise<Expandable<T>|null>;
}

export abstract class Expandable<T> implements ExpandableType<T> {
    data: T[];
    abstract next(): Promise<Expandable<T>|null>;

    /*
     * Turn the Expandable into an Observable.
     */
    public get observable() {
        return Observable
            .from([this])
            .expand(res => Observable.fromPromise(res.next()).filter(Boolean))
            .concatMap(res => res.data)
    }
}
