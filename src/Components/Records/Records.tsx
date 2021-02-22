import { CloseCircleOutlined, DownloadOutlined, EyeFilled, InboxOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Modal, Row, Select, Table, Tabs } from 'antd';
import { Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useState } from 'react';
import CustomLayout from '../CustomLayout';
import xlsx from 'xlsx';
import BatchedTable from './BatchedRecords';
import _, { isEmpty } from 'lodash';
import moment from 'moment';
import DrawerDecription from '../../Common/DrawerDescription';
import AdvanceSearch from './AdvanceSearch';
import AllRecordsTable from './AllRecords';
import NormalSearch from './NormalSearch';

const { TabPane } = Tabs;
const { Search } = Input;

const Records = (props: any) => {
	const [form] = Form.useForm();
	const [showDownload, setShowDownload] = useState(false);
	const [showAllRecords, setAllRecords] = useState({});
	const [searchBarVisible, showSearchBar] = useState(false);
	const [advanceSearchVisible, showAdvanceSearch] = useState(false);
	const [activeKey, changeActiveKey] = useState('1');

	const { recordPermissions, actions, selectedRecord, selectedRole, searchLoading, labels, timeOut } = props;
	const { clearExcelData, closeSelectedRecord, getExcelForCategory, downloadCertificate, searchRecords } = actions;
	const { canAddRecord } = recordPermissions;

	const convertXmlToJson = (file: any) => {
		let reader = new FileReader();
		reader.onload = (e: any) => {
			let data = e.target.result;
			data = new Uint8Array(data);
			const workbook = xlsx.read(data, { type: 'array' });
			let result = {};
			workbook.SheetNames.forEach(function (sheetName) {
				let roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
				if (roa.length) _.setWith(result, sheetName, roa, Object);
			});

			const sheets = _.values(result);
			props.actions.setExcelData(_.first(sheets));
		};
		reader.readAsArrayBuffer(file);
		return false;
	};

	const validateAndAdd = () => {
		form.validateFields().then(() => {
			props.actions.addRecords(form.getFieldsValue());
			form.resetFields();
		});
	};

	const excelColumnHeading = _.keys(_.first(props.excelData));

	const columns = _.map(excelColumnHeading, (each) => {
		return { title: each, dataIndex: each, key: each, editable: true };
	});

	const handleAddRecord = () => {
		validateAndAdd();
	};

	const handleExcelDownload = () => {
		const credentialType = form.getFieldValue('credential_type');
		getExcelForCategory(credentialType);
	};

	const handleDownload = () => {
		const credentialType = form.getFieldValue('credential_type');
		if (credentialType) setShowDownload(true);
	};

	const closeAll = () => {
		showSearchBar(false);
		showAdvanceSearch(false);
	};

	const handleSearch = (value: any) => {
		searchRecords(value, advanceSearchVisible);
	};

	return (
		<CustomLayout loading={props.recordLoading} timeOut={timeOut}>
			<Card
				title='Records'
				className='main-card-border'
				extra={
					searchBarVisible ? (
						<React.Fragment>
							{!advanceSearchVisible && (
								<NormalSearch
									changeActiveKey={changeActiveKey}
									showAdvanceSearch={showAdvanceSearch}
									closeAll={closeAll}
									handleSearch={handleSearch}
									searchLoading={searchLoading}
								/>
							)}
						</React.Fragment>
					) : (
						<SearchOutlined onClick={() => showSearchBar(true)} />
					)
				}
			>
				<Tabs defaultActiveKey='1' activeKey={activeKey} onChange={(key) => changeActiveKey(key)}>
					<TabPane tab={_.get(labels, 'Record Groups', '')} key='1'>
						<BatchedTable selectedRole={selectedRole} />
					</TabPane>
					<TabPane tab={_.get(labels, 'All Records', '')} key='2'>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								{advanceSearchVisible && (
									<AdvanceSearch
										credTempOptions={props.mappings}
										workFlowOptions={[]}
										close={closeAll}
										searchRecords={searchRecords}
									/>
								)}
							</Col>
							<Col span={24}>
								<AllRecordsTable />
							</Col>
						</Row>
					</TabPane>

					{canAddRecord && (
						<TabPane tab={_.get(labels, 'Add Records', '')} key='3'>
							<Form form={form}>
								<Row gutter={[16, 16]}>
									<Col span={8}>
										<Form.Item
											label={_.get(labels, 'Group ID', '')}
											name='unique_group_id'
											rules={[{ required: true, message: 'Tag is required !' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item
											label={_.get(labels, 'Credential Template', '')}
											name='credential_type'
											rules={[{ required: true, message: 'Credential Template is required !' }]}
										>
											<Select onChange={handleDownload}>
												{_.map(props.mappings, (eachMap) => (
													<Select.Option
														key={eachMap.cred_id}
														value={eachMap.cred_id}
														style={{ height: '60px' }}
													>
														<Row>
															<Col span={24} style={{ fontWeight: 'bolder' }}>
																{eachMap.name}
															</Col>
															<Col span={24} style={{ fontSize: '12px', color: '#555' }}>
																ID: {eachMap.cred_id}
															</Col>
															<Divider />
														</Row>
													</Select.Option>
												))}
											</Select>
										</Form.Item>
									</Col>
									{showDownload && (
										<Col span={8} style={{ marginTop: '30px' }}>
											<Form.Item>
												<Button
													onClick={handleExcelDownload}
													type='link'
													icon={<DownloadOutlined />}
												>
													Download Excel for Selected Template
												</Button>
											</Form.Item>
										</Col>
									)}
								</Row>

								<Form.Item>
									<Dragger multiple={false} beforeUpload={convertXmlToJson} accept='.xlsx'>
										<p className='ant-upload-drag-icon'>
											<InboxOutlined />
										</p>
										<p className='ant-upload-text'>Click or drag file to this area to upload</p>
										<p className='ant-upload-hint'>Support for a single or bulk upload.</p>
									</Dragger>
								</Form.Item>
							</Form>
						</TabPane>
					)}
				</Tabs>
			</Card>
			<Modal
				visible={!_.isEmpty(props.excelData)}
				closable={false}
				width={1000}
				onCancel={clearExcelData}
				okText={'Add'}
				onOk={handleAddRecord}
			>
				<Table
					size='small'
					columns={columns}
					dataSource={props.excelData}
					scroll={{ x: '1000px', y: '600px' }}
					pagination={false}
				/>
			</Modal>
			{!_.isEmpty(selectedRecord) && (
				<DrawerDecription
					descriptionArray={props.recordsForBatch}
					defaultIndex={_.findIndex(props.recordsForBatch, ['enrolled_id', selectedRecord.enrolled_id])}
					visible={!_.isEmpty(selectedRecord)}
					onClose={closeSelectedRecord}
				/>
			)}
			{!_.isEmpty(showAllRecords) && (
				<DrawerDecription
					descriptionArray={props.records}
					defaultIndex={_.findIndex(props.records, ['enrolled_id', _.get(showAllRecords, 'enrolled_id')])}
					visible={!_.isEmpty(showAllRecords)}
					onClose={() => setAllRecords({})}
				/>
			)}
		</CustomLayout>
	);
};

export default Records;
