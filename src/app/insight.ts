import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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
export class Metric {
    constructor(
        public description: string,
        public categories?: {[key: string]: string}) {}

    /*
     * Daily datapoint.
     *
     * Datapoint containing data for yesterday. This will always refer to the 24 
     * hours before the most recent T07:00:00+0000.
     */
    public day?: Value

    /*
     * Weekly datapoint.
     *
     * Datapoint containing data for the last seven days. This will always refer 
     * to the 168 hours before the most recent T07:00:00+0000.
     */
    public week?: Value

    /*
     * Monthly datapoint.
     *
     * Datapoint containing data for the last four weeks. This will always refer 
     * to the 672 hours before the most recent T07:00:00+0000.
     */
    public days_28?: Value
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
export class Insight extends DataSource<any> {
    constructor(data: InsightsResult[]) {
        super();

        for (const e of data) {
            (this[e.name] as Metric)[e.period] = e.values[0].value;
        }
    }

    /*
     * The number of stories created by a Page.
     */
    page_stories = new Metric("Posts von deiner Seite.");

    /*
     * The number of stories about a Page's stories, by Page story type.
     */
    page_stories_by_story_type = new Metric(
        "Posts mit Bezug auf deine Seite, nach Art.",
        PAGE_STORY_TYPES_DESCRIPTIONS);

    /*
     * The number of people talking about a Page's stories, by Page story type.
     */
    page_storytellers_by_story_type = new Metric(
        "Nutzer die über die Posts reden, nach Art.",
        PAGE_STORY_TYPES_DESCRIPTIONS);

    connect(): Observable<Metric[]> {
        // Filter by simple Metrics, complex Metrics are not yet supported.
        return Observable.of(
            METRICS
                .map(metric => this[metric])
                .filter(metric => !metric.categories));
    }

    disconnect() {}
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
    'page_stories_by_story_type',
    'page_storytellers_by_story_type'
]

/*
 * The types of story.
 *
 * This contains descriptions for the different story types.
 */
export const PAGE_STORY_TYPES_DESCRIPTIONS = {
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

