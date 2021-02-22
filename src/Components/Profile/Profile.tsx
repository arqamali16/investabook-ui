import React, { Component } from 'react';
import { Menu, Avatar, Row, Col, Card, Statistic, Space, Steps, Tooltip, Collapse, Typography, Divider } from 'antd';
import CustomLayout from '../CustomLayout';
import { CheckCircleFilled, ClockCircleOutlined } from '@ant-design/icons';
import PublishedCard from './PublishedPerTerm';
import ChainRecords from './ChainGraph';
import UserChart from './UsersChart';
// @ts-ignore
import CytoscapeComponent from 'react-cytoscapejs';

const { Step } = Steps;

// @ts-ignore
import 'c3/c3.css';
import _ from 'lodash';
import moment from 'moment';

export default class Profile extends Component<any, any> {
	state = { collapseSider: false };

	menu = (
		<Menu>
			<Menu.Item>
				<a target='_blank'>Logged User</a>
			</Menu.Item>
			<Menu.Item>Logout</Menu.Item>
		</Menu>
	);

	elements = () => {
		const { dashboardData } = this.props;
		const { network_diagram } = dashboardData;

		const position = [
			{ x: 50, y: 40 },
			{ x: 300, y: 40 },
			{ x: 175, y: 200 },
		];

		const data: any = _.map(_.get(network_diagram, 'vertices', []), (eachVertice, index: number) => {
			return {
				data: { id: eachVertice, label: _.upperFirst(eachVertice) },
				position: position[index],
			};
		});

		const edges: any = _.map(_.get(network_diagram, 'edges', []), (eachVertice, index: number) => {
			return {
				data: { source: eachVertice.source, target: eachVertice.target },
			};
		});

		return _.concat(data, edges);
	};

	render() {
		const { dashboardData, dashboardLoading, labels, timeOut } = this.props;
		const { group_audit_status, enrollment_per_date, published_per_date } = dashboardData;

		return (
			<CustomLayout timeOut={timeOut}>
				<Row gutter={[12, 6]} className='card-border'>
					<Col span={6}>
						<Space align='center' size='middle' direction='vertical' className='network-height'>
							<Card size='small' loading={dashboardLoading}>
								<Statistic
									title={_.get(labels, 'Balance')}
									value={_.get(dashboardData, 'token.balance')}
									suffix='CR'
								/>
							</Card>
							<Card
								title={_.get(labels, 'Network')}
								size='small'
								style={{ height: '96%' }}
								loading={dashboardLoading}
							>
								<CytoscapeComponent
									elements={this.elements()}
									pan={{ x: 0, y: 0 }}
									zoom={0.9}
									style={{ height: '210px' }}
								/>
							</Card>
						</Space>
					</Col>

					<Col span={12}>
						<Card
							title={_.get(labels, 'Task List')}
							size='small'
							style={{ height: '370px', overflow: 'scroll' }}
							loading={dashboardLoading}
						>
							<Space direction='vertical' size='middle' style={{ width: '100%' }}>
								{_.map(group_audit_status, (eachGroup) => (
									<React.Fragment>
										<Divider plain orientation='left'>
											{eachGroup.group_id}
										</Divider>
										<Steps current={11} size='small'>
											{_.map(eachGroup.process, (eachProcess) => {
												const des = eachProcess.done
													? `${eachProcess.username} ${moment(eachProcess.date).format(
															'DD/MM/YYYY',
													  )}`
													: 'Pending...';
												return (
													<Step
														title={eachProcess.action}
														description={des}
														icon={
															eachProcess.done ? (
																<CheckCircleFilled style={{ color: '#7cb305' }} />
															) : (
																<ClockCircleOutlined style={{ color: '#ffa940' }} />
															)
														}
													></Step>
												);
											})}
										</Steps>
									</React.Fragment>
								))}
							</Space>
						</Card>
					</Col>

					<Col span={6}>
						<UserChart
							data={enrollment_per_date}
							loading={dashboardLoading}
							title={_.get(labels, 'Recipient Graph')}
						/>
					</Col>
				</Row>

				<Row gutter={[8, 8]} className='card-border'>
					<Col span={12}>
						<PublishedCard
							data={published_per_date}
							loading={dashboardLoading}
							title={_.get(labels, 'Records Graph')}
						/>
					</Col>
					<Col span={12}>
						<ChainRecords loading={dashboardLoading} title={_.get(labels, 'Top Groups')} />
					</Col>
				</Row>
			</CustomLayout>
		);
	}
}
