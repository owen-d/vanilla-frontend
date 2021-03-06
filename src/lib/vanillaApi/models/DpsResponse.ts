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
 * @interface DpsResponse
 */
export interface DpsResponse {
    /**
     * 
     * @type {number}
     * @memberof DpsResponse
     */
    dps: number;
    /**
     * 
     * @type {Array<Array<object>>}
     * @memberof DpsResponse
     */
    partialDerivatives: Array<Array<object>>;
}

export function DpsResponseFromJSON(json: any): DpsResponse {
    return {
        'dps': json['dps'],
        'partialDerivatives': json['partialDerivatives'],
    };
}

export function DpsResponseToJSON(value?: DpsResponse): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'dps': value.dps,
        'partialDerivatives': value.partialDerivatives,
    };
}


