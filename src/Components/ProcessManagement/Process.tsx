import { Row, Form, Input, Col, Space, Select, Button, Card, Tabs, Table, Timeline, Drawer, Avatar } from 'antd';
import React, { PureComponent, useState } from 'react';
import {
	ClockCircleOutlined,
	DownCircleOutlined,
	EditFilled,
	EyeFilled,
	MinusCircleOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import CustomLayout from '../CustomLayout';
import _ from 'lodash';
import { useActions } from 'kea';
import moment from 'moment';
import ProcessCreate from '../../Common/ProcessCreate';

const { TabPane } = Tabs;

class ProcessManagement extends PureComponent<any, any> {
	constructor(props: any, child: any) {
		super(props);
		this.state = { showButton: false };
		//@ts-ignore
		this.child = React.createRef();
	}

	processList: any = [
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
			dataIndex: 'name',
			key: 'name',
			width: 200,
			sorter: (a: any, b: any) => _.lowerCase(a.name) < _.lowerCase(b.name),
			filters: _.map(this.props.processList, (each) => ({ text: each.name, value: each.name })),
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			key: 'description',
			width: 200,
			ellipsis: true,
		},

		{
			title: _.toUpper(_.get(this.props.labels, 'Audit Process', 'Audit Process')),
			dataIndex: 'process',
			key: 'process',
			align: 'center',
			width: 150,
			sorter: (a: any, b: any) => _.size(a.process) - _.size(b.process),
			render: (publisher: any) => _.size(publisher) + 2,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Created By', 'Created By')),
			dataIndex: 'created_by',
			key: 'created_by',
			width: 120,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Created Timestamp', 'Created Timestamp')),
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
			title: 'VIEW PROCESS',
			dataIndex: 'created_by',
			key: 'created_by',
			align: 'center',
			width: 100,
			render: (process: any, data: object) => (
				<Space className='action-buttons' size='small'>
					<Button
						shape={'circle'}
						icon={<EyeFilled style={{ color: '#1890FF' }} />}
						onClick={() => this.props.actions.showProcess(data)}
					></Button>
				</Space>
			),
		},
	];

	handleAddProcess = () => {
		// @ts-ignore
		this.child.current.formValues();
	};

	handleButton = (activeTab: string) => {
		if (activeTab === '2') this.setState({ showButton: true });
		else this.setState({ showButton: false });
	};

	render() {
		const { processLoading, actions, showProcess, selectedProcess, roles, processFlow } = this.props;
		const { saveProcessFlow, addProcess } = actions;
		return (
			<CustomLayout loading={processLoading}>
				<Card title='Work Flow Management'>
					<Tabs
						defaultActiveKey='1'
						onChange={this.handleButton}
						tabBarExtraContent={
							this.state.showButton && (
								<Button
									type='primary'
									htmlType='submit'
									onClick={this.handleAddProcess}
									style={{ float: 'right' }}
								>
									Create
								</Button>
							)
						}
					>
						<TabPane tab='Work Flow' key='1'>
							<Table
								className='table-header-styling'
								size='middle'
								pagination={false}
								dataSource={this.props.processList}
								columns={this.processList}
							></Table>
						</TabPane>
						<TabPane tab='Create New Work Flow' key='2'>
							<ProcessCreate
								// @ts-ignore
								ref={this.child}
								roles={roles}
								processFlow={processFlow}
								onChange={saveProcessFlow}
								addProcess={addProcess}
								labels={this.processList.labels}
							/>
						</TabPane>
					</Tabs>
				</Card>
				<Drawer
					onClose={actions.closeProcess}
					visible={showProcess}
					title={`Process view - ${selectedProcess.name}`}
					width={500}
				>
					<Timeline mode='alternate' style={{ marginTop: '50px', marginLeft: '-250px' }}>
						<Timeline.Item dot={<Avatar style={{ backgroundColor: '#1890ff' }}>1</Avatar>} position='left'>
							<p>
								<text>
									Credential preparation by<br></br>
									<strong>{_.get(selectedProcess, 'creator.role_name', '')}</strong>
								</text>
							</p>
						</Timeline.Item>
						{_.map(selectedProcess.process, (each, index) => (
							<Timeline.Item
								dot={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 2}</Avatar>}
								position='left'
							>
								<p>
									<text>
										Credential process (<strong>{each.action}</strong>) by <br></br>
										<strong>{_.get(each, 'auditor.role_name')}</strong>
									</text>
								</p>
							</Timeline.Item>
						))}
						<Timeline.Item
							dot={
								<Avatar style={{ backgroundColor: '#1890ff' }}>
									{_.size(selectedProcess.process) + 2}
								</Avatar>
							}
							position='left'
						>
							<p>
								Publishing credential by{' '}
								<strong>{_.get(selectedProcess, 'publisher.role_name', '')}</strong>
							</p>
						</Timeline.Item>
					</Timeline>
				</Drawer>
			</CustomLayout>
		);
	}
}

export default ProcessManagement;
