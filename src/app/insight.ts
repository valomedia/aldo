import {
    GraphApiObject,
    GraphApiObjectType,
    DUMMY_GRAPH_API_OBJECT_TYPE
} from './graph-api-object';

/*
 * Classes related to handling Facebook page insights.
 */

/*
 * A single Value for any particular Metric.
 */
export type Value = number | {[key: string]: number};

/*
 * A single InsightsValue, as returned by the Facebook API.
 */
export interface InsightsValueType {
    end_time: string;
    value: Value;
}

/*
 * A single InsightsResult, as returned by the Facebook API.
 */
export interface InsightsResultType extends GraphApiObjectType {
    description: string;
    name: string;
    period: string;
    title: string;
    values: InsightsValueType[];
}

/*
 * A single InsightsValue, as used internally.
 */
export class InsightsValue {
    constructor(kwargs: InsightsValueType) {
        Object.assign(this, kwargs);
    }

    get endTime() {
        return new Date(this.end_time);
    }
}
export interface InsightsValue extends InsightsValueType {}

/*
 * A single InsightsResult, as used internally.
 */
export class InsightsResult extends GraphApiObject {
    constructor(kwargs: InsightsResultType) {
        super(kwargs);
        this.values = kwargs.values.map(
            insightsValueType => new InsightsValue(insightsValueType));
    }

    values: InsightsValue[];
}
export interface InsightsResult extends InsightsResultType {}

/*
 * A Facebook Page Metric.
 *
 * This class represents a single Metric, with a single Value, as used 
 * internally.
 */
export class Metric<T extends Value> {
    constructor(public description: string) {}

    /*
     * Daily datapoint.
     *
     * Datapoint containing data for yesterday. This will always refer to the 24 
     * hours before the most recent T07:00:00+0000.
     */
    public day?: T

    /*
     * Weekly datapoint.
     *
     * Datapoint containing data for the last seven days. This will always refer 
     * to the 168 hours before the most recent T07:00:00+0000.
     */
    public week?: T

    /*
     * Monthly datapoint.
     *
     * Datapoint containing data for the last four weeks. This will always refer 
     * to the 672 hours before the most recent T07:00:00+0000.
     */
    public days_28?: T
}

/*
 * A Facebook Page Insight.
 *
 * This is the class used internally wherever Insights are needed, for the 
 * simple reason, that it (unlike the above classes), represents the data in 
 * a sane way.
 *
 * This is meant to be created by the InsightsService, its input needs to be 
 * formatted in a very particular way, it will not work with any set of 
 * InsightsResults.
 */
export class Insight {
    constructor(data: InsightsResult[]) {
        for (const e of data) {
            (this[e.name] as Metric<Value>)[e.period] = e.values[0].value;
        }
    }

    /*
     * The number of stories created by a Page.
     */
    page_stories = new Metric<number>("Die Anzahl der Posts von deiner Seite.");

    /*
     * The number of stories about a Page's stories, by Page story type.
     */
    page_stories_by_story_type = new Metric<{
        'checkin': number,
        'coupon': number,
        'event': number,
        'fan': number,
        'mention': number,
        'page post': number,
        'question': number,
        'user post': number,
        'other': number
    }>("Die Anzahl der Posts mit Bezug auf deine Seite, nach Art.");
}

/*
 * The simplest valid InsightsResultType.
 *
 * This exists, so the InsightsService can use it to check which fields to 
 * request from Facebook, thus theoretically allowing adding a field to 
 * InsightsResult without changing InsightsService.
 *
 * In practice it is hard to imagine a likely scenario, where this would happen, 
 * without Facebook completely changing Insights, forcing both classes to be 
 * rewritten anyways, but its nice and regular to have this constant for all the 
 * classes that extend GraphApiObject.
 */
export const DUMMY_INSIGHTS_RESULT_TYPE: InsightsResultType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    description: '',
    name: '',
    period: '',
    title: '',
    values: [] as InsightsValueType[]
}

/*
 * The list of METRICS currently supported.
 */
export const METRICS = [
    'page_stories',
    'page_stories_by_story_type'
]

/*
 * The types of story.
 *
 * This contains descriptions for the different story types.
 */
const STORY_TYPES = {
    'checkin': "Nutzer, die da waren",
    'coupon': "Eingelöste Coupons",
    'event': "Reservierungen",
    'fan': "Gefällt-Mir-Angaben",
    'mention': "Erwähnungen",
    'page post': "Posts von Seiten",
    'question': "Beantwortete Fragen",
    'user post': "Posts von Nutzern",
    'other': "Andere"
}

