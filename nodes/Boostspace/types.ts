import type { IDataObject } from 'n8n-workflow';

export interface ICustomFieldValue {
	customFieldInputName: string;
	value: string;
}

export interface IBoostspaceRecord extends IDataObject {
	id: number;
	spaceId?: number;
	statusId?: number;
	statusSystemId?: number;
	customFieldsValues?: ICustomFieldValue[];
}

export interface IBoostspaceSpace extends IDataObject {
	id: number;
	name: string;
	customModuleId?: number;
}

export interface IBoostspaceCustomModule extends IDataObject {
	id: number;
	name: string;
	color?: string;
	iconName?: string;
	iconPrefix?: string;
}

export interface IBoostspaceField extends IDataObject {
	id: number;
	name: string;
	inputType?: string;
	description?: string;
	tooltip?: string;
}

export interface IWebhookConfig {
	module: string;
	events: string[];
}
