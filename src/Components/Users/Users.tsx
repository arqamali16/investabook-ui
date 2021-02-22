import { DeleteFilled, EditFilled, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Form, Input, Select, Space, Table, Tag } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import CustomLayout from '../CustomLayout';
import UserDrawer from './UserDrawer';

const Users = (props: any) => {
	const [form] = Form.useForm();
	const { selectedUser, usersPermissions, actions, showDrawer, timeOut } = props;
	const { showEditDrawer, addUser, updateUser } = actions;
	const { canAddUsers, canDeleteUsers, canUpdateUsers } = usersPermissions;

	const columns: any = [
		{
			title: '#',
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			align: 'center',
			width: 50,
			fixed: 'left',
			render: (value: any, record: any, index: number) => index + 1,
		},
		{
			title: 'USERNAME',
			dataIndex: 'user_name',
			key: 'user_name',
			width: 180,
			fixed: 'left',
			sorter: (a: any, b: any) => _.lowerCase(a.user_name) < _.lowerCase(b.user_name),
		},
		{
			title: 'ROLES',
			dataIndex: 'roles',
			key: 'roles',
			width: 150,
			ellipsis: true,
			render: (roles: object[]) => {
				return _.join(_.map(roles, 'role_name'), ', ');
			},
		},
		{
			title: 'LOCKED',
			dataIndex: 'locked',
			key: 'locked',
			align: 'center',
			width: 150,
			render: (isApiUser: boolean, data: any) => {
				return <Tag color={isApiUser ? 'red' : 'green'}>{isApiUser ? 'Locked' : 'Unlocked'}</Tag>;
			},
		},
		{
			title: 'ACTIVE',
			dataIndex: 'active',
			key: 'active',
			align: 'center',
			width: 200,
			render: (isApiUser: boolean, data: any) => {
				return <Tag color={data.active ? 'green' : 'red'}>{data.active ? 'Active' : 'Suspended'}</Tag>;
			},
		},

		{
			title: 'VALIDITY',
			children: [
				{
					title: 'FROM',
					dataIndex: 'valid_from',
					key: 'valid_from',
					width: 120,
					render: (date: string, data: any) => {
						// const form = moment(data.valid_from).format('DD/MM/YYYY');
						const to = date ? moment(date).format('DD/MM/YYYY hh:mm A') : '-';
						return to;
					},
				},
				{
					title: 'TO',
					dataIndex: 'valid_to',
					key: 'valid_to',
					width: 120,
					render: (date: string, data: any) => {
						const from = date ? moment(date).format('DD/MM/YYYY hh:mm A') : '-';
						return from;
					},
				},
			],
		},

		{
			title: 'LAST LOGIN',
			dataIndex: 'login_history',
			key: 'login_history',
			width: 120,
			render: (logins: object[], data: any) => {
				const lastLogin = _.get(_.first(logins), 'logged_time');
				return moment(lastLogin).format('DD/MM/YYYY hh:mm A');
			},
		},
		{
			title: 'LOGIN RETRIES',
			dataIndex: 'login_retries',
			key: 'login_retries',
			align: 'center',
			width: 150,
			sorter: (a: any, b: any) => a.login_retries < b.login_retries,
			render: (logins: object[], data: any) => {
				return logins ? logins : 0;
			},
		},
		{
			title: 'CREATED BY',
			dataIndex: 'created_by',
			key: 'created_by',
			width: 120,
		},
		{
			title: 'CREATED TIMESTAMP',
			dataIndex: 'created_at',
			key: 'created_at',
			width: 100,
			sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: 'MODIFIED BY',
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 120,
		},
		{
			title: 'MODIFIED TIMESTAMP',
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 100,
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: '',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (action: any, data: object) => {
				return (
					<Space className='action-buttons' size='small'>
						<Button
							disabled={!canUpdateUsers}
							shape={'circle'}
							icon={<EditFilled style={{ color: 'green' }} />}
							onClick={() => showEditDrawer(data)}
						></Button>
					</Space>
				);
			},
		},
	];

	return (
		<CustomLayout loading={props.usersLoading} timeOut={timeOut}>
			<Card
				title='User Management'
				style={{ height: '100%' }}
				extra={
					canAddUsers && (
						<Space>
							<Button
								type='primary'
								shape='round'
								icon={<UserAddOutlined />}
								onClick={() => actions.showAddUser()}
							>
								Add User
							</Button>
						</Space>
					)
				}
			>
				<Table
					className='table-header-styling'
					dataSource={props.users}
					columns={columns}
					pagination={false}
					size='small'
					scroll={{ x: 600, y: 550 }}
				/>
				<UserDrawer
					initialValue={selectedUser}
					showUserDrawer={showDrawer}
					closeUserDrawer={actions.closeDrawer}
					options={{ roles: props.roles }}
					addUser={addUser}
					updateUser={updateUser}
				/>
			</Card>
		</CustomLayout>
	);
};

export default Users;
