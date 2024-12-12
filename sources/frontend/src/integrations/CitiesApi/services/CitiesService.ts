/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCitiesResponse } from '../models/GetCitiesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CitiesService {
    /**
     * @param startsWith
     * @param offset
     * @param limit
     * @returns GetCitiesResponse OK
     * @throws ApiError
     */
    public static getApiV10Cities(
        startsWith?: string,
        offset?: number,
        limit?: number,
    ): CancelablePromise<GetCitiesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1.0/cities',
            query: {
                'StartsWith': startsWith,
                'Offset': offset,
                'Limit': limit,
            },
        });
    }
}
