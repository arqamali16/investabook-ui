import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Steps, Card, Space, Spin, Button, Modal } from 'antd';
import _ from 'lodash';

import VerifyLogic from '../../Logics/verification';
import { useValues } from 'kea';
import { LoadingOutlined, SafetyCertificateFilled } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const VerificationModal = (props: any) => {
	const { verificationDetails, verifyLoading } = useValues(VerifyLogic);

	const chainDetails = _.first(_.get(verificationDetails, 'txn', []));

	const [modalVisible, showModal] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		let interval: any;
		if (modalVisible && currentStep < _.size(_.get(verificationDetails, 'steps', [])))
			interval = setInterval(() => setCurrentStep(currentStep + 1), 1000);
		return () => {
			clearInterval(interval);
		};
	});

	return (
		<Spin spinning={verifyLoading}>
			<Row gutter={[16, 24]} justify='center' align='middle'>
				<Col span={24}>
					<object
						type='application/pdf'
						width='100%'
						height={isMobile ? '300px' : '800px'}
						data={`https://api.shahada.ae/expo/download/${_.last(
							_.split(window.location.href, '/'),
						)}?q=${_.get(_.split(window.location.href, '/'), [
							_.size(_.split(window.location.href, '/')) - 2,
						])}#view=Fit`}
					></object>
				</Col>
				<Col span={24}>
					<Row justify='center' align='middle'>
						<Col>
							<Button shape='round' type='primary' onClick={() => showModal(true)}>
								Verify
							</Button>
						</Col>
						<Col>
							<Button
								shape='round'
								type='link'
								href={`https://api.shahada.ae/expo/download/${_.last(
									_.split(window.location.href, '/'),
								)}?q=${_.get(_.split(window.location.href, '/'), [
									_.size(_.split(window.location.href, '/')) - 2,
								])}&download=true`}
							>
								Download Cerificate
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>

			<Modal
				visible={modalVisible}
				onCancel={() => showModal(false)}
				width={600}
				footer={null}
				title='Verfication'
			>
				<Row gutter={[16, 24]} justify='center' align='middle'>
					<Col span={24}>
						<Card className='chain-description' size='small'>
							<Space
								direction='horizontal'
								size='middle'
								align='center'
								style={{ width: '100%', padding: '2%', paddingLeft: '20%' }}
							>
								{currentStep === _.size(_.get(verificationDetails, 'steps')) ? (
									<SafetyCertificateFilled style={{ fontSize: '35px', color: '#52c41a' }} />
								) : (
									<LoadingOutlined style={{ fontSize: '25px' }} />
								)}
								{currentStep === _.size(_.get(verificationDetails, 'steps')) ? (
									<Typography.Link
										href={`https://ropsten.etherscan.io/tx/${_.get(chainDetails, 'sourceId')}`}
										target='_blank'
									>
										View Public Blockchain Proof
									</Typography.Link>
								) : (
									'Verifiying ...'
								)}
							</Space>
						</Card>
					</Col>
					<Col>
						<Steps direction='vertical' size='small' current={currentStep} style={{ maxWidth: '300px' }}>
							{_.map(_.get(verificationDetails, 'steps', []), (eachStep: any) => (
								<Steps.Step title={eachStep.title} description={eachStep.desc}></Steps.Step>
							))}
						</Steps>
					</Col>
				</Row>
			</Modal>
		</Spin>
	);
};

export default VerificationModal;
