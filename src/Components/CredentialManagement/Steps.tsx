import React, { PureComponent } from 'react';
import { Steps, Button, message, Form, Input, Select } from 'antd';
import _ from 'lodash';
import Modal from 'antd/lib/modal/Modal';

const ProcessSteps = (props: any) => {
	const [current, setCurrent] = React.useState(0);
	const [form] = Form.useForm();
	const { mappings, processList, showProcessModal } = props;

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const handleAddProcess = () => {
		const values = form.getFieldsValue();
		form.validateFields().then(() => props.addCredentialType(values));
	};

	const steps = [
		{
			title: 'Enter Crendential Template ID',
			content: (isDisabled: boolean) => (
				<Form.Item
					name='name'
					key='name'
					rules={[{ required: true, message: 'Name is required!' }]}
					style={{ width: '30%' }}
				>
					<Input disabled={!isDisabled} />
				</Form.Item>
			),
		},
		{
			title: 'Enter Crendential Template Description',
			content: (isDisabled: boolean) => (
				<Form.Item
					name='description'
					key='description'
					rules={[{ required: true, message: 'Name is required!' }]}
					style={{ width: '30%' }}
				>
					<Input.TextArea disabled={!isDisabled} />
				</Form.Item>
			),
		},
		{
			title: 'Select Credential Category',
			content: (isDisabled: boolean) => (
				<Form.Item
					name='mapping_id'
					key='mapping_id'
					rules={[{ required: true, message: 'Category is required!' }]}
					style={{ width: '30%' }}
				>
					<Select disabled={!isDisabled}>
						{_.map(mappings, (eachMap) => (
							<Select.Option key={eachMap.mapping_id} value={eachMap.mapping_id}>
								{eachMap.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			),
		},
		{
			title: 'Select a Bussiness process flow',
			content: (isDisabled: boolean) => (
				<div>
					<Form.Item
						name='process_id'
						key='process_id'
						rules={[{ required: true, message: 'Process Flow is required!' }]}
						style={{ width: '30%' }}
					>
						<Select disabled={!isDisabled}>
							{_.map(processList, (eachMap) => (
								<Select.Option key={eachMap.process_id} value={eachMap.process_id}>
									{eachMap.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Button type='link' onClick={showProcessModal}>
						+ Add Process
					</Button>
				</div>
			),
		},
	];

	return (
		<Form form={form}>
			<Steps current={current} direction='vertical'>
				{steps.map((item, index) => (
					<Steps.Step
						key={item.title}
						title={item.title}
						description={item.content(current === index)}
					></Steps.Step>
				))}
			</Steps>
			<div className='steps-action'>
				{current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
						Previous
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type='primary' onClick={handleAddProcess}>
						Create
					</Button>
				)}
				{current < steps.length - 1 && (
					<Button type='primary' onClick={() => next()}>
						Next
					</Button>
				)}
			</div>
		</Form>
	);
};

export default ProcessSteps;
