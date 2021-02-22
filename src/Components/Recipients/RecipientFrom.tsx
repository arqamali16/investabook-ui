import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider, Input, InputNumber, Row, Select, Space } from 'antd';
import { Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { countryCode } from '../../Constants/countryCode';

const MutiForm = (props: any) => {
	const [form] = Form.useForm();
	const { labels } = props;

	const onFinish = (values: any) => {
		props.addRecipient(values);
		form.resetFields();
	};

	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select style={{ width: '100px' }}>
				{_.map(countryCode, (each) => (
					<Select.Option value={each.code} key={each.code}>
						{each.code}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);

	return (
		<Form
			name='dynamic_form_nest_item'
			onFinish={onFinish}
			form={form}
			autoComplete='off'
			initialValues={{ prefix: '+971' }}
		>
			<Row gutter={[24, 16]}>
				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'Enrollment Identity', '')}
						name={'enrolled_id'}
						rules={[{ required: true, message: 'Missing Enrolement Identity' }]}
					>
						<Input />
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'Email', '')}
						name={'email'}
						rules={[{ type: 'email' }, { required: true, message: 'Missing Email' }]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'Mobile', '')}
						name={'mobile_no'}
						rules={[{ pattern: /^[0-9]*$/g, message: 'Enter valid mobile number!' }]}
					>
						<Input addonBefore={prefixSelector} style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'First Name', '')}
						name={'name.firstName'}
						rules={[{ required: true, message: 'Fist Name is required!' }]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={_.get(labels, 'Middle Name', '')} name={'name.middleName'}>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'Last Name', '')}
						name={'name.lastName'}
						rules={[{ required: true, message: 'Last Name is required!' }]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'Arabic Name', '')}
						name={'name.ar'}
						rules={[{ required: true, message: 'Missing name' }]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label={_.get(labels, 'DOB', '')}
						name={'dob'}
						rules={[{ required: true, message: 'Missing date of birth' }]}
					>
						<DatePicker
							disabledDate={(current) => current && current > moment().endOf('day')}
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Col>
			</Row>

			<Divider>{_.get(labels, 'Documents', '')}</Divider>
			<Form.List name='document'>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
								<Form.Item
									{...field}
									name={[field.name, 'id_type']}
									fieldKey={[field.fieldKey, 'id_type']}
									rules={[{ required: true, message: 'ID Type is missing' }]}
								>
									<Select placeholder='Select identity type'>
										<Select.Option key='emiratesId' value='Emirates ID'>
											Emirates ID
										</Select.Option>
										<Select.Option key='passport' value='Passport'>
											Passport
										</Select.Option>
										<Select.Option key='visa' value='Visa'>
											Visa
										</Select.Option>
										<Select.Option key='ikama' value='IKAMA'>
											IKAMA
										</Select.Option>
										<Select.Option key='familyBook' value='Family Book'>
											Family Book
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									{...field}
									name={[field.name, 'id_number']}
									fieldKey={[field.fieldKey, 'id_number']}
									rules={[{ required: true, message: 'ID number is missing!' }]}
								>
									<Input placeholder='Identity Number' />
								</Form.Item>
								<Form.Item
									{...field}
									name={[field.name, 'issue_authority']}
									fieldKey={[field.fieldKey, 'issue_authority']}
									rules={[{ required: true, message: 'Issuing Authority is missing!' }]}
								>
									<Input placeholder='Issuing Authority' />
								</Form.Item>
								<Form.Item
									{...field}
									name={[field.name, 'issue_place']}
									fieldKey={[field.fieldKey, 'issue_place']}
									rules={[{ required: true, message: 'Issuing place is missing!' }]}
								>
									<Input placeholder='Issuing Place' />
								</Form.Item>
								<Form.Item
									{...field}
									name={[field.name, 'valid_from']}
									fieldKey={[field.fieldKey, 'valid_from']}
									rules={[{ required: true, message: 'Valid from date is missing' }]}
								>
									<DatePicker
										placeholder='Valid From'
										disabledDate={(current) => current && current > moment().endOf('day')}
									/>
								</Form.Item>
								<Form.Item
									{...field}
									name={[field.name, 'valid_to']}
									fieldKey={[field.fieldKey, 'valid_to']}
									rules={[{ required: true, message: 'Valid to date is missing' }]}
								>
									<DatePicker placeholder='Valid Thru' />
								</Form.Item>

								<MinusCircleOutlined onClick={() => remove(field.name)} />
							</Space>
						))}
						<Form.Item>
							<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
								{_.get(labels, 'Add Document', '')}
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default MutiForm;
