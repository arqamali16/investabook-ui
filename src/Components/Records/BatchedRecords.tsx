import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Statistic, Card, Row, Col, Form, Modal, Input, Progress, Typography } from 'antd';

import CurrentProcess from './CurrentProcess';
import RecordLogic from '../../Logics/recordLogic';
import ProcessLogic from '../../Logics/processManagement';
import CredentialManage from '../../Logics/credentialManagementLogic';
import { useActions, useValues } from 'kea';
import moment from 'moment';
import XLSX from 'xlsx';
import _ from 'lodash';
import Highlighter from 'react-highlight-words';
import {
	BarChartOutlined,
	CheckOutlined,
	DownloadOutlined,
	DownOutlined,
	FileDoneOutlined,
	FileExcelTwoTone,
	FileProtectOutlined,
	FileSearchOutlined,
	FileTextFilled,
	FileTextOutlined,
	LoadingOutlined,
	RightOutlined,
	SearchOutlined,
} from '@ant-design/icons';

import Template from './TemplatePreview';
import Report from '../../Components/Reports/Analytics';
import VerifyLogic from '../../Logics/verification';
import Verify from './VerificationModal';

const tagMapping = {
	new_record: 'geekblue',
	processing: 'purple',
	translating: 'purple',
	published: 'green',
};

const BatchedRecords = (props: any) => {
	const {
		showBatchRecords,
		initiateProcess,
		auditProcess,
		publish,
		downloadCertificate,
		showMainTable,
		getRecordBatches,
	} = useActions(RecordLogic);
	const { recordBatches, selectedBatch, recordsForBatch, processingRecords } = useValues(RecordLogic);
	const { processList } = useValues(ProcessLogic);
	const { credentialTypes } = useValues(CredentialManage);

	const { verificationDetails, verifyLoading } = useValues(VerifyLogic);
	const { verifyRecord } = useActions(VerifyLogic);

	const [modalVisible, showModal] = useState(false);

	const [remark, setRemark] = useState('');
	const [showAudit, setAudit] = useState(false);
	const [currentProcess, showCurrentProcess] = useState(false);
	const [reportVisible, showReport] = useState(false);
	const [templateVisible, showTemplate] = useState(false);
	const [defaultRecord, setDefaultRecord] = useState(_.first(recordsForBatch));
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');

	const constructCurrentProcess = () => {
		const credTemplate = _.find(credentialTypes, ['cred_id', selectedBatch.cred_id]);
		const processId = _.get(credTemplate, 'process.process_id');
		const processFollowed = _.find(processList, ['process_id', processId]);

		const isInitiated = !_.isEmpty(processingRecords);
		const isPublished = _.get(processingRecords, 'audit.published');

		const publishePath = isPublished ? 'audit.published' : 'published';

		const publishPObj = {
			by: _.get(processingRecords, 'published.username', ''),
			title: _.get(processingRecords, 'published.remark', 'Record Published'),
			date: _.get(processingRecords, 'published.date', ''),
			done: processingRecords.published ? true : false,
		};

		const audits = _.map(processingRecords.process, (each) => {
			const isAuditComplete = _.get(processingRecords.audit_completed, [_.toNumber(each.order) - 1]);
			return {
				by: _.get(isAuditComplete, 'username', ''),
				title: each.action,
				remark: _.get(isAuditComplete, 'remark', 'Audited'),
				date: _.get(isAuditComplete, 'date', ''),
				done: isAuditComplete ? true : false,
			};
		});
		const initiatedObj = {
			by: _.get(processingRecords, 'created.username', ''),
			title: _.get(processingRecords, 'created.remark', 'Record Uploaded'),
			date: _.get(processingRecords, 'created.date', ''),
			done: processingRecords.created ? true : false,
		};
		return {
			data: [initiatedObj, ...audits, publishPObj],
			initiated: isInitiated,
			processFollowed,
			groupId: _.get(selectedBatch, 'unique_group_id'),
			createdDate: moment(_.get(selectedBatch, 'created_at')).format('DD-MM-YYYY'),
		};
	};

	const batchedRecordsColumns: any = [
		{
			title: 'UNIQUE GROUP ID',
			dataIndex: 'unique_group_id',
			key: 'unique_group_id',
			width: 200,
			sorter: (a: any, b: any) => a.unique_group_id < b.unique_group_id,
			filters: _.uniqBy(
				_.map(recordBatches, (each) => ({ text: each.unique_group_id, value: each.unique_group_id })),
				'value',
			),
			onFilter: (value: any, record: any) => record.unique_group_id.indexOf(value) === 0,
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			key: 'description',
			width: 200,
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
			dataIndex: 'created_by',
			key: 'created_by',
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
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 120,
		},
		{
			title: 'MODIFIED TIMESTAMP',
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 120,
			sorter: (a: any, b: any) => moment(a.modified_at).isBefore(b.modified_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
	];

	let searchInput: any;

	const getColumnSearchProps = (dataIndex: any) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput = node;
					}}
					placeholder={`Search Name`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
						Reset
					</Button>
				</Space>
			</div>
		),
		onFilterDropdownVisibleChange: (visible: any) => {
			if (visible) {
				setTimeout(() => searchInput.select(), 100);
			}
		},
		filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value: any, record: any) => {
			return _.get(record, [dataIndex])
				? _.get(record, [dataIndex]).toString().toLowerCase().includes(value.toLowerCase())
				: '';
		},
		render: (text: any) => {
			return searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			);
		},
	});

	console.log(searchedColumn);

	const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: any) => {
		clearFilters();
		setSearchText('');
	};

	const recordsForBatchColumns: any = [
		{
			title: 'ENROLL ID',
			dataIndex: 'enrolled_id',
			key: 'enrolled_id',
			align: 'center',
			width: 200,
			fixed: 'left',
			sorter: (a: any, b: any) => a.enrolled_id < b.enrolled_id,
		},
		{
			title: 'NAME',
			dataIndex: 'formattedName',
			key: 'formattedName',
			width: 150,
			fixed: 'left',
			...getColumnSearchProps('formattedName'),
			// sorter: (a: any, b: any) => a.record_data.name.value < b.record_data.name.value,
			// render: (record_data: any) => _.upperFirst(_.get(record_data, 'name.value')),
		},
		// {
		// 	title: 'CERTIFICATE TITLE',
		// 	dataIndex: '',
		// 	key: '',
		// 	width: 250,
		// 	align: 'center',
		// },
		// {
		// 	title: 'ISSUE DATE',
		// 	dataIndex: '',
		// 	key: '',
		// 	width: 120,
		// },
		// {
		// 	title: 'EXPIRY DATE',
		// 	dataIndex: '',
		// 	key: '',
		// 	width: 120,
		// },
		{
			title: 'VERSION',
			dataIndex: 'version_id',
			key: 'version_id',
			width: 100,
			align: 'center',
			sorter: (a: any, b: any) => a.version_id < b.version_id,
			render: () => 1,
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
				return <Tag color={color}>{_.upperCase(status)}</Tag>;
			},
			filters: _.uniqBy(
				_.map(recordsForBatch, (each) => ({ text: each.status, value: each.status })),
				'value',
			),
		},
		{
			title: 'CREATED BY',
			dataIndex: 'created_by',
			key: 'created_by',
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
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 120,
		},
		{
			title: 'MODIFIED TIMESTAMP',
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
			title: 'VERIFY CERTIFICATE',
			align: 'center',
			width: 100,
			render: (recordData: any, data: any) =>
				data.status === 'published' && (
					<Space className='action-buttons' size='small'>
						<Button
							shape={'circle'}
							onClick={() => {
								verifyRecord(_.get(data, 'cert_id'));
								showModal(true);
							}}
							icon={<CheckOutlined style={{ color: '#1890FF' }} />}
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

	const handleAudit = () => {
		setAudit(true);
	};

	const handlePublish = (record: any) => {
		publish();
	};

	const getActionButtons = (record: any) => {
		const processInitiate = props.selectedRole.role_id === record.process_creator;
		const initiateReady = processInitiate && !_.isEmpty(recordsForBatch);

		const hasNewRecord = _.find(recordsForBatch, ['status', 'new_record']);
		const isTranslating = _.find(recordsForBatch, ['status', 'translating']);
		const isPublished = _.find(recordsForBatch, ['status', 'published']);
		const isCurrentRoleAuditor =
			_.get(props, 'selectedRole.role_id') === _.get(processingRecords, 'next_process.auditor_role');
		const isAuditable = processingRecords.total_process > processingRecords.total_audit;

		const isCurrentRolePublisher =
			_.get(props, 'selectedRole.role_id') === _.get(processingRecords, 'publisher_role');
		const isPublishable = processingRecords.total_process === processingRecords.total_audit;

		const publishReady = isCurrentRolePublisher && isPublishable;

		const auditReady = isCurrentRoleAuditor && isAuditable;

		const initWithRecords = initiateReady && hasNewRecord;

		const processInitiateButton = (
			<Button
				shape={'round'}
				type={'primary'}
				disabled={!initWithRecords}
				onClick={() => initiateProcess(record)}
			>
				Initiate Process
			</Button>
		);

		const auditButton = (
			<Button shape={'round'} type={'primary'} disabled={!auditReady} onClick={handleAudit}>
				Audit
			</Button>
		);

		const publishButton = (
			<Button shape={'round'} type={'primary'} disabled={!publishReady} onClick={() => handlePublish(record)}>
				Publish
			</Button>
		);

		return (
			<Space>
				{initWithRecords && processInitiateButton}
				{auditReady && auditButton}
				{publishReady && !isTranslating && !isPublished && publishButton}
			</Space>
		);
	};

	const downloadExcelForGroup = () => {
		const groupRecordData = _.map(recordsForBatch, (each) => {
			const recordData = _.mapValues(each.record_data, (value, key) => value.value);
			return recordData;
		});
		let worksheet = XLSX.utils.json_to_sheet(groupRecordData);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, worksheet, 'Record Data');
		XLSX.writeFile(wb, `${selectedBatch.unique_group_id}.xlsx`);
	};

	return (
		<React.Fragment>
			<Table
				size='middle'
				className='table-header-styling'
				dataSource={recordBatches}
				columns={batchedRecordsColumns}
				pagination={false}
				scroll={{ y: 520 }}
				expandable={{
					expandedRowRender: (record) => (
						<Card style={{ maxWidth: '1558px' }}>
							<Row gutter={[16, 16]}>
								<Col span={24}>
									<Row gutter={[16, 16]} justify='space-around' align='middle'>
										<Col span={4}>
											<Card size='small'>
												<Statistic title='Total Records' value={record.total_records} />
												<Progress
													type='line'
													strokeColor={{
														'0%': '#108ee9',
														'100%': '#87d068',
													}}
													percent={100}
													format={() => null}
												/>
											</Card>
										</Col>
										<Col span={4}>
											<Card size='small'>
												<Statistic
													title='Processing'
													value={record.total_records - record.published}
												/>
												<Progress
													percent={
														((record.total_records - record.published) /
															record.total_records) *
														100
													}
													strokeColor='#fa8c16'
													status='active'
													showInfo={false}
												/>
											</Card>
										</Col>
										<Col span={4}>
											<Card size='small'>
												<Statistic title='Published' value={record.published} />
												<Progress
													percent={(record.published / record.total_records) * 100}
													status='active'
													showInfo={false}
												/>
											</Card>
										</Col>

										<Col span={2} offset={1}>
											<Row justify='space-around' align='middle'>
												<Col span={24} style={{ textAlign: 'center' }}>
													<FileSearchOutlined
														onClick={() => showCurrentProcess(true)}
														style={{ color: '#1890FF', fontSize: '30px' }}
													/>
												</Col>
												<Col span={24} style={{ textAlign: 'center' }}>
													<Typography.Text style={{ textAlign: 'center' }}>
														{' '}
														Audit Details
													</Typography.Text>
												</Col>
											</Row>
										</Col>
										<Col span={2}>
											<Row justify='space-around' align='middle'>
												<Col span={24} style={{ textAlign: 'center' }}>
													<FileDoneOutlined
														onClick={() => {
															showTemplate(true);
															setDefaultRecord(_.first(recordsForBatch));
														}}
														style={{ color: '#1890FF', fontSize: '30px' }}
													/>
												</Col>
												<Col span={24} style={{ textAlign: 'center' }}>
													<Typography.Text>Preview</Typography.Text>
												</Col>
											</Row>
										</Col>
										<Col span={2}>
											<Row justify='space-around' align='middle'>
												<Col span={24} style={{ textAlign: 'center' }}>
													<FileExcelTwoTone
														onClick={() => downloadExcelForGroup()}
														style={{ color: '#1890FF', fontSize: '30px' }}
													/>
												</Col>
												<Col span={24} style={{ textAlign: 'center' }}>
													<Typography.Text>Dowload</Typography.Text>
												</Col>
											</Row>
										</Col>
										<Col span={2}>
											<Row justify='space-around' align='middle'>
												<Col span={24} style={{ textAlign: 'center' }}>
													<BarChartOutlined
														onClick={() => {
															showReport(true);
														}}
														style={{ color: '#1890FF', fontSize: '30px' }}
													/>
												</Col>
												<Col span={24} style={{ textAlign: 'center' }}>
													<Typography.Text>Report</Typography.Text>
												</Col>
											</Row>
										</Col>
										<Col span={2}>{getActionButtons(record)}</Col>
									</Row>
								</Col>
							</Row>
							<Table
								pagination={false}
								className='header-border-top'
								size='small'
								dataSource={_.map(recordsForBatch, (each) => ({
									formattedName: _.get(each, 'record_data.name.value'),
									...each,
								}))}
								columns={recordsForBatchColumns}
								scroll={{ y: 300 }}
							/>
						</Card>
					),
					expandedRowKeys: [_.get(selectedBatch, 'unique_group_id')],
					expandRowByClick: true,
					onExpand: (expanded: any, record: any) => {
						if (expanded) showBatchRecords(record);
						else showMainTable();
					},
					expandIcon: ({ expanded, onExpand, record }) => (expanded ? <DownOutlined /> : <RightOutlined />),
				}}
				rowKey={(record) => record.unique_group_id}
			/>
			{showAudit && (
				<Modal
					className='audit-modal'
					visible={showAudit}
					title='Audit Process'
					closable={false}
					footer={
						<Space style={{ float: 'right' }}>
							<Button
								type='primary'
								size='small'
								shape='round'
								onClick={() => {
									auditProcess(remark, 'approve');
									setAudit(false);
								}}
							>
								Audit
							</Button>
							<Button
								type='primary'
								danger
								size='small'
								shape='round'
								onClick={() => {
									auditProcess(remark, 'reject');
									setAudit(false);
								}}
							>
								Reject
							</Button>
							<Button shape='round' size='small' type='dashed' onClick={() => setAudit(false)}>
								Cancel
							</Button>
						</Space>
					}
				>
					<Form.Item>
						<Input.TextArea
							placeholder='Enter your remaks here'
							onChange={({ target }) => setRemark(target.value)}
						/>
					</Form.Item>
				</Modal>
			)}
			{currentProcess && (
				<CurrentProcess
					visible={currentProcess}
					steps={constructCurrentProcess()}
					onClose={() => showCurrentProcess(false)}
				/>
			)}
			{templateVisible && (
				<Template
					visible={templateVisible}
					recordData={recordsForBatch}
					defaultRecord={defaultRecord}
					onClose={() => showTemplate(false)}
				/>
			)}
			{reportVisible && (
				<Modal
					className='reports-modal'
					footer={false}
					title='Reports'
					visible={reportVisible}
					onCancel={() => showReport(false)}
					width={1200}
				>
					<Report />
				</Modal>
			)}
			{modalVisible && (
				<Verify
					showModal={showModal}
					modalVisible={modalVisible}
					verificationDetails={verificationDetails}
					verifyLoading={verifyLoading}
				/>
			)}
		</React.Fragment>
	);
};

export default BatchedRecords;
