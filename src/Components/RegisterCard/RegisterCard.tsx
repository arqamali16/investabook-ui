import React, { Component } from 'react';

import { Input, Form, Checkbox, Button, PageHeader, Row, Col, Card, Layout, Menu, Space } from 'antd';

const { Header, Content, Footer } = Layout;

export default class RegisterCard extends Component<any, any> {
	render() {
		return (
			<Card style={{ borderRadius: '8px' }}>
				<Form name='basic' initialValues={{ remember: true }}>
					<Form.Item
						label='User Name'
						name='userName'
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
							Register
						</Button>
					</Form.Item>
				</Form>
				<div>
					Already have an account ?
					<Button type='link' onClick={this.props.onLogin}>
						Login
					</Button>
				</div>
			</Card>
		);
	}
}
