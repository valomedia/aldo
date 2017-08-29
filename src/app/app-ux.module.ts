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
    MdInputModule,
    MdTabsModule,
    MdCardModule
} from '@angular/material';

import {
    CovalentStepsModule,
    CovalentFileModule
} from '@covalent/core';

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
        MdInputModule,
        MdTabsModule,
        MdCardModule,
        CovalentStepsModule,
        CovalentFileModule
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
        MdInputModule,
        MdTabsModule,
        MdCardModule,
        CovalentStepsModule,
        CovalentFileModule
    ]
})
export class AppUxModule {}

