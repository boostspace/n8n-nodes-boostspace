import type { INodeProperties } from 'n8n-workflow';

export const fieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['field'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a field', description: 'Creates a new custom field input' },
			{ name: 'Delete', value: 'delete', action: 'Delete a field', description: 'Deletes a custom field input' },
			{ name: 'Get', value: 'get', action: 'Get a field', description: 'Returns a single custom field input' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many fields', description: 'Returns custom fields for a space' },
			{ name: 'Update', value: 'update', action: 'Update a field', description: 'Updates a custom field input' },
		],
		default: 'getMany',
	},
];

export const fieldFields: INodeProperties[] = [
	// ------ Name (for create) ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['create'] } },
		default: '',
		description: 'The name of the field',
	},

	// ------ Input Type (for create) ------
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['create'] } },
		options: [
			{ name: 'Date', value: 'date' },
			{ name: 'DateTime', value: 'datetime' },
			{ name: 'Float', value: 'float' },
			{ name: 'Number', value: 'number' },
			{ name: 'Rating', value: 'rating' },
			{ name: 'Select', value: 'select' },
			{ name: 'Text', value: 'text' },
			{ name: 'URL', value: 'url' },
			{ name: 'WYSIWYG', value: 'wysiwyg' },
		],
		default: 'text',
		description: 'The type of the field input',
	},

	// ------ Element Group (for create) ------
	{
		displayName: 'Element Group Name or ID',
		name: 'elementGroupId',
		type: 'options',
		typeOptions: { loadOptionsMethod: 'getElementGroups' },
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['create'] } },
		default: '',
		description: 'The element group for the field. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ------ Additional fields for create ------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['field'], operation: ['create'] } },
		default: {},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description of the field',
			},
			{
				displayName: 'Tooltip',
				name: 'tooltip',
				type: 'string',
				default: '',
				description: 'Tooltip text for the field',
			},
		],
	},

	// ------ Field ID (for get, delete) ------
	{
		displayName: 'Field ID',
		name: 'customFieldId',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['get', 'delete'] } },
		default: 0,
		description: 'The ID of the custom field input',
	},

	// ------ Field ID for update (with loadOptions) ------
	{
		displayName: 'Field Name or ID',
		name: 'customFieldInputId',
		type: 'options',
		typeOptions: { loadOptionsMethod: 'getCustomFieldInputs' },
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['update'] } },
		default: '',
		description: 'The field to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ------ Element Group ID for update (required by Boost.space API) ------
	{
		displayName: 'Element Group Name or ID',
		name: 'elementGroupId',
		type: 'options',
		typeOptions: { loadOptionsMethod: 'getElementGroups' },
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['update'] } },
		default: '',
		description: 'The element group for the field (required). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ------ Update fields ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['field'], operation: ['update'] } },
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name of the field',
			},
			{
				displayName: 'Input Type',
				name: 'inputType',
				type: 'options',
				options: [
					{ name: 'Date', value: 'date' },
					{ name: 'DateTime', value: 'datetime' },
					{ name: 'Float', value: 'float' },
					{ name: 'Number', value: 'number' },
					{ name: 'Rating', value: 'rating' },
					{ name: 'Select', value: 'select' },
					{ name: 'Text', value: 'text' },
					{ name: 'URL', value: 'url' },
					{ name: 'WYSIWYG', value: 'wysiwyg' },
				],
				default: 'text',
				description: 'The type of the field input',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description of the field',
			},
			{
				displayName: 'Tooltip',
				name: 'tooltip',
				type: 'string',
				default: '',
				description: 'Tooltip text for the field',
			},
		],
	},

	// ------ Space ID for getMany ------
	{
		displayName: 'Space Name or ID',
		name: 'spaceId',
		type: 'options',
		typeOptions: { loadOptionsMethod: 'getSpaces' },
		required: true,
		displayOptions: { show: { resource: ['field'], operation: ['getMany'] } },
		default: '',
		description: 'The space to list fields for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
