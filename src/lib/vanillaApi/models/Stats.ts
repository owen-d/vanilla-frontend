// tslint:disable
/**
 * Vanilla API
 * This API helps calculate gear effectiveness
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Stats
 */
export interface Stats {
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    crit: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    arcane: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    hit: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    shadow: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    frost: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    holy: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    fire: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    healing: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    pen: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    nature: number;
}

export function StatsFromJSON(json: any): Stats {
    return {
        'crit': json['crit'],
        'arcane': json['arcane'],
        'hit': json['hit'],
        'shadow': json['shadow'],
        'frost': json['frost'],
        'holy': json['holy'],
        'fire': json['fire'],
        'healing': json['healing'],
        'pen': json['pen'],
        'nature': json['nature'],
    };
}

export function StatsToJSON(value?: Stats): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'crit': value.crit,
        'arcane': value.arcane,
        'hit': value.hit,
        'shadow': value.shadow,
        'frost': value.frost,
        'holy': value.holy,
        'fire': value.fire,
        'healing': value.healing,
        'pen': value.pen,
        'nature': value.nature,
    };
}

