import React, { Component } from 'react';
import { Button, Card, Col, DatePicker, Divider, Drawer, Form, Input, Row, Select, Space, Switch } from 'antd';
import _, { initial } from 'lodash';
import { useActions } from 'kea';
import { countryCode } from '../../Constants/countryCode';
import moment from 'moment';

class UserDrawer extends Component<any> {
	formRef: any = React.createRef();

	validateFields = () => {
		this.formRef.current.validateFields().then(() => {
			const details = this.formRef.current.getFieldsValue();
			if (_.isEmpty(this.props.initialValue)) this.props.addUser(details);
			else this.props.updateUser(details);
		});
	};

	getHeader = () => {
		const { initialValue } = this.props;
		const isAddUser = _.isEmpty(initialValue);
		return (
			<Space size={110} align='end' direction='horizontal' className='drawer-header-user'>
				<span style={{ width: '180px' }}>
					{isAddUser ? 'Add User' : `Edit User - ${initialValue.user_name}`}
				</span>
				<Button type='primary' onClick={this.validateFields}>
					Save
				</Button>
			</Space>
		);
	};

	getInitialValues = () => {
		const modifiedInitValues = _.cloneDeep(this.props.initialValue);
		_.setWith(modifiedInitValues, 'roles', _.map(modifiedInitValues.roles, 'role_name'), Object);
		// _.setWith(modifiedInitValues, 'prefix', '+971', Object);
		_.setWith(
			modifiedInitValues,
			'valid_from',
			modifiedInitValues.valid_from ? moment(modifiedInitValues.valid_from) : undefined,
			Object,
		);
		_.setWith(
			modifiedInitValues,
			'valid_to',
			modifiedInitValues.valid_to ? moment(modifiedInitValues.valid_to) : undefined,
			Object,
		);

		let nationalNumber = undefined;
		let countryCode = '971';

		const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
		if (modifiedInitValues.mobile_no) {
			const number = phoneUtil.parseAndKeepRawInput(modifiedInitValues.mobile_no);
			nationalNumber = number.getNationalNumber();
			countryCode = number.getCountryCode();
		}

		_.setWith(modifiedInitValues, 'mobile_no', nationalNumber, Object);
		_.setWith(modifiedInitValues, 'prefix', `+${countryCode}`, Object);

		return modifiedInitValues;
	};

	editSpecific = (
		<Card title='Account Status'>
			<Form.Item label='Locked' name='locked' key='locked' valuePropName='checked' className='label-width-90'>
				<Switch />
			</Form.Item>
			<Form.Item
				label='Verified'
				name='verified'
				key='verified'
				valuePropName='checked'
				className='label-width-90'
			>
				<Switch />
			</Form.Item>
			<Form.Item label='Active' name='active' key='active' valuePropName='checked' className='label-width-90'>
				<Switch />
			</Form.Item>
		</Card>
	);

	prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select style={{ width: '100px' }}>
				{_.map(countryCode, (each) => (
					<Select.Option value={each.code} key={each.code}>
						{each.code}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);

	// consvert = async () => {};

	render() {
		const { showUserDrawer, closeUserDrawer, options, initialValue } = this.props;
		const isAddUser = _.isEmpty(initialValue);
		// this.consvert();
		return (
			<Drawer visible={this.props.showUserDrawer} onClose={closeUserDrawer} width={500} title={this.getHeader()}>
				{showUserDrawer && (
					<Form ref={this.formRef} initialValues={this.getInitialValues()}>
						<Form.Item
							label='Username'
							name='user_name'
							key='user_name'
							rules={[
								{ type: 'email', message: 'Enter a valid email !' },
								{ required: true, message: 'Username is required !' },
							]}
						>
							<Input disabled={!isAddUser} />
						</Form.Item>
						<Form.Item
							label='Mobile'
							name='mobile_no'
							key='mobile_no'
							rules={[{ pattern: /^[0-9]*$/g, message: 'Enter valid mobile number!' }]}
						>
							<Input addonBefore={this.prefixSelector} />
						</Form.Item>
						<Form.Item
							label='Roles'
							name='roles'
							key='roles'
							rules={[{ required: true, message: 'Select atleat a role !' }]}
						>
							<Select mode='multiple'>
								{_.map(options.roles, (eachRole, index) => (
									<Select.Option key={eachRole.role_id} value={eachRole.role_name}>
										{eachRole.role_name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Row>
							<Col>
								<Form.Item label='Validity From' name='valid_from' key='valid_from'>
									<DatePicker />
								</Form.Item>
							</Col>
							<Col>
								<Form.Item label='Validity To' name='valid_to' key='valid_to'>
									<DatePicker />
								</Form.Item>
							</Col>
						</Row>
						{!isAddUser && this.editSpecific}
					</Form>
				)}
			</Drawer>
		);
	}
}

export default UserDrawer;
