import type { INodeProperties } from 'n8n-workflow';

export const spaceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['space'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a space', description: 'Creates a new space' },
			{ name: 'Delete', value: 'delete', action: 'Delete a space', description: 'Deletes a space' },
			{ name: 'Get', value: 'get', action: 'Get a space', description: 'Returns a single space' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many spaces', description: 'Returns a list of spaces' },
			{ name: 'Update', value: 'update', action: 'Update a space', description: 'Updates an existing space' },
		],
		default: 'getMany',
	},
];

export const spaceFields: INodeProperties[] = [
	// ------ Custom Module ID (for create) ------
	{
		displayName: 'Custom Module Name or ID',
		name: 'customModuleId',
		type: 'options',
		typeOptions: { loadOptionsMethod: 'getCustomModules' },
		required: true,
		displayOptions: { show: { resource: ['space'], operation: ['create'] } },
		default: '',
		description: 'The module to create the space in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ------ Name (for create, update) ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['space'], operation: ['create'] } },
		default: '',
		description: 'The name of the space',
	},

	// ------ Space ID (for get, update, delete) ------
	{
		displayName: 'Space ID',
		name: 'spaceId',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['space'], operation: ['get', 'update', 'delete'] } },
		default: 0,
		description: 'The ID of the space',
	},

	// ------ Update fields ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { resource: ['space'], operation: ['update'] } },
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name of the space',
			},
		],
	},
];
