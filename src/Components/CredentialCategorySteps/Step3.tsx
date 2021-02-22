import React, { PureComponent } from 'react';
import { Avatar, Button, Card, Col, Form, Input, Row, Select, Space, Timeline } from 'antd';
import CreateProcess from '../../Common/ProcessCreate';
import _ from 'lodash';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class Step3 extends PureComponent<any> {
	state = { addNew: false };
	formRef3: any = React.createRef();
	formRef31: any = React.createRef();

	validateForm = () => {
		this.formRef31.current.validateFields();
	};

	handleCreate = () => {
		const details = this.formRef31.current.getFieldsValue();
		this.formRef31.current.validateFields().then(() => {
			this.props.addProcess(details);
			this.setState({ addNew: false });
			this.props.checkAddNew(false);
		});
	};

	handleChange = () => {
		const value = this.formRef31.current.getFieldsValue();
		this.props.onChange(value);
	};

	render() {
		const { processFlow, roles, processList, onChange, addProcess, labels } = this.props;
		return (
			<Card style={{ minHeight: '400px', maxHeight: '550px', overflow: 'scroll' }}>
				<Row gutter={[60, 16]}>
					<Col span={6}>
						<Form ref={this.formRef3} initialValues={this.props.initialValues}>
							<Form.Item
								label={_.get(labels, 'Work Flow', 'Work Flow')}
								name='process_id'
								rules={[{ required: true }]}
							>
								<Select disabled={this.state.addNew}>
									{_.map(processList, (each) => (
										<Select.Option key={each.process_id} value={each.process_id}>
											{each.name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Space>
								<Button
									style={{ float: 'right' }}
									type='link'
									onClick={() => {
										this.setState({ addNew: !this.state.addNew });
										this.props.checkAddNew(!this.state.addNew);
									}}
								>
									{this.state.addNew ? 'Select Exsisting' : '+ Add New'}
								</Button>
							</Space>
						</Form>
					</Col>
					<Col span={18}>
						{this.state.addNew && (
							<Row gutter={[4, 4]}>
								<Col span={12}>
									<Form
										name='dynamic_form_nest_item'
										autoComplete='off'
										onChange={this.handleChange}
										ref={this.formRef31}
									>
										<Space direction='vertical' size='large' style={{ width: '90%' }}>
											<Form.Item
												label='Name'
												name='name'
												rules={[{ required: true, message: 'Name is required!' }]}
											>
												<Input />
											</Form.Item>

											<Form.Item
												label={_.get(labels, 'Description', 'Description')}
												name='description'
												rules={[{ required: true, message: 'Description is required!' }]}
											>
												<Input.TextArea />
											</Form.Item>
											<Form.Item
												label={_.get(labels, 'Process Initiator', 'Process Initiator')}
												name='creator'
												rules={[{ required: true, message: 'Creator is required!' }]}
											>
												<Select onChange={this.handleChange}>
													{_.map(roles, (eachRole: any, index) => (
														<Select.Option
															key={eachRole.role_id}
															value={eachRole.role_name}
														>
															{eachRole.role_name}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
											<Form.List name='process'>
												{(fields, { add, remove }, { errors }) => (
													<>
														{fields.map((field, index) => (
															<Space
																key={field.key}
																style={{ display: 'flex', marginBottom: 8 }}
																align='baseline'
															>
																<Form.Item
																	{...field}
																	name={[field.name, 'auditor']}
																	fieldKey={[field.fieldKey, 'auditor']}
																	rules={[
																		{
																			required: true,
																			message: 'Auditor is required!',
																		},
																	]}
																>
																	<Select
																		placeholder={_.get(
																			labels,
																			'Auditor Role',
																			'Auditor Role',
																		)}
																		onChange={this.handleChange}
																		style={{ width: '300px' }}
																	>
																		{_.map(roles, (eachRole: any, index) => (
																			<Select.Option
																				key={eachRole.role_id}
																				value={eachRole.role_name}
																			>
																				{eachRole.role_name}
																			</Select.Option>
																		))}
																	</Select>
																</Form.Item>
																<Form.Item
																	{...field}
																	name={[field.name, 'action']}
																	fieldKey={[field.fieldKey, 'action']}
																	rules={[
																		{
																			required: true,
																			message: 'Action is required!',
																		},
																	]}
																>
																	<Input
																		placeholder={_.get(
																			labels,
																			'Audit Action',
																			'Audit Action',
																		)}
																		style={{ width: '300px' }}
																	/>
																</Form.Item>
																<MinusCircleOutlined
																	onClick={() => remove(field.name)}
																/>
															</Space>
														))}
														<Form.Item>
															<Button
																type='dashed'
																onClick={() => add()}
																block
																icon={<PlusOutlined />}
															>
																Add Audit
															</Button>
														</Form.Item>
													</>
												)}
											</Form.List>
											<Form.Item
												label={_.get(labels, 'Publisher', 'Publisher')}
												name='publisher'
												key='publisher'
												rules={[{ required: true, message: 'Publisher is required!' }]}
											>
												<Select onChange={this.handleChange}>
													{_.map(roles, (eachRole: any, index) => (
														<Select.Option
															key={eachRole.role_id}
															value={eachRole.role_name}
														>
															{eachRole.role_name}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
										</Space>
										{this.state.addNew && (
											<Form.Item>
												<Button
													type='primary'
													shape='round'
													onClick={this.handleCreate}
													style={{ width: '90%' }}
												>
													Create
												</Button>
											</Form.Item>
										)}
									</Form>
								</Col>
								<Col span={12}>
									<Timeline
										mode='alternate'
										style={{ float: 'left', marginTop: '50px', width: '65%' }}
									>
										<Timeline.Item
											dot={<Avatar style={{ backgroundColor: '#1890ff' }}>1</Avatar>}
											position='left'
										>
											<p>
												{processFlow.creator ? (
													<text>
														Credential preparation by<br></br>
														<strong>{processFlow.creator}</strong>
													</text>
												) : (
													'Creator starts the process'
												)}
											</p>
										</Timeline.Item>
										{_.map(processFlow.process, (each, index) => {
											const hasData = each.action && each.auditor;
											return (
												<Timeline.Item
													dot={
														<Avatar style={{ backgroundColor: '#1890ff' }}>
															{index + 2}
														</Avatar>
													}
													position='left'
												>
													<p>
														<text>
															Credential process (<strong>{each.action}</strong>) by{' '}
															<br></br>
															<strong>{each.auditor}</strong>
														</text>
														{/* {`Credential <strong>${each.action}</strong> by users associated with <strong>${each.auditor}</strong>`} */}
													</p>
												</Timeline.Item>
											);
										})}
										{processFlow.publisher && (
											<Timeline.Item
												dot={
													<Avatar style={{ backgroundColor: '#1890ff' }}>
														{_.size(processFlow.process) + 2}
													</Avatar>
												}
												position='left'
											>
												<p>
													Publishing credential by <strong>{processFlow.publisher}</strong>
												</p>
											</Timeline.Item>
										)}
									</Timeline>
								</Col>
							</Row>
						)}
					</Col>
				</Row>
			</Card>
		);
	}
}

export default Step3;
