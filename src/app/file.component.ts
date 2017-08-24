import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';

import {TdFileInputComponent} from '@covalent/core';

import {Ressource} from './app';
import {AppService} from './app.service';

/*
 * The Component used to select a file.
 *
 * This will prompt the user to provide a link to a file, or upload a file from 
 * their harddrive.
 */

@Component({
    selector: 'file',
    templateUrl: './_file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent {
    constructor(protected appService: AppService) {}

    protected _link = '';
    protected _ressource?: Ressource|null;
    protected _file?: File;

    @Input()
    fileSizeLimit = 0;

    @Input()
    accept = '';

    /*
     * Whether the file selected is too big.
     *
     */
    get error() {
        return this.fileSizeLimit
            && !!this._file
            && this._file.size > this.fileSizeLimit;
    }

    /*
     * The ressource the user has chosen.
     */
    get ressource() {
        return this._ressource;
    }
    @Input()
    set ressource(ressource: Ressource|null) {
        this._ressource = ressource;
        this.ressourceChange.emit(this.ressource);
    }
    @Output()
    ressourceChange = new EventEmitter<Ressource|null>();

    /*
     * The link the user has added.
     */
    get link() {
        return this._link;
    }
    set link(link: string|null) {
        this._link = link;
        this._file = null;
        this.ressource = link;
    }

    /*
     * The File the user selected, if any.
     */
    get file() {
        return this._file;
    }
    set file(file: File|null) {
        this._file = file;
        this._link = '';
        this.ressource = this.error ? null : file;
    }
}

