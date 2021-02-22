import { EditFilled, SmallDashOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Form, Space, Table, Tag, Modal, Dropdown, Avatar, Menu } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import CustomLayout from '../CustomLayout';
import RolesDrawer from './RoleDrawer';

const Roles = (props: any) => {
	const [form] = Form.useForm();

	const { showDrawer, actions, selectedRole, rolesLoading, rolesPermissions, labels, timeOut } = props;
	const { updateRole, addRole, closeDrawer } = actions;
	const { canAddRoles, canDeleteRoles, canUpdateRoles } = rolesPermissions;

	const deleteConfirmation = (roleDetails: any) => {
		Modal.confirm({
			title: `Delete Confirmation - ${roleDetails.role_name}`,
			content: 'Are you sure want to delete this role?',
			onOk: () => {
				props.actions.deleteRole(roleDetails.role_id);
				return false;
			},
		});
	};
	const columns: any = [
		{
			title: '#',
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			align: 'center',
			width: 50,
			render: (value: any, record: any, index: number) => index + 1,
		},
		{
			title: 'NAME',
			dataIndex: 'role_name',
			key: 'role_name',
			width: 200,
			sorter: (a: any, b: any) => _.lowerCase(a.role_name) < _.lowerCase(b.role_name),
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'role_desc',
			key: 'role_desc',
			ellipsis: true,
			width: 200,
		},
		{
			title: _.toUpper(_.get(labels, 'User Type')),
			dataIndex: 'api_user',
			key: 'roleDescription',
			align: 'center',
			sorter: (a: any, b: any) => a.api_user < b.api_user,
			render: (isApiUser: boolean) => {
				return <Tag color={isApiUser ? 'green' : 'blue'}>{isApiUser ? 'API USER' : 'BUSINESS'}</Tag>;
			},
		},
		{
			title: 'CREATED BY',
			dataIndex: 'created_by',
			key: 'created_by',
			width: 200,
		},
		{
			title: 'CREATED TIMESTAMP',
			dataIndex: 'created_at',
			key: 'created_at',
			width: 120,
			sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: 'MODIFIED BY',
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 200,
		},
		{
			title: 'MODIFIED TIMESTAMP',
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 120,
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: 'ACTION',
			dataIndex: 'role_id',
			key: 'role_id',
			align: 'center',
			render: (action: any, data: object) => {
				const { actions } = props;
				const { openUpdateRole } = actions;
				const isSudo = _.get(data, 'permission_list.sudo');
				return (
					<Space className='action-buttons' size='small'>
						<Button
							// disabled={!canUpdateRoles || isSudo}
							shape={'circle'}
							onClick={() => openUpdateRole(data)}
							icon={<EditFilled style={{ color: 'green' }} />}
						></Button>
						<Dropdown
							overlay={
								<Menu>
									<Menu.Item>
										<span onClick={() => deleteConfirmation(data)}>Delete</span>
									</Menu.Item>
								</Menu>
							}
							placement='bottomCenter'
						>
							<SmallDashOutlined />
						</Dropdown>
					</Space>
				);
			},
		},
	];

	const addRoleButton = (
		<Space>
			{canAddRoles && (
				<Button type='primary' shape='round' icon={<UserAddOutlined />} onClick={actions.openAddRole}>
					Add Role
				</Button>
			)}
		</Space>
	);

	return (
		<CustomLayout loading={rolesLoading} timeOut={timeOut}>
			<Card extra={addRoleButton} title='Role Management'>
				<Table
					className='table-header-styling'
					dataSource={props.roles}
					columns={columns}
					pagination={false}
					size='middle'
					rowKey={(record) => record.role_id}
				></Table>
			</Card>
			<RolesDrawer
				onClose={closeDrawer}
				showDrawer={showDrawer}
				addRole={addRole}
				updateRole={updateRole}
				initialValue={selectedRole}
			/>
		</CustomLayout>
	);
};

export default Roles;
