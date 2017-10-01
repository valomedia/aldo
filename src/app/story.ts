import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';

import {Profile, ProfileType, DUMMY_PROFILE_TYPE} from './profile';

/*
 * Classes related to things posted to Facebook.
 */

/*
 * The common base of all stories returned by the GraphAPI.
 */
export interface StoryType extends GraphApiObjectType {
    created_time: string;
    from: ProfileType;
    updated_time?: string;
};

/*
 * The common base of the internal representations of GraphAPI-stories.
 */
export class Story extends GraphApiObject {
    constructor(kwargs: StoryType) {
        super({
            ...kwargs,
            from: new Profile(kwargs.from)
        } as GraphApiObjectType);
    }

    /*
     * The Profile that created this Story.
     */
    from: Profile;

    /*
     * Get the time this Story was created.
     */
    get createdTime() {
        return new Date(this.created_time);
    }

    /*
     * Get the time this Story was last changed, null otherwise.
     */
    get updatedTime() {
        return this.updated_time ? new Date(this.updated_time) : null;
    }
};
export interface Story extends StoryType {};

/*
 * The simplest valid Story.
 *
 * This exists, so the child classes can use it to build their dummy constants.
 */
export const DUMMY_STORY_TYPE: StoryType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    created_time: '',
    from: DUMMY_PROFILE_TYPE
};

