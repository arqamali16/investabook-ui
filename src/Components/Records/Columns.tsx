import React from 'react';
import _ from 'lodash';
import { Button, Space, Tag } from 'antd';
import moment from 'moment';
import { DownloadOutlined, FileTextOutlined, SyncOutlined } from '@ant-design/icons';

const tagMapping = {
	new_record: 'geekblue',
	processing: 'purple',
	published: 'green',
};

export const getGroupListColumns = (
	props: any,
	actions: any,
	passingFunction: any,
	showTemplate: any,
	setDefaultRecord: any,
) => {
	const { allRecords, labels } = props;
	const { downloadCertificate } = actions;

	return [
		{
			title: '#',
			dataIndex: _.get(labels, 'Group ID', ''),
			key: 'unique_group_id',
			align: 'center',
			width: 50,
			fixed: 'left',
			render: (value: any, record: any, index: number) => index + 1,
		},
		{
			title: _.toUpper(_.get(labels, 'Enrolled Id', '')),
			dataIndex: 'enrolled_id',
			key: 'enrolled_id',
			fixed: 'left',
			width: 150,
			sorter: (a: any, b: any) => a.enrolled_id < b.enrolled_id,
		},
		{
			title: _.toUpper(_.get(labels, 'Group ID', '')),
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			width: 200,
			fixed: 'left',
			sorter: (a: any, b: any) => a.unique_group_id < b.unique_group_id,
		},
		{
			title: _.toUpper(_.get(labels, 'Credential Template ID', '')),
			dataIndex: 'cred_name',
			key: 'cred_name',
			width: 200,
			sorter: (a: any, b: any) => a.cred_id < b.cred_id,
			render: (cred_name: string) => cred_name,
		},
		{
			title: _.toUpper(_.get(labels, 'Work Flow', '')),
			dataIndex: 'process_flow',
			key: 'process_flow',
			width: 200,
			sorter: (a: any, b: any) => a.process_name < b.process_name,
			render: (process_name: string) => process_name,
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 200,
			sorter: (a: any, b: any) => a.status < b.status,
			render: (status: string) => {
				const color = _.get(tagMapping, [status]);
				return status === 'translating' ? (
					<SyncOutlined spin style={{ color: '#36cfc9', fontSize: '20px' }} />
				) : (
					<Tag color={color}>{_.upperCase(status)}</Tag>
				);
			},
		},
		{
			title: 'LANGUAGE',
			dataIndex: 'created_at',
			width: 100,
			key: 'created_at',
			render: () => 'English',
		},
		{
			title: _.toUpper(_.get(labels, 'Created By', '')),
			dataIndex: 'created_by',
			key: 'created_by',
			width: 120,
		},
		{
			title: _.toUpper(_.get(labels, 'Created Timestamp', '')),
			dataIndex: 'created_at',
			key: 'created_at',
			width: 120,
			sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: _.toUpper(_.get(labels, 'Modified By', '')),
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 120,
		},
		{
			title: _.toUpper(_.get(labels, 'Modified Timestamp', '')),
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 120,
			sorter: (a: any, b: any) => moment(a.modified_at).isBefore(b.modified_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: 'VIEW CERTIFICATE',
			dataIndex: 'record_data',
			key: 'record_data',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (recordData: any, data: any) =>
				data.status === 'published' && (
					<Space className='action-buttons' size='small'>
						<Button
							shape={'circle'}
							onClick={() => {
								setDefaultRecord(data);
								showTemplate(true);
							}}
							icon={<FileTextOutlined style={{ color: '#1890FF' }} />}
						></Button>
					</Space>
				),
		},
		{
			title: 'DOWNLOAD CERTIFICATE',
			dataIndex: 'record_data',
			key: 'record_data',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (recordData: any, data: any) =>
				data.status === 'published' && (
					<Space className='action-buttons' size='small'>
						<Button
							shape={'circle'}
							onClick={() => downloadCertificate(data)}
							icon={<DownloadOutlined style={{ color: '#1890FF' }} />}
						></Button>
					</Space>
				),
		},
	];
};
