import React, { PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';
import _ from 'lodash';
import { Avatar, Col, Descriptions, Drawer, Row, Timeline, Typography } from 'antd';
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';
import Process from '../../Common/ProcessFlow';
import moment from 'moment';

class CurrentProcess extends PureComponent<any> {
	render() {
		const { visible, steps, onClose } = this.props;
		const { data, initiated, processFollowed, groupId, createdDate } = steps;
		return (
			<Drawer visible={visible} onClose={onClose} width={400}>
				<Descriptions column={1} bordered style={{ marginTop: '50px' }} size='small'>
					<Descriptions.Item label='Group ID' key='Group Name'>
						{groupId}
					</Descriptions.Item>
					<Descriptions.Item label='Created Date' key='Created Date'>
						{createdDate}
					</Descriptions.Item>
				</Descriptions>
				{initiated ? (
					<Timeline style={{ marginTop: '100px', marginLeft: '100px' }}>
						{_.map(data, (each, index: number) => (
							<QueueAnim delay={(index * 4 + 10) * 200} className='queue-simple'>
								<Timeline.Item
									key={index}
									dot={
										each.done ? (
											<CheckCircleFilled style={{ color: 'green', fontSize: '30px' }} />
										) : (
											<LoadingOutlined />
										)
									}
									position='left'
								>
									<Row>
										<Col span={24}>
											<Typography.Text strong>{each.title}</Typography.Text>
										</Col>
										{each.done ? (
											<React.Fragment>
												<Col span={24}>
													<Typography.Text>
														<Typography.Text strong>by: </Typography.Text>
														{each.by}
													</Typography.Text>
												</Col>
												<Col span={24}>
													<Typography.Text>
														<Typography.Text strong>on: </Typography.Text>
														{moment(each.date).format('DD-MM-YYYY')}
													</Typography.Text>
												</Col>
												<Col span={24}>
													<Typography.Text>
														<Typography.Text strong>remark: </Typography.Text>
														{each.remark}
													</Typography.Text>
												</Col>
											</React.Fragment>
										) : (
											<Typography.Text>Pending ...</Typography.Text>
										)}
									</Row>
								</Timeline.Item>
							</QueueAnim>
						))}
					</Timeline>
				) : (
					<Timeline mode='left' style={{ marginTop: '100px', marginLeft: '100px' }}>
						<QueueAnim delay={200} className='queue-simple'>
							<Timeline.Item
								key={1}
								dot={<Avatar style={{ backgroundColor: '#1890ff' }}>1</Avatar>}
								position='left'
							>
								<p>
									<text>
										Credential preparation by<br></br>
										<strong>{_.get(processFollowed, 'creator.role_name', '')}</strong>
									</text>
								</p>
							</Timeline.Item>
						</QueueAnim>
						{_.map(processFollowed.process, (each, index: number) => (
							<QueueAnim delay={200 * (index + 2)} className='queue-simple'>
								<Timeline.Item
									key={index + 2}
									dot={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 2}</Avatar>}
									position='left'
								>
									<p>
										<text>
											Credential process (<strong>{each.action}</strong>) by <br></br>
											<strong>{_.get(each, 'auditor.role_name')}</strong>
										</text>
									</p>
								</Timeline.Item>
							</QueueAnim>
						))}
						<QueueAnim delay={200 * (_.size(processFollowed.process) + 2)} className='queue-simple'>
							<Timeline.Item
								key={_.size(processFollowed.process) + 2}
								dot={
									<Avatar style={{ backgroundColor: '#1890ff' }}>
										{_.size(processFollowed.process) + 2}
									</Avatar>
								}
								position='left'
							>
								<p>
									Publishing credential by{' '}
									<strong>{_.get(processFollowed, 'publisher.role_name', '')}</strong>
								</p>
							</Timeline.Item>
						</QueueAnim>
					</Timeline>
				)}
			</Drawer>
		);
	}
}

export default CurrentProcess;
