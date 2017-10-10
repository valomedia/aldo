import {ProfileType, Profile, DUMMY_PROFILE_TYPE} from './profile';
import {PostService} from './post.service';
import {
    CoverPhoto,
    CoverPhotoType,
    DUMMY_COVER_PHOTO_TYPE
} from './cover-photo';

/*
 * Classes related to handling Facebook groups.
 */

/*
 * A Facebook group as returned by the Facebook API.
 */
export interface GroupType extends ProfileType {
    icon: string;
    description?: string;
    cover?: CoverPhotoType;
};

/*
 * A Facebook group as used internally.
 */
export class Group extends Profile {
    constructor(kwargs: GroupType) {
        super(kwargs);
        if (kwargs.cover) { this.cover = new CoverPhoto(kwargs.cover); }
    }

    protected get postService() {
        return this.serviceService.postService;
    }

    /*
     * The CoverPhoto of this Group.
     */
    cover?: CoverPhoto;

    /*
     * Get the feed of Posts of this Group.
     */
    get feed() {
        return this.postService.feed(this.id);
    }

    /*
     * Get the url to the icon for this Group.
     */
    get picture() {
        return this.icon;
    }
}
export interface Group extends GroupType {}

/*
 * The simplest valid Group.
 *
 * This exists, so the GroupService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Group without changing 
 * GroupService.
 */
export const DUMMY_GROUP_TYPE: GroupType = {
    ...DUMMY_PROFILE_TYPE,
    icon: '',
    description: '',
    cover: DUMMY_COVER_PHOTO_TYPE
};

