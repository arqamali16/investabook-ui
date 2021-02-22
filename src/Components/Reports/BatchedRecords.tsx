import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';

import RecordLogic from '../../Logics/recordLogic';
import ReportLogic from '../../Logics/reportsLogic';
import { useActions, useValues } from 'kea';
import moment from 'moment';
import _ from 'lodash';
import { BarChartOutlined } from '@ant-design/icons';

const BatchedRecords = (props: any) => {
	const { recordBatches } = useValues(RecordLogic);

	const { getGroupRecordData } = useActions(ReportLogic);
	const { groupRecordData } = useValues(ReportLogic);

	const batchedRecordsColumns: any = [
		{
			title: 'UNIQUE GROUP ID',
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			sorter: (a: any, b: any) => a.unique_group_id.length < b.unique_group_id.length,
			filters: _.uniqBy(
				_.map(recordBatches, (each) => ({ text: each.unique_group_id, value: each.unique_group_id })),
				'value',
			),
			onFilter: (value: any, record: any) => record.unique_group_id.indexOf(value) === 0,
		},
		{
			title: 'CREDENTIAL TEMPLATE ID',
			dataIndex: 'cred_category',
			key: 'cred_category',
			sorter: (a: any, b: any) => a.cred_category < b.cred_category,
		},
		{
			title: 'WORK FLOW',
			dataIndex: 'business_process',
			key: 'business_process',
			sorter: (a: any, b: any) => a.business_process < b.business_process,
			filters: _.uniqBy(
				_.map(recordBatches, (each) => ({ text: each.business_process, value: each.business_process })),
				'value',
			),
			onFilter: (value: any, record: any) => record.business_process.indexOf(value) === 0,
		},

		{
			title: 'CREATED BY',
			dataIndex: '',
			key: '',
			width: 120,
		},
		{
			title: 'CREATED TIMESTAMP',
			dataIndex: 'created_at',
			key: 'created_at',
			width: 120,
			sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: 'MODIFIED BY',
			dataIndex: '',
			key: '',
			width: 120,
		},
		{
			title: 'MODIFIED TIMESTAMP',
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 120,
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: 'GENERATE REPORTS',
			dataIndex: 'created_a11',
			key: 'created_a11',
			align: 'center',
			render: (value: string, record: any) => {
				return record.cred_category === 'TEST MARKS TEMPLATE' ? (
					<BarChartOutlined onClick={() => getGroupRecordData(record)} style={{ fontSize: '25px' }} />
				) : null;
			},
		},
	];

	return (
		<Table
			size='middle'
			className='table-header-styling'
			dataSource={recordBatches}
			columns={batchedRecordsColumns}
			pagination={false}
			rowKey={(record) => record.unique_group_id}
		/>
	);
};

export default BatchedRecords;
