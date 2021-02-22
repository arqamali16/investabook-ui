import React, { Component } from 'react';
import { Card, Collapse, Menu, Switch, Tabs, Upload, Form, Input, Row, Col, Select, Button, InputNumber } from 'antd';
import { AppstoreOutlined, InboxOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import CustomLayout from '../../Components/CustomLayout';
import _, { kebabCase } from 'lodash';

const { Panel } = Collapse;
const { TabPane } = Tabs;

class Settings extends Component<any, any> {
	formRef: any = React.createRef();

	getInitialValues = () => {
		let initialValue = {};
		_.map(this.props.config, (each) => {
			initialValue = { ...initialValue, [each.field]: each.value };
		});
		initialValue = {
			...initialValue,
			'store.lang': { ...JSON.parse(_.get(_.find(this.props.config, ['field', 'store.lang']), 'value', '{}')) },
		};
		return initialValue;
	};

	renderComponent = (component: string, value: any) => {
		const { settingPermissions } = this.props;
		const { canUpdateSettings } = settingPermissions;

		switch (component) {
			case 'text':
				return <Input />;
			case 'upload':
				return <Upload />;
			case 'select':
				return <Select />;
			case 'toggle':
				return <Switch />;
		}
	};

	getUiConfigs = () => {
		return _.filter(this.props.config, (each) => _.includes(each.field, 'ui'));
	};

	render() {
		const { config, settingsLoading, actions, settingPermissions } = this.props;
		const { canUpdateSettings } = settingPermissions;
		const labels = JSON.parse(_.get(_.find(config, ['field', 'store.lang']), 'value', '{}'));
		return (
			<CustomLayout loading={settingsLoading}>
				<Card
					title='Configuration'
					className='settings-card'
					extra={
						<Button
							type='primary'
							shape='round'
							onClick={() => {
								actions.saveSettings(this.formRef.current.getFieldsValue());
							}}
						>
							Save
						</Button>
					}
				>
					{!_.isEmpty(config) && (
						<Form initialValues={this.getInitialValues()} className='settings-fields' ref={this.formRef}>
							<Collapse defaultActiveKey={['1']} accordion>
								<Panel header='User Interface Configurations' key='1'>
									<Row gutter={[50, 16]}>
										{_.map(
											_.filter(this.props.config, (each) => _.includes(each.field, 'ui')),
											(each) => (
												<Col span={6}>
													<Form.Item
														label={each.label}
														name={each.field}
														valuePropName={
															each.component === 'toggle' ? 'checked' : 'value'
														}
													>
														{this.renderComponent(each.component, each.value)}
													</Form.Item>
												</Col>
											),
										)}
									</Row>
								</Panel>
								<Panel header='System Configurations' key='2'>
									<Row gutter={[50, 16]}>
										{_.map(
											_.filter(this.props.config, (each) => !_.includes(each.field, 'ui')),
											(each) => (
												<Col span={6}>
													<Form.Item
														label={each.label}
														name={each.field}
														valuePropName={
															each.component === 'toggle' ? 'checked' : 'value'
														}
													>
														{this.renderComponent(each.component, each.value)}
													</Form.Item>
												</Col>
											),
										)}
									</Row>
								</Panel>
								<Panel header='Labels' key='3'>
									<Row gutter={[8, 16]}>
										<Form.List name='store.lang'>
											{(fields) => (
												<>
													{_.map(_.keys(labels), (eachLabel) => (
														<Col span={6}>
															<Form.Item
																label={eachLabel}
																name={eachLabel}
																key={eachLabel}
															>
																<Input
																	placeholder='passenger name'
																	style={{ width: '60%' }}
																/>
															</Form.Item>
														</Col>
													))}
												</>
											)}
										</Form.List>
									</Row>
								</Panel>
							</Collapse>
						</Form>
					)}
				</Card>
			</CustomLayout>
		);
	}
}

export default Settings;
