import { InboxOutlined } from '@ant-design/icons';
import { Card, Table, Tabs } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
import CustomLayout from '../CustomLayout';
import CertificateVerification from './CertificateValidation';
import Reports from '../../Components/Reports';

import { registeredVerifiers, verifiedRecords } from './Column';
import _ from 'lodash';

const Verification = (props: any) => {
	const { labels } = props;
	return (
		<CustomLayout>
			<Card title='Verification'>
				<Tabs defaultActiveKey='1'>
					<Tabs.TabPane tab={_.get(labels, 'Verify', '')} key='1'>
						<Dragger
							multiple={false}
							// beforeUpload={convertXmlToJson}
						>
							<p className='ant-upload-drag-icon'>
								<InboxOutlined />
							</p>
							<p className='ant-upload-text'>Click or drag file to this area to verify</p>
						</Dragger>
					</Tabs.TabPane>
					<Tabs.TabPane tab={_.get(labels, 'Verifications', '')} key='2'>
						<Table
							className='table-header-styling'
							dataSource={[]}
							columns={verifiedRecords}
							pagination={false}
							size='middle'
							// rowKey={(record) => record.role_id}
						></Table>
					</Tabs.TabPane>
					<Tabs.TabPane tab={_.get(labels, 'Registered Verifiers', '')} key='3'>
						<Table
							className='table-header-styling'
							dataSource={[]}
							columns={registeredVerifiers}
							pagination={false}
							size='middle'
							// rowKey={(record) => record.role_id}
						></Table>
					</Tabs.TabPane>
				</Tabs>
			</Card>
		</CustomLayout>
	);
};

export default Verification;
