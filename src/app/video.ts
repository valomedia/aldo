import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';

/*
 * Classes related to Facebook videos.
 */

/*
 * A Facebook video as returned by the Facebook API.
 */
export interface VideoType extends GraphApiObjectType {
    created_time: string;
    updated_time?: string;
    source: string;
}

/*
 * A Facebook video as used internally.
 */
export class Video extends GraphApiObject {
    constructor(kwargs: VideoType) {
        super(kwargs);
    }

    /*
     * Get the time this post was created.
     */
    get createdTime() {
        return new Date(this.created_time);
    }

    /*
     * Get the time this post was created.
     */
    get updatedTime() {
        return new Date(this.updated_time);
    }
}
export interface Video extends VideoType {}

/*
 * The simplest valid video.
 *
 * This exists, so the PageService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Video without changing 
 * VideoService.
 */
export const DUMMY_VIDEO_TYPE: VideoType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    created_time: '',
    updated_time: '',
    source: ''
};

