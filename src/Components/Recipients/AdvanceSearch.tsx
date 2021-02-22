import React, { PureComponent } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import { useForm } from 'antd/lib/form/Form';

const AdvanceSearch = (props: any) => {
	const [form] = useForm();
	const { close, searchRecipients } = props;

	const handleOnSearch = () => {
		const value = form.getFieldsValue();
		searchRecipients(value, true);
	};
	return (
		<Card className='search-border'>
			<Form form={form}>
				<Row gutter={[48, 16]}>
					<Col span={6}>
						<Form.Item label='Enrolled ID' name='enrolled_id' key='enrolled_id'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label='Name' name='name' key='name'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label='Shahada ID' name='public_key' key='public_key'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label='Email' name='contact_value' key='contact_value'>
							<Input />
						</Form.Item>
					</Col>

					{/* <Col span={6}>
						<Form.Item label='Mobile' name='mobile' key='mobile'>
							<Input />
						</Form.Item>
					</Col> */}
				</Row>
				<Button style={{ float: 'right' }} type='link' onClick={() => close(false)}>
					Close
				</Button>
				<Button style={{ float: 'right' }} type='primary' onClick={handleOnSearch}>
					Search
				</Button>
			</Form>
		</Card>
	);
};

export default AdvanceSearch;
