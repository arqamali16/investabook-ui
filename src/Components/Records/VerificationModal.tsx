import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Card, Col, Modal, Row, Space, Spin, Steps, Typography } from 'antd';
import { LoadingOutlined, SafetyCertificateFilled } from '@ant-design/icons';

const VerificationModal = (props: any) => {
	const { modalVisible, showModal, verificationDetails, verifyLoading } = props;
	const [currentStep, setCurrentStep] = useState(0);

	const chainDetails = _.first(_.get(verificationDetails, 'txn', []));

	useEffect(() => {
		let stepsinterval: any;
		if (modalVisible && currentStep < _.size(_.get(verificationDetails, 'steps', [])))
			stepsinterval = setInterval(() => setCurrentStep(currentStep + 1), 1000);
		return () => {
			clearInterval(stepsinterval);
		};
	});

	return (
		<Modal
			visible={modalVisible}
			onCancel={() => showModal(false)}
			width={600}
			footer={null}
			title={`Verification - ${_.get(verificationDetails, 'recipient_name', '')}`}
		>
			<Spin spinning={verifyLoading}>
				<Row gutter={[16, 24]} justify='center' align='middle'>
					<Col span={24}>
						<Card className='chain-description' size='default'>
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
			</Spin>
		</Modal>
	);
};

export default VerificationModal;
