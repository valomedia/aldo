
/*
 * Classes related to things on Facebook.
 *
 * This contains the classes and interfaces, that all classes and interfaces, 
 * that represent things from the GraphAPI, extend, or implement, respectively.
 */

/*
 * The common base of all objects retuned by the GraphAPI.
 */
export interface GraphApiObjectType {
    id: number;
}

/*
 * The common base of the internal representation of GraphAPI-objects.
 */
export class GraphApiObject {
    constructor(kwargs: GraphApiObjectType) {
        Object.assign(this, kwargs);
    }
}
export interface GraphApiObject extends GraphApiObjectType {}

/*
 * The simplest valid GraphApiObject.
 *
 * This exists, so the child classes can use it to build their dummy constants.
 */
export const DUMMY_GRAPH_API_OBJECT_TYPE: GraphApiObjectType = {
    id: 0,
};

