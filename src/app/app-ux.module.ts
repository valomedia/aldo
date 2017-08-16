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

import {CovalentStepsModule} from '@covalent/core';

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
        CovalentStepsModule
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
        CovalentStepsModule
    ]
})
export class AppUxModule {}

