import { PrinterFilled } from '@ant-design/icons/lib/icons';
import { Card, Col, Layout, Menu, Row, Space, Typography, Modal } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Template from '../CredentialCategorySteps/Preview';

const { Header, Content, Sider } = Layout;

const TemplatePreview = (props: any) => {
	const { recordData } = props;
	const [selectedRecord, setSelectedRecord]: any = useState(props.defaultRecord);

	return (
		<Modal
			visible={props.visible}
			onCancel={props.onClose}
			closable
			footer={false}
			width={1100}
			className='certificate-preview'
			title={`Credentials View - Group : ${_.get(selectedRecord, 'unique_group_id')}`}
		>
			<Layout>
				<Sider width={220} className='site-layout-background'>
					<Menu
						mode='inline'
						defaultSelectedKeys={[selectedRecord.enrolled_id]}
						style={{ height: '600px', borderRight: 0, overflow: 'scroll' }}
					>
						{_.map(recordData, (each) => (
							<Menu.Item
								onClick={() => setSelectedRecord(each)}
								style={{ height: '100px' }}
								key={each.enrolled_id}
							>
								<p style={{ fontSize: '12px', height: '5px' }}>
									<Typography.Text strong>Enroll ID: </Typography.Text>
									<Typography.Text>{_.get(each, 'enrolled_id')}</Typography.Text>
								</p>
								<p style={{ fontSize: '12px', height: '5px' }}>
									<Typography.Text strong>Name: </Typography.Text>
									<Typography.Text>{_.get(each, 'record_data.name.value')}</Typography.Text>
								</p>
								<p style={{ fontSize: '12px', height: '5px' }}>
									<Typography.Text strong>Credential Category: </Typography.Text>
									<Typography.Text>{_.get(each, 'category')}</Typography.Text>
								</p>
								<p style={{ fontSize: '12px', height: '5px' }}>
									<Typography.Text strong>Language: </Typography.Text>
									<Typography.Text>English</Typography.Text>
								</p>
							</Menu.Item>
						))}
					</Menu>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Content
						className='site-layout-background'
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						<Space
							direction='vertical'
							align='center'
							size='small'
							style={{ width: '100%', height: '100%' }}
							className='template-viewer'
						>
							{/* <PrinterFilled style={{ fontSize: '22px', height: '23px' }} /> */}
							<object
								type='application/pdf'
								width='100%'
								height='100%'
								data={`https://api.shahada.ae/expo/download/${_.get(selectedRecord, 'cert_id')}?q=${
									_.get(selectedRecord, 'unique_group_id') === 'GITEX 2020' ? 'gitex' : 'fbs'
								}#view=Fit`}
							></object>
						</Space>
					</Content>
				</Layout>
			</Layout>
		</Modal>
	);
};

export default TemplatePreview;
