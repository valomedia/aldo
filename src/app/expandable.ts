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
    next: () => Observable<Expandable<T>>;
}

export abstract class Expandable<T> implements ExpandableType<T> {
    data: T[];
    abstract next(): Observable<Expandable<T>>;

    /*
     * Turn the Expandable into an Observable.
     */
    public get expanded() {
        return Observable
            .of(this)
            .expand(res => res.next())
            .concatMap(res => res.data);
    }
}
