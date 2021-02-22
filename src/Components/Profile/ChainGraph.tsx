import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Card, Dropdown, Select } from 'antd';

// @ts-ignore
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class ChainGraph extends PureComponent<any> {
	state = { term: 'week' };

	recordsPerPerBatchInChain = {
		columns: [
			['Position 2', 40, 40, 40, 40, 40],
			['Position 1', 50, 50, 50, 50, 50],
			['Position 3', 30, 30, 30, 30, 30],
		],
		type: 'bar',
		colors: {
			'Position 1': '#d3adf7',
			'Position 2': '#9254de',
		},
		labels: {
			format: {
				'Position 1': () => '1',
				'Position 2': () => '2',
				'Position 3': () => '3',
			},
		},
	};

	render() {
		const axis = {
			x: {
				type: 'category',
				categories: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6', 'Group 7'],
			},
			y: {
				max: 100,
				padding: { top: 0, bottom: 0 },
			},
		};

		return (
			<Card size='small' title='Class Toppers' className='card-border hide-y-axis' loading={this.props.loading}>
				<C3Chart data={this.recordsPerPerBatchInChain} axis={axis} />
			</Card>
		);
	}
}

export default ChainGraph;
