import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule
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
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
        MatTabsModule,
        MatCardModule,
        CovalentStepsModule,
        CovalentFileModule,
        MatTableModule,
        MatExpansionModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
        MatTabsModule,
        MatCardModule,
        CovalentStepsModule,
        CovalentFileModule,
        MatTableModule,
        MatExpansionModule
    ]
})
export class AppUxModule {}

