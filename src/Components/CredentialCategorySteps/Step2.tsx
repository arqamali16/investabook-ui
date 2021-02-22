import React, { PureComponent } from 'react';
import { Button, Card, Col, Form, Input, Modal, Row, Select, Space } from 'antd';
import _ from 'lodash';
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DocumentPreview from './Preview';

class Step2 extends PureComponent<any> {
	state = { showPreview: false };
	formRef21: any = React.createRef();

	validateForm = () => {
		this.formRef21.current.validateFields();
	};

	handleCreateTemplate = () => {
		const values = this.formRef21.current.getFieldsValue();
		this.formRef21.current.validateFields().then(() => {
			this.props.create(values);
			this.setState({ addNew: false });
			this.props.checkAddNew(false);
		});
	};

	render() {
		const { labels, initialValues } = this.props;
		return (
			<Card style={{ minHeight: '400px', maxHeight: '500px', overflow: 'scroll' }}>
				<Form ref={this.formRef21} initialValues={initialValues.credDetails}>
					<Row gutter={[72, 24]}>
						<Col span={12}>
							<Form.Item
								label={_.get(labels, 'Credential Template ID', 'Credential Template ID')}
								name='name'
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label={_.get(labels, 'Credential Category', 'Credential Category')}
								name='type'
								rules={[{ required: true }]}
							>
								<Input placeholder='Ex: Sports, Graduation, Award Cermony' />
							</Form.Item>
							<Form.Item
								label={`${_.get(labels, 'Credential Template', 'Credential Template')} Description`}
								name='description'
								rules={[{ required: true }]}
							>
								<Input.TextArea />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>
		);
	}
}

export default Step2;
