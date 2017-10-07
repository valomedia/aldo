import {Injectable, ReflectiveInjector} from '@angular/core';

import {UtilService} from './util.service';
import {AppUxService} from './app-ux.service';
import {CommentService} from './comment.service';
import {ConfService} from './conf.service';
import {FbService} from './fb.service';
import {PageService} from './page.service';
import {PostService} from './post.service';
import {VideoService} from './video.service';
import {AppService} from './app.service';
import {ProfileService} from './profile.service';
import {PhotoService} from './photo.service';
import {CachedHttpService} from './cached-http.service';
import {UserService} from './user.service';

/*
 * Service providing services built just-in-time, to break cyclic dependencies.
 */

@Injectable()
export class ServiceService {
    protected _utilService?: UtilService;
    protected _appUxService?: AppUxService;
    protected _commentService?: CommentService;
    protected _confService?: ConfService;
    protected _fbService?: FbService;
    protected _pageService?: PageService;
    protected _postService?: PostService;
    protected _videoService?: VideoService;
    protected _appService?: AppService;
    protected _profileService?: ProfileService;
    protected _photoService?: PhotoService;
    protected _cachedHttpService?: CachedHttpService;
    protected _userService?: UserService;

    /*
     * The UtilService.
     *
     * Gets the UtilService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get utilService(): UtilService {
        return this._utilService
            || ReflectiveInjector
                .resolveAndCreate([UtilService])
                .get(UtilService);
    }

    /*
     * The AppUxService.
     *
     * Gets the AppUxService singleton for this instance, building it, if it 
     * does not exist yet.
     */
    get appUxService(): AppUxService {
        return this._appUxService
            || (this._appUxService = this.utilService.inject(AppUxService));
    }

    /*
     * The CommentService.
     *
     * Gets the CommentService singleton for this instance, building it, if it 
     * does not exist yet.
     */
    get commentService(): CommentService {
        return this._commentService
            || (this._commentService = this.utilService.inject(CommentService));
    }

    /*
     * The ConfService.
     *
     * Gets the ConfService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get confService(): ConfService {
        return this._confService
            || (this._confService = this.utilService.inject(ConfService));
    }

    /*
     * The FbService.
     *
     * Gets the FbService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get fbService(): FbService {
        return this._fbService
            || (this._fbService = this.utilService.inject(FbService));
    }

    /*
     * The PageService.
     *
     * Gets the PageService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get pageService(): PageService {
        return this._pageService
            || (this._pageService = this.utilService.inject(PageService));
    }

    /*
     * The PostService.
     *
     * Gets the PostService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get postService(): PostService {
        return this._postService
            || (this._postService = this.utilService.inject(PostService));
    }

    /*
     * The VideoService.
     *
     * Gets the VideoService singleton for this instance, building it, if it 
     * does not exist yet.
     */
    get videoService(): VideoService {
        return this._videoService
            || (this._videoService = this.utilService.inject(VideoService));
    }

    /*
     * The AppService.
     *
     * Gets the AppService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get appService(): AppService {
        return this._appService
            || (this._appService = this.utilService.inject(AppService));
    }

    /*
     * The ProfileService.
     *
     * Gets the ProfileService singleton for this instance, building it, if it 
     * does not exist yet.
     */
    get profileService(): ProfileService {
        return this._profileService
            || (this._profileService = this.utilService.inject(ProfileService));
    }

    /*
     * The PhotoService.
     *
     * Gets the PhotoService singleton for this instance, building it, if it 
     * does not exist yet.
     */
    get photoService(): PhotoService {
        return this._photoService
            || (this._photoService = this.utilService.inject(PhotoService));
    }

    /*
     * The CachedHttpService.
     *
     * Gets the CachedHttpService singleton for this instance, building it, if 
     * it does not exist yet.
     */
    get cachedHttpService(): CachedHttpService {
        return this._cachedHttpService
            || (this._cachedHttpService
                = this.utilService.inject(CachedHttpService));
    }

    /*
     * The UserService.
     *
     * Gets the UserService singleton for this instance, building it, if it does 
     * not exist yet.
     */
    get userService(): UserService {
        return this._userService
            || (this._userService = this.utilService.inject(UserService));
    }
}

