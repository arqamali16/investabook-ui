import React, { PureComponent } from 'react';
import { Col, Modal, Row, Timeline, Typography } from 'antd';

const { Title } = Typography;

class CertificateVerification extends PureComponent {
	render() {
		return (
			<Modal visible={true} width={1000}>
				<Row>
					<Col span={8}>
						<Timeline>
							<Timeline.Item color='green'>
								<Title level={5}>Format Validation</Title>
								<p>Getting transaction ID</p>
								<p>Computing local hash</p>
								<p>Fetching remote hash</p>
								<p>Getting issuer profile</p>
								<p>Parsing issuer keys</p>
							</Timeline.Item>
							<Timeline.Item color='green'>
								<Title level={5}>Hash comparison</Title>
								<p>Comparing hashes</p>
								<p>Checking Merkle Root</p>
								<p>Checking Receipt</p>
							</Timeline.Item>
							<Timeline.Item color='green'>
								<Title level={5}>Status check</Title>
								<p>Checking Revoked Status</p>
								<p>Checking Authenticity</p>
								<p>Checking Expiration Date</p>
							</Timeline.Item>
						</Timeline>
					</Col>
					<Col span={16}>
						<iframe height='700px' width='600px' src=''></iframe>
					</Col>
				</Row>
			</Modal>
		);
	}
}

export default CertificateVerification;
