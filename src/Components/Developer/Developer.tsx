import React from 'react';
import ShahadaLogo from '../../assests/shahada-logo.svg';
import { Avatar, Button, Col, Dropdown, Layout, Row, Space, Typography, Menu, Card } from 'antd';
import ApiDoc from './Redoc';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const { Header, Content, Sider, Footer } = Layout;

const Developer = (props: any) => {
	return (
		<Layout style={{ width: '100%', height: '100%' }}>
			<Layout.Header className='header-style developer-header'>
				<Row gutter={[0, 0]} justify='center' align='middle' style={{ width: '15%' }}>
					<Col span={12} style={{ textAlign: 'center' }}>
						<Avatar size={60} src={ShahadaLogo}>
							<Button />
						</Avatar>
					</Col>
					<Col span={12}>
						<Typography.Text
							strong
							style={{ fontFamily: 'Helvetica Neue LT,Helvetica Neue', fontSize: '18px' }}
						>
							Developer
						</Typography.Text>
					</Col>
				</Row>
				<Layout>
					<Content></Content>
				</Layout>
			</Layout.Header>
		</Layout>
	);
};

export default Developer;
