import React, { PureComponent } from 'react';
import Step1 from './Preview';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import { Steps, Button, message, Spin, Space } from 'antd';
import _ from 'lodash';

const { Step } = Steps;

class Main extends PureComponent<any> {
	state = { current: 0, values: {}, addNew: false };
	validateRef: any = React.createRef();

	checkAddNew = (addNew: any) => {
		this.setState({ addNew });
	};

	getSteps = () => {
		const {
			credCategories,
			processFlow,
			roles,
			processList,
			actions,
			labels,
			entityTemplates,
			templatePreview,
		} = this.props;
		const {
			addProcess,
			saveProcessFlow,
			addCredentialCategory,
			addCredentialManager,
			getTemplatePreview,
		} = actions;
		return [
			{
				title: `Select a ${_.get(labels, 'Credential Template', 'Credential Template')}`,
				content: (
					<Step2
						ref={this.validateRef}
						credCategories={credCategories}
						create={addCredentialCategory}
						initialValues={this.state.values}
						checkAddNew={this.checkAddNew}
						labels={labels}
					/>
				),
			},
			{
				title: 'Preview',
				content: (
					<Step1
						ref={this.validateRef}
						initialValues={this.state.values}
						labels={labels}
						entityTemplates={entityTemplates}
						getTemplatePreview={getTemplatePreview}
						templatePreview={templatePreview}
					/>
				),
			},
			{
				title: `Select a ${_.get(labels, 'Work Flow', 'Work Flow')}`,
				content: (
					<Step3
						ref={this.validateRef}
						processFlow={processFlow}
						roles={roles}
						onChange={saveProcessFlow}
						addProcess={addProcess}
						processList={processList}
						checkAddNew={this.checkAddNew}
						initialValues={this.state.values}
						labels={labels}
					/>
				),
			},
			{
				title: 'Review and Confirm',
				content: <Step4 processList={processList} credCategories={credCategories} />,
			},
		];
	};

	next = () => {
		switch (this.state.current) {
			case 0:
				this.validateRef.current.formRef21.current.validateFields().then(() => {
					const values = this.validateRef.current.formRef21.current.getFieldsValue();
					this.setState({
						current: this.state.current + 1,
						values: { ...this.state.values, credDetails: values },
					});
				});
				break;
			case 1:
				this.validateRef.current.previewValidateRef.current.validateFields().then(() => {
					const values = this.validateRef.current.previewValidateRef.current.getFieldsValue();
					this.setState({
						current: this.state.current + 1,
						values: { ...this.state.values, credDetails: values },
					});
				});
				// this.setState({ current: this.state.current + 1 });
				break;
			case 2:
				this.validateRef.current.formRef3.current.validateFields().then(() => {
					const values = this.validateRef.current.formRef3.current.getFieldsValue();
					this.setState({
						current: this.state.current + 1,
						values: { ...this.state.values, ...values },
					});
				});
				break;
			case 3:
				this.setState({ current: this.state.current + 1 });
				break;
		}
	};

	prev = () => {
		this.setState({ current: this.state.current - 1 });
	};

	handleCredentialManager = () => {
		const { addCredentialManager } = this.props.actions;
		addCredentialManager(this.state.values);
		this.setState({ current: 0, value: {} });
	};

	render() {
		const { credLoading, actions } = this.props;
		const { addCredentialManager } = actions;

		console.log(this.state);
		return (
			<Spin spinning={credLoading}>
				<Space direction='vertical' size='middle' style={{ width: '100%' }}>
					<Steps current={this.state.current} size='small'>
						{this.getSteps().map((item) => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps>
					<div className='steps-content'>{this.getSteps()[this.state.current].content}</div>
					<div className='steps-action'>
						{this.state.current > 0 && !this.state.addNew && (
							<Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
								Previous
							</Button>
						)}
						{!this.state.addNew && this.state.current < this.getSteps().length - 1 && (
							<Button type='primary' onClick={() => this.next()}>
								Next
							</Button>
						)}
						{this.state.current === this.getSteps().length - 1 && (
							<Button type='primary' onClick={this.handleCredentialManager}>
								Done
							</Button>
						)}
					</div>
				</Space>
			</Spin>
		);
	}
}

export default Main;
