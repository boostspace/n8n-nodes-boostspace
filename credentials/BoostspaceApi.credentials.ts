import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BoostspaceApi implements ICredentialType {
	name = 'boostspaceApi';
	displayName = 'Boost.space API';
	documentationUrl = 'https://docs.boost.space/knowledge-base/system/connections/token-creation/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your Boost.space API token. See <a href="https://docs.boost.space/knowledge-base/system/connections/token-creation/">documentation</a> for details.',
		},
		{
			displayName: 'System Key',
			name: 'syskey',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'your-system-key',
			description:
				'The subdomain of your Boost.space instance (e.g. "mycompany" from mycompany.boost.space). See <a href="https://docs.boost.space/knowledge-base/system/getting-started-with-boost-space/system-name-system-key/">documentation</a>.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials.syskey}}.boost.space',
			url: '/api/user/logged',
			method: 'GET',
		},
	};
}
