import {NgModule} from '@angular/core';
import {
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdSidenavModule
} from '@angular/material';

/*
 * The root module for the material modules.
 */

@NgModule({
    imports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule
    ]
})
export class AppUxModule {}

