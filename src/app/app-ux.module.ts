import {NgModule} from '@angular/core';
import {
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule
} from '@angular/material';

/*
 * The root module for the material modules.
 */

@NgModule({
    imports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule
    ]
})
export class AppUxModule {}

