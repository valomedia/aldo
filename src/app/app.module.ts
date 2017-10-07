import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, RouteReuseStrategy} from '@angular/router';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import {ServiceService} from './service.service';
import {AppComponent} from './app.component';
import {PageComponent} from './main/page.component';
import {PagesComponent} from './nav/pages.component';
import {PageService} from './page.service';
import {DashboardComponent} from './main/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {FbService} from './fb.service';
import {GraphApiErrorComponent} from './graph-api-error.component';
import {AppUxModule} from './app-ux.module';
import {AppUxService} from './app-ux.service';
import {PostDialogComponent} from './main/post-dialog.component';
import {CeilPipe} from './ceil.pipe';
import {PostService} from './post.service';
import {PostsComponent} from './main/posts.component';
import {EndlessListComponent} from './endless-list.component';
import {CustomRouteReuseStrategy} from './custom-route-reuse-strategy';
import {MissingFeatureComponent} from './missing-feature.component';
import {DisplacerComponent} from './main/displacer.component';
import {DisplacerPortalDirective} from './main/displacer-portal.directive';
import {ProfileCardComponent} from './profile-card.component';
import {PostComponent} from './aside/post.component';
import {LayoutComponent} from './layout.component';
import {NavComponent} from './nav/nav.component';
import {AsideComponent} from './aside/aside.component';
import {MainComponent} from './main/main.component';
import {NotFoundComponent} from './main/not-found.component';
import {NoDetailComponent} from './aside/no-detail.component';
import {AppContentDirective} from './app-content.directive';
import {VideoService} from './video.service';
import {CommentService} from './comment.service';
import {CommentsComponent} from './aside/comments.component';
import {CommentComponent} from './aside/comment.component';
import {AppRoutingService} from './app-routing.service';
import {AppRoutingDirective} from './app-routing.directive';
import {DummyComponent} from './dummy.component';
import {AppLinkDirective} from './app-link.directive';
import {FileComponent} from './main/file.component';
import {ConfService} from './conf.service';
import {AppService} from './app.service';
import {UtilService} from './util.service';
import {ProfileComponent} from './main/profile.component';
import {ProfileService} from './profile.service';
import {PhotoService} from './photo.service';
import {DetailComponent} from './aside/detail.component';
import {MasterComponent} from './main/master.component';
import {CachedHttpService} from './cached-http.service';
import {UserService} from './user.service';
import {GroupService} from './group.service';

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
        ProfileComponent,
        DetailComponent,
        MasterComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        ServiceService,
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
        PhotoService,
        CachedHttpService,
        UserService,
        GroupService
    ],
    entryComponents: [
        PostDialogComponent,
        GraphApiErrorComponent
    ]
})
export class AppModule {}

