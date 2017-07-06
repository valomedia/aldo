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
    MdSnackBarModule,
    MdIconModule,
    MdTooltipModule,
    MdInputModule
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
        MdSnackBarModule,
        MdIconModule,
        MdTooltipModule,
        MdInputModule
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
        MdSnackBarModule,
        MdIconModule,
        MdTooltipModule,
        MdInputModule
    ]
})
export class AppUxModule {}

