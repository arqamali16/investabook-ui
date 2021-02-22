import React, { PureComponent } from 'react';
import { Button, Card, Modal, Table, Tabs } from 'antd';
import _ from 'lodash';
import CustomLayout from '../../Components/CustomLayout';
import moment from 'moment';
import Steps from './Steps';
import ProcessCreate from '../../Common/ProcessCreate';
import CredCategory from '../../Components/CredentialCategorySteps';

const { TabPane } = Tabs;

class CredentialManagement extends PureComponent<any> {
	state = { showProcessAdd: false };
	formRef: any = React.createRef();
	child: any = React.createRef();

	credentials: any = [
		{
			title: '#',
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			align: 'center',
			width: 50,
			render: (value: any, record: any, index: number) => index + 1,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Credential Template ID', 'Credential Template ID')),
			dataIndex: 'name',
			key: 'name',
			sorter: (a: any, b: any) => a.name.length - b.name.length,
			filters: _.map(this.props.credentialTypes, (each) => ({ text: each.name, value: each.name })),
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Description', 'Description')),
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Credential Category', 'Credential Category')),
			dataIndex: 'category',
			key: 'category',
			sorter: (a: any, b: any) => a.category.length - b.category.length,
			filters: _.uniqBy(
				_.map(this.props.credentialTypes, (each) => ({
					text: each.category,
					value: each.category,
				})),
				'value',
			),
			onFilter: (value: any, record: any) => record.category.indexOf(value) === 0,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Work Flow', 'Work Flow')),
			dataIndex: 'process',
			key: 'process',
			render: (pro: string) => _.get(pro, 'name'),
			sorter: (a: any, b: any) => a.process.name.length - b.process.name.length,
			filters: _.uniqBy(
				_.map(this.props.credentialTypes, (each) => ({
					text: each.process.name,
					value: each.process.name,
				})),
				'value',
			),
			onFilter: (value: any, record: any) => record.process.name.indexOf(value) === 0,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Created By', 'Created By')),
			dataIndex: 'created_by',
			key: 'created_by',
			width: 200,
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
			title: _.toUpper(_.get(this.props.labels, 'Modified By', 'Modified By')),
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 200,
		},
		{
			title: _.toUpper(_.get(this.props.labels, 'Modified Timestamp', 'Modified Timestamp')),
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 100,
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		// {
		// 	title: 'VIEW TEMPLATE',
		// 	dataIndex: '',
		// 	key: '',
		// 	width: 120,
		// },
	];

	handleAddCredential = () => {
		const details = this.formRef.current.getFieldsValue();
		this.props.actions.addCredentialType(details);
	};

	handleAddProcess = () => {
		this.child.current.formValues();
		this.setState({ showProcessAdd: false });
		this.props.actions.getProcessList();
	};

	handleProcessModal = () => {
		this.setState({ showProcessAdd: true });
	};

	render() {
		const { credentialTypes, processFlow, roles, actions, processLoading, credentialLoading, labels } = this.props;
		const { saveProcessFlow, addProcess } = actions;
		const { showProcessAdd } = this.state;
		return (
			<CustomLayout loading={credentialLoading || processLoading}>
				<Card title='Credential Management'>
					<Tabs>
						<TabPane tab={_.get(labels, 'Credential Template', 'Credential Template')} key='1'>
							<Table
								size='middle'
								className='table-header-styling'
								dataSource={credentialTypes}
								pagination={false}
								columns={this.credentials}
							></Table>
						</TabPane>
						<Tabs.TabPane
							tab={`Create New ${_.get(labels, 'Credential Template', 'Credential Template')}`}
							key='2'
						>
							<CredCategory />
						</Tabs.TabPane>
					</Tabs>
				</Card>
				<Modal
					visible={showProcessAdd}
					width={1200}
					title={`Create ${_.get(labels, 'Work Flow', 'Work Flow')}`}
					okText='Create'
					onOk={this.handleAddProcess}
					onCancel={() => this.setState({ showProcessAdd: false })}
				>
					<ProcessCreate
						// @ts-ignore
						ref={this.child}
						roles={roles}
						processFlow={processFlow}
						onChange={saveProcessFlow}
						addProcess={addProcess}
						labels={labels}
					/>
				</Modal>
			</CustomLayout>
		);
	}
}

export default CredentialManagement;
