import {
    Component,
    OnInit,
    Input,
    HostListener,
    ViewChild,
    ElementRef
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/mergeScan';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/mapTo';

import {Expandable} from './expandable';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'endless-list',
    template: `
        <div #element>
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['dist/endless-list.component.css']
})
export class EndlessListComponent<InType extends Expandable<OutType>, OutType>
        implements OnInit {

    @ViewChild('element')
    private element: ElementRef;

    /*
     * Controller for the output.
     */
    private controller: Subject<null>;

    /*
     * Whether there is already a request in flight.
     */
    private inFlight = false;

    @Input()
    input: Observable<InType>;

    /*
     * Content for the endless list.
     */
    output: Observable<OutType>;

    ngOnInit() {
        this.controller = new Subject<null>();
        this.output = Observable
            .concat(
                this.input,
                this.controller
                    .throttleTime(50)
                    .filter(() => !this.inFlight)
                    .mapTo(this.element
                        .nativeElement
                        .getBoundingClientRect()
                        .bottom)
                    .filter((bottomPosition) =>
                        bottomPosition < 2 * window.innerHeight)
                    .concatMap(() => Observable.from([null,null]))
                    .do(() => this.inFlight = true)
                    .mergeScan(
                        acc =>
                            acc
                                ? Observable
                                    .concat(
                                        acc.map((page) => page.next()),
                                        Observable.of(null))
                                    .first()
                                : Observable.of(null),
                        this.input,
                        1)
                    .do((res) => res || this.controller.complete())
                    .do(() => this.inFlight = false)
                    .filter(Boolean)
                    .concatAll())
            .concatMap(resultSet => resultSet.data);
    }

    @HostListener('window:scroll')
    load() {
        this.controller.next();
    }
}

