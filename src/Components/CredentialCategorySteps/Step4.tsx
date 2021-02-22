import React, { PureComponent } from 'react';
import { Card, Col, Descriptions, Row } from 'antd';
import _ from 'lodash';
import Preview from './Preview';

class Step4 extends PureComponent<any> {
	render() {
		const { values, processList, credCategories } = this.props;
		return (
			<Card style={{ minHeight: '400px' }}>
				<Row>
					<Col span={12}>
						<Descriptions title='Certificate Preview' bordered column={1}>
							<Descriptions.Item label='Name'>{values.credDetails.name}</Descriptions.Item>
							<Descriptions.Item label='Description'>{values.credDetails.description}</Descriptions.Item>
							<Descriptions.Item label='Process Flow'>
								{_.get(_.find(processList, ['process_id', values.process_id]), 'name')}
							</Descriptions.Item>
						</Descriptions>
					</Col>
					<Col span={12}>
						<Preview values={values} />
					</Col>
				</Row>
			</Card>
		);
	}
}

export default Step4;
