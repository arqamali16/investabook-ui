import React, { PureComponent } from 'react';
import CustomLayout from '../../Components/CustomLayout';
import { Button, Card, Drawer, Space, Table, Tag } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import ProcessFlow from '../../Common/ProcessFlow';
import { CheckCircleFilled, CheckOutlined, EyeFilled } from '@ant-design/icons';

class ProcessingRecords extends PureComponent<any> {
	processingRecordsColumns: any = [
		{
			title: 'ID',
			dataIndex: 'version_id',
			key: 'version_id',
			width: 80,
			align: 'center',
		},
		{
			title: 'Unique Group ID',
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			sorter: (a: any, b: any) => a.unique_group_id < b.unique_group_id,
			filters: _.uniqBy(
				_.map(this.props.processingRecords, (each) => ({
					text: each.unique_group_id,
					value: each.unique_group_id,
				})),
				'value',
			),
			onFilter: (value: any, record: any) => record.unique_group_id.indexOf(value) === 0,
		},
		{
			title: 'Process',
			dataIndex: 'process',
			key: 'process',
			align: 'center',
			render: (recordData: any, data: any) => (
				<Space className='action-buttons' size='small'>
					<Button
						shape={'circle'}
						onClick={() => this.props.actions.showProcessFlow(data)}
						icon={<EyeFilled style={{ color: '#1890FF' }} />}
					></Button>
				</Space>
			),
		},
		{
			title: 'Total Process',
			dataIndex: 'total_process',
			key: 'total_process',
			align: 'center',
		},
		{
			title: 'Process Completed',
			dataIndex: 'total_audit',
			key: 'total_audit',
			align: 'center',
		},
		{
			title: 'Action',
			dataIndex: 'next_process',
			key: 'next_process',
			align: 'center',
			render: (next: any, data: any) => {
				const isCurrentRoleAuditor = _.get(this.props, 'selectedRole.role_id') === _.get(next, 'auditor_role');
				const isAuditable = data.total_process > data.total_audit;
				// const show = isCurrentRoleEligible && isAuditable;

				const isCurrentRolePublisher =
					_.get(this.props, 'selectedRole.role_id') === _.get(data, 'publisher_role');

				const isPublishable = data.total_process === data.total_audit;

				const publishReady = isCurrentRolePublisher && isPublishable;

				const auditReady = isCurrentRoleAuditor && isAuditable;

				const show = publishReady || auditReady;

				if (publishReady) {
					return (
						<Button type='primary' shape='round'>
							Publish
						</Button>
					);
				}

				if (auditReady) {
					return (
						<Button type='primary' shape='round'>
							{_.get(data, 'next_process.action', '')}
						</Button>
					);
				}
			},
		},
	];

	render() {
		const { processingRecordsLoading, processingRecords, flowVisible, processFlow, actions } = this.props;
		const { closeProcessFlow } = actions;
		return (
			<CustomLayout loading={processingRecordsLoading}>
				<Card title='Process Queue'>
					<Table dataSource={processingRecords} columns={this.processingRecordsColumns} size='small' />
				</Card>
				<ProcessFlow showProcess={flowVisible} processFlow={processFlow} onClose={closeProcessFlow} />
			</CustomLayout>
		);
	}
}

export default ProcessingRecords;
