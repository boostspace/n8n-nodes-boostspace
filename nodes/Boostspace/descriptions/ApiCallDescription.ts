import type { INodeProperties } from 'n8n-workflow';

export const apiCallOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['apiCall'] } },
		options: [
			{ name: 'Make', value: 'make', action: 'Make an API call', description: 'Makes an arbitrary authenticated API call' },
		],
		default: 'make',
	},
];

export const apiCallFields: INodeProperties[] = [
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		displayOptions: { show: { resource: ['apiCall'], operation: ['make'] } },
		options: [
			{ name: 'DELETE', value: 'DELETE' },
			{ name: 'GET', value: 'GET' },
			{ name: 'PATCH', value: 'PATCH' },
			{ name: 'POST', value: 'POST' },
			{ name: 'PUT', value: 'PUT' },
		],
		default: 'GET',
		description: 'The HTTP method to use',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['apiCall'], operation: ['make'] } },
		default: '',
		placeholder: 'custom-module-item',
		description: 'The path relative to /api/ (e.g. "custom-module-item" or "space/123")',
	},
	{
		displayName: 'Headers',
		name: 'headers',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: { show: { resource: ['apiCall'], operation: ['make'] } },
		default: {},
		options: [
			{
				name: 'header',
				displayName: 'Header',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Query Parameters',
		name: 'queryString',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: { show: { resource: ['apiCall'], operation: ['make'] } },
		default: {},
		options: [
			{
				name: 'parameter',
				displayName: 'Parameter',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['apiCall'],
				operation: ['make'],
				method: ['POST', 'PUT', 'PATCH'],
			},
		},
		default: '{}',
		description: 'The JSON body to send',
	},
];
