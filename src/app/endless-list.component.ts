import {Component, OnInit, Input} from '@angular/core';

import {Observable} from 'rxjs/Observable';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'endless-list',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['dist/endless-list.component.css']
})
export class EndlessListComponent implements OnInit {

    @Input()
    content: Observable<any>;

    ngOnInit() {}
}

