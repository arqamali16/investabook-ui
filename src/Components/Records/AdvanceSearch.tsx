import React from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import { useForm } from 'antd/lib/form/Form';

const { RangePicker } = DatePicker;

const AdvanceSearch = (props: any) => {
	const [form] = useForm();
	const { close, credTempOptions, workFlowOptions, searchRecords } = props;

	const handleSearch = () => {
		const value = form.getFieldsValue();
		searchRecords(value, true);
	};

	return (
		<Card className='search-border'>
			<Form form={form}>
				<Row gutter={[30, 16]}>
					<Col span={4}>
						<Form.Item label='Enrolled ID' name='enrolled_id' key='enrolled_id'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Unique Group ID' name='unique_group_id' key='unique_group_id'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Credential Template' key='credential_template' name='credential_template'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Workflow' key='workflow' name='workflow'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Status' name='status' key='status'>
							<Select>
								<Select.Option key='new_record' value='new_record'>
									New Record
								</Select.Option>
								<Select.Option key='prcessing' value='processing'>
									Processing
								</Select.Option>
								<Select.Option key='published' value='published'>
									Published
								</Select.Option>
								<Select.Option key='translating' value='translating'>
									Generating
								</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Created By' name='created_by' key='created_by'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Modified By' name='modified_by' key='modified_by'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Created Timestamp' name='created_at' key='created_at'>
							<DatePicker
								disabledDate={(current) => current && current > moment().endOf('day')}
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item label='Modified Timestamp' name='modified_at' key='modified_at'>
							<DatePicker
								disabledDate={(current) => current && current > moment().endOf('day')}
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Button style={{ float: 'right' }} type='link' onClick={() => close(false)}>
					Close
				</Button>
				<Button style={{ float: 'right' }} type='primary' onClick={handleSearch}>
					Search
				</Button>
			</Form>
		</Card>
	);
};

export default AdvanceSearch;
