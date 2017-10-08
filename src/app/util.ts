
/*
 * Some useful functions that don't belong elsewhere.
 *
 * These really belong into UtilService, but I had to move them here, because 
 * SystemJS starts puking all over the place, when I try to do that.  I have 
 * decided, that since these methods are all simple and self-contained, there is 
 * not much point in injecting them and trying to do so will create more 
 * problems than it solves.
 */

/*
 * What fields to request to fetch a certain object.
 *
 * This will generate the fields parameter for a request to the GraphAPI, 
 * requesting each field that is present in the given object.  Additionally 
 * a summary will be requested for all fields that contain a summary.
 */
export function buildFields(obj: Object) {
    return Object.keys(obj)
        .map(k => obj[k]['summary'] ? k + '.summary(true)' : k);
}
