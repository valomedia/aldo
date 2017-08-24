import {Component, Input, HostListener, ElementRef} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/mergeScan';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

import {Expandable} from './expandable';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'endless-list',
    templateUrl: './_endless-list.component.html',
    styleUrls: ['./endless-list.component.css']
})
export class EndlessListComponent<InType extends Expandable<OutType>, OutType> {
    constructor(protected elementRef: ElementRef) {}

    /*
     * Controller for the output.
     */
    protected controller: Subject<number>;

    /*
     * The number of requests, that are in flight.
     *
     * This includes requests already scheduled to take off, that have to wait 
     * for another request to complete, before they can be sent.
     */
    protected inFlight: number;

    /*
     * Content for the endless list.
     */
    output: Observable<OutType>;

    @Input()
    set input(input: Observable<InType>) {
        this.controller = new Subject<number>();
        this.inFlight = 0;
        this.output = Observable
            .concat(
                input,
                Observable
                    .concat(
                        Observable.of(0),
                        this.controller
                            .filter((bottom) =>
                                bottom < 2 * window.innerHeight))
                    .filter(() => !this.inFlight)
                    .concatMap(() => Observable.from([null,null]))
                    .do(() => ++this.inFlight)
                    .mergeScan(
                        acc =>
                            acc
                                ? Observable
                                    .concat(
                                        acc.map((page) => page.next()),
                                        Observable.of(null))
                                    .first()
                                : Observable.of(null),
                        input,
                        1)
                    .map((res) => res || this.controller.complete())
                    .do(() => --this.inFlight)
                    .filter(Boolean)
                    .concatAll())
            .concatMap(resultSet => resultSet.data);
    }

    @HostListener('window:scroll')
    load() {
        this.controller.next(
            this.elementRef.nativeElement.getBoundingClientRect().bottom);
    }
}

