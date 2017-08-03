import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {PagesComponent} from './pages.component';
import {PageComponent} from './page.component';
import {MissingFeatureComponent} from './missing-feature.component';
import {NotFoundComponent} from './not-found.component';

const ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: ':page',
        component: PageComponent
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
    {
        path: '',
        component: MissingFeatureComponent,
        outlet: 'detail'
    },
    {
        path: '**',
        component: NotFoundComponent,
        outlet: 'detail'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

