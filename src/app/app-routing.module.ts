import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {PagesComponent} from './pages.component';
import {PageComponent} from './page.component';
import {MissingFeatureComponent} from './missing-feature.component';
import {NotFoundComponent} from './not-found.component';
import {NoDetailComponent} from './no-detail.component';
import {PostComponent} from './post.component';
import {LayoutComponent} from './layout.component';

const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: ':page',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: PageComponent
            },
            {
                path: ':post',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: PageComponent
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: PostComponent,
                        outlet: 'detail'
                    },
                    {
                        path: '**',
                        redirectTo: '/'
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

