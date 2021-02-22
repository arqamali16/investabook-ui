import React, { Component } from 'react';
import {
	Layout,
	Menu,
	Avatar,
	Dropdown,
	Spin,
	Space,
	Badge,
	Select,
	Typography,
	Divider,
	Row,
	Drawer,
	Statistic,
	Button,
	Card,
	Tooltip,
	Comment,
} from 'antd';
import { BellFilled, LoadingOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import ShahadaLogo from '../../assests/shahada-logo.svg';
import ShahadaUniversity from '../../assests/university.png';
import SessionTimeOut from './SessionTimeOut';

const { SubMenu } = Menu;

const { Header, Content, Sider, Footer } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class CustomLayout extends Component<any, any> {
	state = { collapseSider: false, profile: false, entity: false };

	logout = () => {
		localStorage.clear();
		this.props.history.push('/login');
		window.location.reload();
	};

	changeSelectedMenu = (label: string, path: string) => {
		this.props.actions.setMenu(label);
		this.props.history.push(path);
	};

	getmessages = () => {
		return !_.isEmpty(this.props.messages) ? (
			<Menu>
				{_.map(this.props.messages, (each) => (
					<Menu.Item>
						<Comment
							author={<a>{_.get(each, 'type', '')}</a>}
							avatar={
								<Avatar
									src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
									alt='Han Solo'
								/>
							}
							content={<p>{_.get(each, 'message', '')}</p>}
						></Comment>
					</Menu.Item>
				))}
			</Menu>
		) : (
			<Menu>
				<Menu.Item>No Messages</Menu.Item>
			</Menu>
		);
	};

	handleRoleChange = (event: any) => {
		this.props.actions.onRoleChange(event);
		this.changeSelectedMenu('Dashboard', '/dashboard');
	};

	// getContent = () => {
	// 	if (this.props.sessionTimeOut) return <SessionTimeOut />;
	// 	// else if (this.props.error) return <ErrorPage />;
	// 	else return this.props.children;
	// };

	render() {
		const { routes, config, selectedRole, layoutLoading, actions, userDetails, timeOut } = this.props;
		const footerText = _.find(config, ['field', 'ui.text.footer.copy']);
		const footerImage = _.find(config, ['field', 'ui.image.footer.brand']);
		const navColour = _.find(config, ['field', 'ui.color.nav']);
		const uiImageBrand = _.find(config, ['field', 'ui.image.brand']);

		const seperateTemplate = ['Recipients', 'Users', 'Roles', 'Credential Management', 'Work Flow Management'];

		const seperateRoutes = _.filter(routes, (each) => !_.includes(seperateTemplate, each.label));
		const groupedRoutes = _.filter(routes, (each) => _.includes(seperateTemplate, each.label));

		return (
			<Spin
				className='layout-spinner'
				spinning={(this.props.loading || layoutLoading) && !timeOut}
				indicator={antIcon}
			>
				<Layout style={{ width: '100%', height: '100%' }}>
					{!timeOut ? (
						<React.Fragment>
							<Header className='header-style'>
								<Space size='small'>
									<Avatar size='large' src={ShahadaUniversity}>
										<Button />
									</Avatar>
									<Typography.Text strong>{_.get(footerText, 'value', '')}</Typography.Text>
								</Space>
								<Space size='middle' style={{ float: 'right' }} split={<Divider type='vertical' />}>
									<Dropdown overlay={this.getmessages()} placement='bottomCenter'>
										<Badge count={1} size='small'>
											<Button shape={'circle'} icon={<BellFilled />}></Button>
										</Badge>
									</Dropdown>
									<Select
										value={_.get(selectedRole, 'role_name')}
										size='middle'
										className='header-selection'
										onChange={this.handleRoleChange}
									>
										{_.map(this.props.roles, (eachRole) => (
											<Select.Option key={eachRole.role_id} value={eachRole.role_id}>
												{eachRole.role_name}
											</Select.Option>
										))}
									</Select>

									<SettingOutlined
										style={{ fontSize: '16px' }}
										onClick={() => this.props.history.push('/settings')}
									/>

									<UserOutlined
										style={{ fontSize: '16px' }}
										onClick={() => this.setState({ profile: true })}
									/>
								</Space>
							</Header>
							<Card className='sub-heading' size='small'>
								{_.map(seperateRoutes, (eachRoute, index) => (
									<Button
										size='small'
										className='button-header'
										type='link'
										key={eachRoute.label}
										onClick={() => this.changeSelectedMenu(eachRoute.label, eachRoute.path)}
									>
										{_.upperFirst(eachRoute.label)}
									</Button>
								))}
								<Dropdown
									overlay={
										<Menu key='SubMenu'>
											{_.map(groupedRoutes, (each) => (
												<Menu.Item
													onClick={() => this.changeSelectedMenu(each.label, each.path)}
												>
													{each.label}
												</Menu.Item>
											))}
										</Menu>
									}
									placement='bottomLeft'
									arrow
								>
									<Button className='button-font' type='link' style={{ color: '#000' }}>
										Config
									</Button>
								</Dropdown>
							</Card>

							<Content
								className='site-layout-background'
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
								}}
							>
								{this.props.children}
							</Content>
							<Footer style={{ textAlign: 'center' }} className='login-footer'>
								<Space size='small' direction='horizontal' align='center'>
									<Typography.Text>{_.get(footerText, 'value', '')}</Typography.Text>
									<div style={{ width: '25px' }}>
										<img
											src={ShahadaUniversity}
											style={{ width: '100%', height: '100%', display: 'block' }}
										></img>
									</div>
									<Divider type='vertical' />
									<Typography.Text>Powered by Shahada</Typography.Text>
									<div style={{ width: '25px' }}>
										<img
											src={ShahadaLogo}
											style={{ width: '150%', height: '110%', display: 'block' }}
										></img>
									</div>
								</Space>
							</Footer>
						</React.Fragment>
					) : (
						<SessionTimeOut logout={this.logout} />
					)}
				</Layout>
				<Drawer
					visible={this.state.profile}
					onClose={() => this.setState({ profile: false })}
					closable={false}
					className='drawer-background'
				>
					<Row>
						<Space direction='vertical' style={{ width: '100%' }} align='center'>
							<Typography.Text style={{ fontSize: '18px' }}>
								{_.get(userDetails, 'user_name', '')}
							</Typography.Text>
							<Button shape='round' size='small' onClick={this.logout}>
								Logout
							</Button>
						</Space>
					</Row>
					<Divider></Divider>
					<Space direction='vertical' size='middle' style={{ width: '100%' }}>
						<Card size='small'>
							<Statistic
								title={
									<Space direction='horizontal'>
										<BellFilled style={{ fontSize: '25px' }} />
										<Typography.Text>Pending</Typography.Text>
									</Space>
								}
								value={2}
							/>
						</Card>
						<Card size='small'>
							<Statistic title='Batch Uploads Pending' value={3} />
						</Card>
						<Card size='small'>
							<Statistic title='Public Key' value={123} />
						</Card>
						<Card size='small'>
							<Statistic title='DID' value={123} />
						</Card>
					</Space>
				</Drawer>
			</Spin>
		);
	}
}

// @ts-ignore
CustomLayout.defaultProps = {
	loading: false,
	sessionTimeOut: false,
	error: false,
	timeOut: false,
};

export default withRouter(CustomLayout);
