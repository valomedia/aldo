import {NgModule} from '@angular/core';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

/*
 * The root module for the material modules.
 */

@NgModule({
    imports: [
        MdButtonModule,
        MdCheckboxModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule
    ]
})
export class AppUxModule {}

