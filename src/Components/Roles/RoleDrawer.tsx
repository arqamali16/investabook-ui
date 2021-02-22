import React, { PureComponent } from 'react';
import { Button, Collapse, Divider, Drawer, Form, Input, Space, Switch } from 'antd';
import _ from 'lodash';
import { routes, accessLabelMappings } from '../../Constants/dashboardRoutes';

const { Panel } = Collapse;

class RolesDrawer extends PureComponent<any> {
	formRef: any = React.createRef();
	onSave = () => {
		const details = this.formRef.current.getFieldsValue();
		const { initialValue, showDrawer, onClose, addRole, updateRole } = this.props;
		if (_.isEmpty(initialValue)) addRole(details);
		else updateRole(details);
	};

	getHeader = () => {
		const { initialValue } = this.props;
		return (
			<Space size={170} align='end' direction='horizontal' style={{ width: '95%' }} className='drawer-header'>
				<span style={{ width: '180px' }}>
					{_.isEmpty(initialValue) ? 'Add Role' : `Edit Role - ${initialValue.role_name}`}
				</span>
				<Button onClick={this.onSave} type='primary'>
					Save
				</Button>
			</Space>
		);
	};

	render() {
		const { initialValue, showDrawer, onClose } = this.props;
		return (
			<Drawer title={this.getHeader()} width={500} visible={showDrawer} onClose={onClose}>
				{showDrawer && (
					<Form initialValues={initialValue} ref={this.formRef}>
						<Divider>Role Info</Divider>
						<Form.Item
							label='Name'
							name='role_name'
							key='role_name'
							rules={[{ required: true, message: 'Name is required!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Description'
							name='role_desc'
							key='role_desc'
							rules={[{ required: true, message: 'Description is required!' }]}
						>
							<Input.TextArea />
						</Form.Item>
						<Divider>Access Provisions</Divider>
						<Space direction='vertical' style={{ width: '100%' }} size='large'>
							{_.map(routes, (eachRoute) => (
								<Collapse className='permissions-card' accordion>
									<Panel header={eachRoute.label} key={eachRoute.label}>
										{_.map(_.keys(eachRoute.access), (eachAccess) => {
											return (
												<Form.Item
													label={_.get(accessLabelMappings, [eachAccess])}
													name={eachAccess}
													valuePropName='checked'
													key={eachAccess}
												>
													<Switch />
												</Form.Item>
											);
										})}
									</Panel>
								</Collapse>
							))}
						</Space>
						<Divider>User Type</Divider>
						<Form.Item
							label='Api User'
							name='api_user'
							valuePropName='checked'
							key='api_user'
							className='label-width-90'
						>
							<Switch />
						</Form.Item>
					</Form>
				)}
			</Drawer>
		);
	}
}

export default RolesDrawer;
