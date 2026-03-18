import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import type { ICustomFieldValue, IWebhookConfig } from './types';

/**
 * Make an authenticated API request to Boost.space.
 * Mirrors base.imljson: baseUrl = https://{syskey}.boost.space, Bearer token auth.
 */
export async function boostspaceApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | IDataObject[] = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('boostspaceApi');
	const baseUrl = `https://${credentials.syskey}.boost.space`;

	const hasBody = Array.isArray(body) ? body.length > 0 : Object.keys(body).length > 0;

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${credentials.apiToken}`,
		},
		qs,
	};

	// Manually stringify body to ensure exact JSON is sent
	if (hasBody) {
		options.body = JSON.stringify(body);
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		// Response may be string or already parsed object
		if (typeof response === 'string') {
			try {
				return JSON.parse(response);
			} catch {
				return response;
			}
		}
		return response;
	} catch (error) {
		const err = error as any;

		// Extract error details from various possible locations
		const cause = err.cause || {};
		const responseData = cause.response?.body || cause.error || err.description || err.message || '';
		const responseStr = typeof responseData === 'object'
			? JSON.stringify(responseData)
			: String(responseData);
		const statusCode = err.httpCode || cause.statusCode || '';
		const sentStr = JSON.stringify(body);

		throw new NodeApiError(this.getNode(), err as JsonObject, {
			message: `Boost.space API error${statusCode ? ` (${statusCode})` : ''}: ${method} ${endpoint}`,
			description: `${responseStr}. Sent: ${sentStr}`,
		});
	}
}

/**
 * Convert user-provided custom field key-value pairs to the Boost.space API format.
 * Port of Make function: customFieldsOutputFormat
 *
 * Input:  { fieldName: "value", multiField: ["a", "b"], __internal: "skip" }
 * Output: [{ customFieldInputName: "fieldName", value: "value" },
 *          { customFieldInputName: "multiField", value: "a|b" }]
 */
export function customFieldsToApiFormat(
	customFieldValues: IDataObject,
): ICustomFieldValue[] {
	const result: ICustomFieldValue[] = [];
	for (const [key, value] of Object.entries(customFieldValues)) {
		if (!key.startsWith('__')) {
			result.push({
				customFieldInputName: key,
				value: Array.isArray(value) ? value.join('|') : String(value ?? ''),
			});
		}
	}
	return result;
}

/**
 * Flatten customFieldsValues from API response onto the record object.
 * Port of Make function: outputCustomField
 *
 * Input:  { id: 1, customFieldsValues: [{ customFieldInputName: "status", value: "active" }] }
 * Output: { id: 1, customFieldsValues: [...], status: "active" }
 */
export function flattenCustomFields(record: IDataObject): IDataObject {
	const result = { ...record };
	if (
		record.customFieldsValues &&
		typeof record.customFieldsValues === 'object'
	) {
		const cfValues = record.customFieldsValues as IDataObject[] | IDataObject;
		const entries = Array.isArray(cfValues)
			? cfValues
			: Object.values(cfValues);
		for (const cfObject of entries) {
			const fieldName = (cfObject as IDataObject).customFieldInputName as string;
			if (fieldName && !Object.prototype.hasOwnProperty.call(result, fieldName)) {
				result[fieldName] = (cfObject as IDataObject).value;
			}
		}
	}
	return result;
}

/**
 * Build a query filter string from an object of parameters.
 * Port of Make function: buildFilter
 *
 * Input:  { spaceId: 5, customModuleId: 3, empty: "" }
 * Output: "spaceId=5&customModuleId=3"
 */
export function buildFilterString(params: IDataObject): string {
	const filters: string[] = [];
	for (const [key, value] of Object.entries(params)) {
		if (value !== null && value !== undefined && value !== '') {
			filters.push(`${key}=${value}`);
		}
	}
	return filters.join('&');
}

/**
 * Format an array of records for bulk creation.
 * Port of Make function: createBulkFormat
 */
export function formatBulkRecords(
	records: IDataObject[],
	spaceId: number | string,
): IDataObject[] {
	return records.map((record) => {
		const result: IDataObject = { ...record, spaceId };
		if (record.customFieldsValues && typeof record.customFieldsValues === 'object') {
			const tmp: ICustomFieldValue[] = [];
			for (const [key, value] of Object.entries(record.customFieldsValues as IDataObject)) {
				if (!key.startsWith('__')) {
					tmp.push({
						customFieldInputName: key,
						value: Array.isArray(value) ? value.join('|') : String(value ?? ''),
					});
				}
			}
			result.customFieldsValues = tmp;
		}
		return result;
	});
}

/**
 * Process bulk API response: flatten custom fields and wrap with count.
 * Port of Make function: responseBulkFormat
 */
export function processBulkResponse(
	body: IDataObject | IDataObject[],
): { created: number; records: IDataObject[] } {
	const records = Array.isArray(body) ? body : [body];
	const processedRecords = records.map((record) => flattenCustomFields(record));
	return {
		created: records.length,
		records: processedRecords,
	};
}

/**
 * Map event type parameter to Boost.space module and event names.
 */
export function getWebhookConfig(eventType: string): IWebhookConfig {
	const configs: Record<string, IWebhookConfig> = {
		recordCreated: { module: 'custom-module-item', events: ['CREATE'] },
		recordUpdated: { module: 'custom-module-item', events: ['UPDATE'] },
		recordDeleted: { module: 'custom-module-item', events: ['DELETE'] },
		recordCud: { module: 'custom-module-item', events: ['CREATE', 'UPDATE', 'DELETE'] },
		moduleCreated: { module: 'custom-module', events: ['CREATE'] },
		moduleUpdated: { module: 'custom-module', events: ['UPDATE'] },
		moduleDeleted: { module: 'custom-module', events: ['DELETE'] },
		moduleCud: { module: 'custom-module', events: ['CREATE', 'UPDATE', 'DELETE'] },
	};
	return configs[eventType] ?? { module: 'custom-module-item', events: ['CREATE'] };
}

/**
 * Parse custom fields from the n8n fixedCollection format into a flat object.
 * n8n sends: { field: [{ key: "name", value: "val" }, ...] }
 * We need:   { name: "val", ... }
 */
export function parseCustomFieldsInput(
	fixedCollection: IDataObject | undefined,
): IDataObject {
	const result: IDataObject = {};
	if (!fixedCollection) return result;
	const fields = (fixedCollection.field as IDataObject[]) ?? [];
	for (const f of fields) {
		if (f.key) {
			result[f.key as string] = f.value;
		}
	}
	return result;
}
