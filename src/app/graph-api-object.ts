import {ReflectiveInjector} from '@angular/core';

import {ServiceService} from './service.service';

/*
 * Classes related to things on Facebook.
 *
 * This contains the classes and interfaces, that all classes and interfaces, 
 * that represent things from the GraphAPI, extend, or implement, respectively.
 */

/*
 * The common base of all objects returned by the GraphAPI.
 */
export interface GraphApiObjectType {
    id: string;
    metadata?: {
        fields: [{
            name: string;
            description: string;
            type: string;
        }];
        type: string;
        connections: {[id: string]: string};
    };
};

/*
 * The common base of the internal representations of GraphAPI-objects.
 */
export class GraphApiObject {
    constructor(kwargs: GraphApiObjectType) {
        Object.assign(this, kwargs);
        this.serviceService = ReflectiveInjector
            .resolveAndCreate([ServiceService])
            .get(ServiceService);
    }

    protected serviceService: ServiceService;
};
export interface GraphApiObject extends GraphApiObjectType {};

/*
 * The simplest valid GraphApiObject.
 *
 * This exists, so the child classes can use it to build their dummy constants.
 */
export const DUMMY_GRAPH_API_OBJECT_TYPE: GraphApiObjectType = {
    id: '',
};

