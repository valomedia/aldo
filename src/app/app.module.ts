import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, RouteReuseStrategy} from '@angular/router';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import {AppComponent} from './app.component';
import {PageComponent} from './page.component';
import {PageService} from './page.service';
import {AppRoutingModule} from './app-routing.module';
import {FbService} from './fb.service';
import {GraphApiErrorComponent} from './graph-api-error.component';
import {AppUxModule} from './app-ux.module';
import {AppUxService} from './app-ux.service';
import {PostDialogComponent} from './post-dialog.component';
import {CeilPipe} from './ceil.pipe';
import {PostService} from './post.service';
import {PostsComponent} from './posts.component';
import {EndlessListComponent} from './endless-list.component';
import {CustomRouteReuseStrategy} from './custom-route-reuse-strategy';
import {MissingFeatureComponent} from './missing-feature.component';
import {DisplacerComponent} from './displacer.component';
import {DisplacerPortalDirective} from './displacer-portal.directive';
import {ProfileCardComponent} from './profile-card.component';
import {LayoutComponent} from './layout.component';
import {AppContentDirective} from './app-content.directive';
import {VideoService} from './video.service';
import {CommentService} from './comment.service';
import {CommentsComponent} from './comments.component';
import {CommentComponent} from './comment.component';
import {AppRoutingService} from './app-routing.service';
import {AppRoutingDirective} from './app-routing.directive';
import {DummyComponent} from './dummy.component';
import {AppLinkDirective} from './app-link.directive';
import {FileComponent} from './file.component';
import {ConfService} from './conf.service';
import {AppService} from './app.service';
import {UtilService} from './util.service';
import {ProfileService} from './profile.service';
import {PhotoService} from './photo.service';

import {NavComponent} from './nav/nav.component';
import {PagesComponent} from './nav/pages.component';

import {AsideComponent} from './aside/aside.component';
import {PostComponent} from './aside/post.component';
import {NoDetailComponent} from './aside/no-detail.component';

import {MainComponent} from './main/main.component';
import {DashboardComponent} from './main/dashboard.component';
import {ProfileComponent} from './main/profile.component';
import {NotFoundComponent} from './main/not-found.component';

/*
 * The Module definitions for AppComponent.
 */

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,
        AppUxModule
    ],
    declarations: [
        AppComponent,
        PageComponent,
        PagesComponent,
        DashboardComponent,
        GraphApiErrorComponent,
        PostDialogComponent,
        CeilPipe,
        PostsComponent,
        EndlessListComponent,
        MissingFeatureComponent,
        DisplacerComponent,
        DisplacerPortalDirective,
        ProfileCardComponent,
        PostComponent,
        LayoutComponent,
        NavComponent,
        AsideComponent,
        MainComponent,
        NotFoundComponent,
        NoDetailComponent,
        AppContentDirective,
        CommentsComponent,
        CommentComponent,
        AppRoutingDirective,
        DummyComponent,
        AppLinkDirective,
        FileComponent,
        ProfileComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        PageService,
        FbService,
        AppUxService,
        PostService,
        {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy
        },
        VideoService,
        CommentService,
        AppRoutingService,
        ConfService,
        AppService,
        UtilService,
        ProfileService,
        PhotoService
    ],
    entryComponents: [
        PostDialogComponent,
        GraphApiErrorComponent
    ]
})
export class AppModule {}

