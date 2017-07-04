import {NgModule} from '@angular/core';
import {
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdGridListModule,
    MdMenuModule,
    MdSlideToggleModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdSnackBarModule
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
        MdListModule,
        MdGridListModule,
        MdMenuModule,
        MdSlideToggleModule,
        MdProgressSpinnerModule,
        MdDialogModule,
        MdSnackBarModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule,
        MdGridListModule,
        MdMenuModule,
        MdSlideToggleModule,
        MdProgressSpinnerModule,
        MdDialogModule,
        MdSnackBarModule
    ]
})
export class AppUxModule {}

