import {NgModule} from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule} from '@angular/material';

/*
 * The root module for the material modules.
 */

@NgModule({
    imports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule
    ]
})
export class AppUxModule {}

