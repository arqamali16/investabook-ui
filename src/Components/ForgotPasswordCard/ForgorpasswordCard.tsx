import React, { Component } from 'react';

import { Input, Form, Checkbox, Button, PageHeader, Row, Col, Card, Layout, Menu, Space } from 'antd';

const { Header, Content, Footer } = Layout;

class ForgotPasswordCard extends Component {
	render() {
		return (
			<Card style={{ borderRadius: '8px' }}>
				<Form name='basic' initialValues={{ remember: true }}>
					<Form.Item
						label='Email'
						name='email'
						rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
							Reset Password
						</Button>
					</Form.Item>
				</Form>
			</Card>
		);
	}
}

export default ForgotPasswordCard;
