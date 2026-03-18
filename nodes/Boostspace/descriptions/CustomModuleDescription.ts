import type { INodeProperties } from 'n8n-workflow';

export const customModuleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['customModule'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a custom module', description: 'Creates a new custom module' },
			{ name: 'Delete', value: 'delete', action: 'Delete a custom module', description: 'Deletes a custom module' },
			{ name: 'Get', value: 'get', action: 'Get a custom module', description: 'Returns a single custom module' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many custom modules', description: 'Returns a list of custom modules' },
			{ name: 'Update', value: 'update', action: 'Update a custom module', description: 'Updates an existing custom module' },
		],
		default: 'getMany',
	},
];

export const customModuleFields: INodeProperties[] = [
	// ------ Name (for create) ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['customModule'], operation: ['create'] } },
		default: '',
		description: 'The name of the custom module',
	},

	// ------ Additional fields for create ------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['customModule'], operation: ['create'] } },
		default: {},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				default: '',
				description: 'The color of the module (hex code)',
			},
			{
				displayName: 'Icon Name',
				name: 'iconName',
				type: 'string',
				default: '',
				description: 'The icon name for the module',
			},
			{
				displayName: 'Icon Prefix',
				name: 'iconPrefix',
				type: 'string',
				default: '',
				description: 'The icon prefix (e.g. "fas", "far")',
			},
		],
	},

	// ------ Custom Module ID (for get, update, delete) ------
	{
		displayName: 'Custom Module Name or ID',
		name: 'customModuleId',
		type: 'options',
		typeOptions: { loadOptionsMethod: 'getCustomModules' },
		required: true,
		displayOptions: { show: { resource: ['customModule'], operation: ['get', 'update', 'delete'] } },
		default: '',
		description: 'The module to work with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ------ Update fields ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['customModule'], operation: ['update'] } },
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name of the module',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				default: '',
				description: 'The color of the module (hex code)',
			},
			{
				displayName: 'Icon Name',
				name: 'iconName',
				type: 'string',
				default: '',
				description: 'The icon name for the module',
			},
			{
				displayName: 'Icon Prefix',
				name: 'iconPrefix',
				type: 'string',
				default: '',
				description: 'The icon prefix (e.g. "fas", "far")',
			},
		],
	},

	// ------ Filters for getMany ------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: { show: { resource: ['customModule'], operation: ['getMany'] } },
		default: {},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip',
			},
		],
	},
];
