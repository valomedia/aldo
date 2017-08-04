import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {PagesComponent} from './pages.component';
import {PageComponent} from './page.component';
import {MissingFeatureComponent} from './missing-feature.component';
import {NotFoundComponent} from './not-found.component';
import {NoDetailComponent} from './no-detail.component';

const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: '',
                component: NoDetailComponent,
                outlet: 'detail'
            }
        ]
    },
    {
        path: ':page',
        children: [
            {
                path: '',
                component: PageComponent
            },
            {
                path: '',
                component: NoDetailComponent,
                outlet: 'detail'
            },
            {
                path: '**',
                component: NotFoundComponent
            },
            {
                path: '**',
                component: NoDetailComponent,
                outlet: 'detail'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

