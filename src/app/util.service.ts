import {Injectable, ReflectiveInjector} from '@angular/core';
import {
    Http,
    ConnectionBackend,
    XHRBackend,
    BrowserXhr,
    ResponseOptions,
    BaseResponseOptions,
    XSRFStrategy,
    CookieXSRFStrategy,
    RequestOptions,
    BaseRequestOptions
} from '@angular/http';

import {AppService} from './app.service';
import {AppUxService} from './app-ux.service';
import {CommentService} from './comment.service';
import {ConfService} from './conf.service';
import {FbService} from './fb.service';
import {PageService} from './page.service';
import {PostService} from './post.service';
import {VideoService} from './video.service';
import {ProfileService} from './profile.service';
import {PhotoService} from './photo.service';

/*
 * Service providing some useful functions, that don't belong anywhere else.
 */

@Injectable()
export class UtilService {
    constructor() {
        this.appUxService = this.inject(AppUxService);
        this.commentService = this.inject(CommentService);
        this.confService = this.inject(ConfService);
        this.fbService = this.inject(FbService);
        this.pageService = this.inject(PageService);
        this.postService = this.inject(PostService);
        this.videoService = this.inject(VideoService);
        this.appService = this.inject(AppService);
        this.profileService = this.inject(ProfileService);
        this.photoService = this.inject(PhotoService);
    }

    // TODO Make this protected again.
    reflectiveInjector = ReflectiveInjector.resolveAndCreate([
        AppService,
        AppUxService,
        CommentService,
        ConfService,
        FbService,
        PageService,
        PostService,
        VideoService,
        Http,
        {
            provide: ConnectionBackend,
            useClass: XHRBackend
        },
        BrowserXhr,
        {
            provide: ResponseOptions,
            useClass: BaseResponseOptions
        },
        {
            provide: XSRFStrategy,
            useFactory: () => new CookieXSRFStrategy()
        },
        {
            provide: RequestOptions,
            useClass: BaseRequestOptions
        },
        ProfileService,
        PhotoService
    ]);

    /*
     * This is madness.
     *
     * So a few classes need stuff injected into them, but they also have 
     * constructor parameters.  One way to solve this would be 
     * https://github.com/angular/di.js/issues/22#issuecomment-39874167, but 
     * this means, that every Service that returns GraphApiObjects would need to 
     * get a factory for these injected.  Then those GraphApiObjects would in 
     * turn get injected Services for all their edges, creating a circular 
     * dependency, since Facebook's graph DB is not a directed graph.
     *
     * Another technique I have tried for way too long to get working is to have 
     * a GraphApiObjectService, that will build a GraphApiObject and add its 
     * dependencies to it.  That way only the GraphApiObjectService has to 
     * depend on the Services that create GraphApiObjects and FbService can 
     * simply inject GraphApiObjectService, passing it the constructor and 
     * parameters, instead of creating the GraphApiObject directly.  The issue 
     * here is that FbService will depend on GraphApiObjectService, which will 
     * in turn depend on all the services, that return GraphApiObjects, which of 
     * course themselves depend on the FbService we started with in the first 
     * place.  In therory this should be fixable with forwardRef(), or by 
     * fidgeting around with setTimeout(), but I could not get it to work for 
     * the hell of it.
     *
     * My last hope was having the GraphApiObjectService not be injectable at 
     * all, instead just calling its constructor directly in the FbService, 
     * providing the service itself via this and having GraphApiObjectService in 
     * turn create its dependencies by simply calling their constructors with 
     * the FbService I passed.  But for some weird reason this still throws 
     * dependency cycle errors.  https://stackoverflow.com/a/43887382/8380968 
     * talks about having to use separate files and dynamic typing to trick the 
     * framework into not recognizing the dependencies... what the hell kind of 
     * framework is this even?  Never again -.-
     *
     * This solution is somewhat messy as well, but at least it keeps all the 
     * mess in one place, where it is easy to keep track of.  The problem is 
     * that this relies on the dependencies for Angular's Services staying the 
     * same.  Since these are not part of the public API as far as I can tell, 
     * this makes this in its essence very similar to playing russian roulette, 
     * except you never stop pulling the trigger, you just go until you get 
     * hurt.
     *
     * To work around this chance of random breakage, I will freeze Angular's 
     * version, before this app goes into production.  However this is not 
     * a permanent solution.  A permanent solution could be to have FbService 
     * use XMLHttpRequest instead of @angular/http, but I feel hesitant to go to 
     * a place, where I essentially cannot make use of the framework in the most 
     * essential parts of the Application, although Angular regularly gives me 
     * the feeling, that this app could be so much simpler if it was built with 
     * no framework whatsoever.
     */
    inject = this.reflectiveInjector.get.bind(this.reflectiveInjector);

    protected appService: AppService;
    protected appUxService: AppUxService;
    protected commentService: CommentService;
    protected confService: ConfService;
    protected fbService: FbService;
    protected pageService: PageService;
    protected postService: PostService;
    protected videoService: VideoService;
    protected profileService: ProfileService;
    protected photoService: PhotoService;

    /*
     * What to link to, if the user clicks a Profile.
     */
    profileLink(id: string) {
        return this.appUxService.asideMode === this.appService.SIDE
            ? {profile: id}
            : {
                profile: id,
                post: null as null
            };
    }
}

