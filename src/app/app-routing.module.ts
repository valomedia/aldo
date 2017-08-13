import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DummyComponent} from './dummy.component';

const ROUTES: Routes = [
    {
        path: '**',
        component: DummyComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

