import React, { Fragment, PureComponent } from 'react';
import _ from 'lodash';
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { render } from 'react-dom';

class Step1 extends PureComponent<any> {
	previewValidateRef: any = React.createRef();

	refreshPreview = () => {
		this.props.getTemplatePreview();
	};

	render() {
		const { labels, entityTemplates, initialValues, templatePreview } = this.props;
		console.log('2', initialValues);
		return (
			<Row gutter={[24, 24]}>
				<Col span={12}>
					<Form
						ref={this.previewValidateRef}
						initialValues={{
							enroll_id_key: 'enroll_id',
							name_key: 'name',
							certificate_title_key: 'certificate_title',
							...initialValues.credDetails,
						}}
					>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item
									name='template_uri'
									key='template_uri'
									label={_.get(labels, 'Entity Templates', 'Entity Templates')}
								>
									<Select>
										{_.map(entityTemplates, (eachTemplate: any) => (
											<Select.Option key={eachTemplate.uri} value={eachTemplate.uri}>
												{eachTemplate.label}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Space direction='horizontal' size='large'>
									<Form.Item
										name='enroll_id_key'
										key='enroll_id_key'
										label={_.get(labels, 'Data Input Key', 'Data Input Key')}
									>
										<Input disabled />
									</Form.Item>
									<Form.Item
										name='enroll_id_display'
										label={_.get(labels, 'UI display label', 'UI display label')}
									>
										<Input placeholder='enroll ID label' />
									</Form.Item>
									<Form.Item
										label={_.get(labels, 'Template Engine Key', 'Template Engine Key')}
										name='enroll_id_template'
									>
										<Input placeholder='Key for Templet Engine, Ex: Jasper' />
									</Form.Item>
								</Space>
							</Col>
							<Col span={24}>
								<Space direction='horizontal' size='large'>
									<Form.Item
										name='name_key'
										key='name_key'
										label={_.get(labels, 'Data Input Key', 'Data Input Key')}
									>
										<Input disabled />
									</Form.Item>
									<Form.Item
										label={_.get(labels, 'UI display label', 'UI display label')}
										name='name_display'
										key='name_display'
									>
										<Input placeholder='Name label' />
									</Form.Item>
									<Form.Item
										label={_.get(labels, 'Template Engine Key', 'Template Engine Key')}
										name='name_template'
										key='name_template'
									>
										<Input placeholder='Key for Templet Engine, Ex: Jasper' />
									</Form.Item>
								</Space>
							</Col>
							<Col span={24}>
								<Space direction='horizontal' size='large'>
									<Form.Item
										name='certificate_title_key'
										key='certificate_title_key'
										label={_.get(labels, 'Data Input Key', '')}
									>
										<Input disabled />
									</Form.Item>
									<Form.Item
										label={_.get(labels, 'UI display label', 'UI display label')}
										name='certificate_title_display'
									>
										<Input placeholder='Certificate title label' />
									</Form.Item>
									<Form.Item
										label={_.get(labels, 'Template Engine Key', 'Template Engine Key')}
										name='certificate_title_template'
									>
										<Input placeholder='Key for Templet Engine, Ex: Jasper' />
									</Form.Item>
								</Space>
							</Col>
						</Row>
						<Form.List name='fields'>
							{(fields, { add, remove }, { errors }) => (
								<>
									{fields.map((field, index) => (
										<Row gutter={[24, 24]}>
											<Col span={7}>
												<Form.Item
													{...field}
													label={_.get(labels, 'Data Input Key', '')}
													name={[field.name, 'key']}
													fieldKey={[field.fieldKey, 'key']}
													rules={[{ required: true, message: 'Key is required!' }]}
												>
													<Input placeholder='Data Input Key' />
												</Form.Item>
											</Col>
											<Col span={7}>
												<Form.Item
													{...field}
													label={_.get(labels, 'UI display label', 'UI display label')}
													name={[field.name, 'display']}
													fieldKey={[field.fieldKey, 'display']}
													rules={[{ required: true, message: 'display is required!' }]}
												>
													<Input placeholder='Display Name' />
												</Form.Item>
											</Col>
											<Col span={7}>
												<Form.Item
													{...field}
													label={_.get(labels, 'Template Engine Key', 'Template Engine Key')}
													name={[field.name, 'template']}
													fieldKey={[field.fieldKey, 'template']}
												>
													<Input placeholder='Ex: Jasper Template key' />
												</Form.Item>
											</Col>
											<Col span={3}>
												<CloseOutlined onClick={() => remove(field.name)} />
											</Col>
										</Row>
									))}
									<Form.Item>
										<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
											Add Field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</Form>
				</Col>
				<Col span={12}>
					{/* <Typography.Title level={3} style={{ fontFamily: 'cursive', marginLeft: '45%' }}>
						{'{Name}'}
					</Typography.Title> */}
					<Space size='middle' direction='vertical' style={{ width: '100%', height: '100%' }} align='center'>
						<Button onClick={this.refreshPreview}>Refresh</Button>
						<iframe
							width='100%'
							height='100%'
							style={{ minWidth: '750px', minHeight: '400px', maxHeight: '450px' }}
							src={templatePreview}
							
						></iframe>
					</Space>
				</Col>
			</Row>
		);
	}
}

export default Step1;
