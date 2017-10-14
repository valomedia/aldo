import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';

/*
 * Classes related to Facebook CoverPhotos.
 */

/*
 * A CoverPhoto as returned by the Facebook API.
 */
export interface CoverPhotoType extends GraphApiObjectType {
    offset_x: number;
    offset_y: number;
    source: string;
}

/*
 * A CoverPhoto as used internally.
 */
export class CoverPhoto extends GraphApiObject {
    constructor(kwargs: CoverPhotoType) {
        super(kwargs);
    }
}
export interface CoverPhoto extends CoverPhotoType {}

export const DUMMY_COVER_PHOTO_TYPE: CoverPhotoType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    offset_x: 0,
    offset_y: 0,
    source: ''
}

