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


import * as runtime from '../runtime';
import {
    DpsResponse,
    DpsResponseFromJSON,
    DpsResponseToJSON,
    ReqFields,
    ReqFieldsFromJSON,
    ReqFieldsToJSON,
} from '../models';

export interface DpsPostRequest {
    body: ReqFields;
}

/**
 * no description
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async dpsPostRaw(requestParameters: DpsPostRequest): Promise<runtime.ApiResponse<DpsResponse>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling dpsPost.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json;charset=utf-8';

        const response = await this.request({
            path: `/dps`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReqFieldsToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DpsResponseFromJSON(jsonValue));
    }

    /**
     */
    async dpsPost(requestParameters: DpsPostRequest): Promise<DpsResponse> {
        const response = await this.dpsPostRaw(requestParameters);
        return await response.value();
    }

}
