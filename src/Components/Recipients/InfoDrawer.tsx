import React, { Component } from 'react';
import { Card, Col, Descriptions, Divider, Drawer, Row, Space } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { IdcardTwoTone, PhoneTwoTone } from '@ant-design/icons';

class InfoDrawer extends Component<any> {
	render() {
		const { visible, content, onClose } = this.props;
		return (
			<Drawer
				visible={visible}
				width={500}
				title={`${_.get(content, 'name.en', '')} (${_.get(content, 'enrolled_id', '')})`}
				onClose={onClose}
			>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Card
							title='Contact'
							size='small'
							className='recipient-info'
							extra={<PhoneTwoTone style={{ fontSize: '20px' }} />}
						>
							<Descriptions bordered column={1} size='small'>
								{_.map(_.get(content, 'contact', []), (each, index) => (
									<Descriptions.Item label={_.upperFirst(each.contact_type)}>
										{each.contact_value}
									</Descriptions.Item>
								))}
							</Descriptions>
						</Card>
					</Col>
				</Row>

				<Divider>Identity</Divider>
				<Row gutter={[16, 16]}>
					{_.map(_.get(content, 'identification', []), (each, index) => (
						<Col span={24}>
							<Card
								title={_.upperFirst(each.id_type)}
								size='small'
								className='recipient-info'
								extra={<IdcardTwoTone style={{ fontSize: '20px' }} />}
							>
								<Descriptions bordered column={1} size='small'>
									<Descriptions.Item label='Number'>{each.id_number}</Descriptions.Item>
									<Descriptions.Item label='Validity'>
										{moment(each.valid_from).format('DD-MM-YYYY')} to
										{moment(each.valid_to).format('DD-MM-YYYY')}
									</Descriptions.Item>
									<Descriptions.Item label='Issue Authority'>
										{each.issue_authority}
									</Descriptions.Item>
									<Descriptions.Item label='Issue Place'>{each.issue_place}</Descriptions.Item>
								</Descriptions>
							</Card>
						</Col>
					))}
				</Row>
			</Drawer>
		);
	}
}

export default InfoDrawer;
