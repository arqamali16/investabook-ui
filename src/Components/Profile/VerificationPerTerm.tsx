import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Card, Select } from 'antd';

// @ts-ignore
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class RecordsPublished extends PureComponent<any, any> {
	state = { term: 'week' };

	verificarionsPerWeek = {
		columns: [['Records Verified', 300, 350, 400, 500, 700, 800]],
		types: {
			'Records Verified': 'area',
		},
	};

	verificationPerYear = {
		columns: [['Records Verified', 300, 350, 400, 500, 700, 800]],
		types: {
			'Records Verified': 'area',
		},
	};

	getColumnsForTerm = (): any => {
		switch (this.state.term) {
			case 'week':
				return this.verificarionsPerWeek;
			case 'year':
				return this.verificationPerYear;
		}
	};
	render() {
		const axis = {
			x: {
				type: 'category',
			},
		};

		return (
			<Card
				title={this.props.title}
				size='small'
				extra={
					<Select size='small' value={this.state.term} onChange={(value) => this.setState({ term: value })}>
						<Select.Option value='week' key='week'>
							Week
						</Select.Option>
						<Select.Option value='year' key='year'>
							Year
						</Select.Option>
					</Select>
				}
			>
				<C3Chart data={this.getColumnsForTerm()} axis={axis} />
			</Card>
		);
	}
}

export default RecordsPublished;
