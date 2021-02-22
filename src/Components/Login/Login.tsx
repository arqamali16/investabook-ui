import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Input, Form, Button, Card, Layout, Modal, Typography, Avatar, Space, Divider, Row, Col } from 'antd';
import ShahadaImage from '../../assests/shahada-logo.svg';
import _ from 'lodash';

class LoginCard extends Component<any, any> {
	onLogin = async (values: any) => {
		const { actions } = this.props;
		actions.login(values, this.props.history);
	};

	showForgotMessage = () => {
		Modal.warning({
			title: '',
			content: 'Please contact admin to reset the password',
		});
	};

	render() {
		const { loginLoading } = this.props;
		const entity_id = location.hash.slice(1, location.hash.length);
		return (
			<Layout style={{ width: '100%', height: '100%' }}>
				<Row style={{ width: '100%', height: '100%' }}>
					<Col span={16} className='layout'></Col>
					<Col span={8} style={{ backgroundColor: 'white' }}>
						<div style={{ marginTop: '40%' }}>
							<Space direction='vertical' size='middle' align='center' style={{ marginLeft: '35%' }}>
								<Avatar
									src={ShahadaImage}
									size='large'
									shape='square'
									style={{ width: '120px' }}
								></Avatar>
								<Typography.Title
									level={4}
									style={{ textAlign: 'center', fontFamily: 'sans-serif', fontWeight: 400 }}
								>
									Login to Shahahda
								</Typography.Title>
							</Space>
							<Form
								name='basic'
								onFinish={this.onLogin}
								initialValues={{ entity_id: entity_id ? entity_id : undefined }}
								style={{ margin: '10%' }}
							>
								<Form.Item
									// label='Entity ID'
									name='entity_id'
									rules={[{ required: true, message: 'Please input your entity id!' }]}
								>
									<Input
										disabled={!_.isEmpty(entity_id)}
										placeholder='Entity ID'
										style={{ height: '40px', borderRadius: '67px' }}
									/>
								</Form.Item>
								<Form.Item
									// label='Username'
									name='username'
									rules={[{ required: true, message: 'Please input your username!' }]}
								>
									<Input placeholder='Username' style={{ height: '40px', borderRadius: '67px' }} />
								</Form.Item>

								<Form.Item
									// label='Password'
									name='password'
									rules={[{ required: true, message: 'Please input your password!' }]}
								>
									<Input.Password
										placeholder='Password'
										style={{ height: '40px', borderRadius: '67px' }}
									/>
								</Form.Item>
								<Form.Item>
									<Button type='link' onClick={this.showForgotMessage}>
										Forgot Password ?
									</Button>
								</Form.Item>
								<Form.Item>
									<Button
										shape='round'
										type='primary'
										htmlType='submit'
										style={{ width: '100%' }}
										loading={loginLoading}
									>
										Login
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Col>
				</Row>
			</Layout>
		);
	}
}

export default withRouter(LoginCard);
