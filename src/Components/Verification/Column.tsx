import _ from 'lodash';
import moment from 'moment';

export const verifiedRecords: any = [
	{
		title: '#',
		dataIndex: 'unique_group_id',
		key: 'unique_group_id',
		align: 'center',
		width: 50,
		render: (value: any, record: any, index: number) => index + 1,
	},
	{
		title: 'ENROLLED ID',
		dataIndex: 'role_name',
		key: 'role_name',
		width: 200,
		sorter: (a: any, b: any) => _.lowerCase(a.role_name) < _.lowerCase(b.role_name),
	},
	{
		title: 'NAME',
		dataIndex: 'role_desc',
		key: 'role_desc',
		ellipsis: true,
		width: 200,
	},
	{
		title: 'ORGANISATION',
		dataIndex: 'api_user',
		key: 'roleDescription',
		align: 'center',
		sorter: (a: any, b: any) => a.api_user < b.api_user,
		// render: (isApiUser: boolean) => {
		// 	return <Tag color={isApiUser ? 'green' : 'blue'}>{isApiUser ? 'API USER' : 'BUSINESS'}</Tag>;
		// },
	},

	{
		title: 'ACTIVITY TIME',
		dataIndex: 'created_at',
		key: 'created_at',
		sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
	},

	{
		title: 'STATUS',
		dataIndex: 'modified_at',
		key: 'roleDescription',
		sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
		// render: (date: string) => moment(date).format('DD/MM/YYYY h:mm'),
	},
];

export const registeredVerifiers: any = [
	{
		title: '#',
		dataIndex: 'unique_group_id',
		key: 'unique_group_id',
		align: 'center',
		width: 50,
		render: (value: any, record: any, index: number) => index + 1,
	},
	{
		title: 'ORGANISATION',
		dataIndex: 'role_name',
		key: 'role_name',
		width: 200,
		sorter: (a: any, b: any) => _.lowerCase(a.role_name) < _.lowerCase(b.role_name),
	},
	{
		title: 'USERNAME',
		dataIndex: 'role_desc',
		key: 'role_desc',
		ellipsis: true,
		width: 200,
	},
	{
		title: 'COUNTRY',
		dataIndex: 'api_user',
		key: 'roleDescription',
		align: 'center',
		sorter: (a: any, b: any) => a.api_user < b.api_user,
		// render: (isApiUser: boolean) => {
		// 	return <Tag color={isApiUser ? 'green' : 'blue'}>{isApiUser ? 'API USER' : 'BUSINESS'}</Tag>;
		// },
	},

	{
		title: 'WEBSITE',
		dataIndex: 'created_at',
		key: 'created_at',
		sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
		// render: (date: string) => moment(date).format('DD/MM/YYYY h:mm'),
	},

	{
		title: 'EMAIL',
		dataIndex: 'modified_at',
		key: 'roleDescription',
		sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
	},
	{
		title: 'EMAIL VERIFIED',
		dataIndex: 'modified_at',
		key: 'roleDescription',
		sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
	},
];
