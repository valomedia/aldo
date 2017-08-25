import {Story, StoryType, DUMMY_STORY_TYPE} from './story';

/*
 * Classes related to Facebook videos.
 */

/*
 * A Facebook video as returned by the Facebook API.
 */
export interface VideoType extends StoryType {
    source: string;
}

/*
 * A Facebook video as used internally.
 */
export class Video extends Story {}
export interface Video extends VideoType {}

/*
 * The simplest valid Video.
 *
 * This exists, so the VideoService can use it to check which fields to request 
 * from Facebook, thus allowing adding a field to Video without changing 
 * VideoService.
 */
export const DUMMY_VIDEO_TYPE: VideoType = {
    ...DUMMY_STORY_TYPE,
    source: ''
};

