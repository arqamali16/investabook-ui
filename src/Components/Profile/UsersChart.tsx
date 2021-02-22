import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Card, Dropdown, Select } from 'antd';

// @ts-ignore
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import moment from 'moment';

class UsersChart extends PureComponent<any> {
	state = { term: 'week' };

	enrollementsPastDays = () => {
		const dates = _.map(_.get(this.props.data, 'column', []), (each) => moment(each).format('MMM Do'));
		return {
			x: 'x',
			columns: [
				['x', ...dates],
				['Shahada Users', ..._.get(this.props.data, 'data', [])],
			],
			type: 'bar',
			types: {
				'Shahada Users': 'area',
			},
			colors: {
				'Shahada Users': '#13c2c2',
			},
		};
	};

	enrollementsPastMonths = () => {
		let dates = _.map(_.get(this.props.data, 'column', []), (each, index) => ({
			date: each,
			value: _.get(this.props.data, ['data', index]),
		}));

		dates = [...dates, { date: '2020-10-12T20:00:00.000Z', value: 12 }];

		let grouped_items = _.groupBy(dates, (b) => moment(b.date).startOf('month').format('MMM YYYY'));

		_.values(grouped_items).forEach((arr) => arr.sort((a, b) => moment(a.date).day() - moment(b.date).day()));

		const monthData = _.map(_.keys(grouped_items), (each) => {
			const values = _.map(_.get(grouped_items, [each]), (eachValue) => _.toNumber(eachValue.value));
			const total = _.reduce(values, (sum, n) => sum + n, 0);
			return {
				month: each,
				total,
			};
		});
		return {
			x: 'x',
			columns: [
				['x', ..._.map(monthData, (each) => each.month)],
				['Shahada Users', ..._.map(monthData, (each) => each.total)],
			],
			type: 'bar',
			types: {
				'Shahada Users': 'area',
			},
			colors: {
				'Shahada Users': '#13c2c2',
			},
		};
	};

	axis = {
		x: {
			type: 'category',
		},
	};

	getColumnsForTerm = (): any => {
		switch (this.state.term) {
			case 'week':
				return this.enrollementsPastDays();
			case 'year':
				return this.enrollementsPastMonths();
		}
	};

	render() {
		return (
			<Card
				size='small'
				title={this.props.title}
				loading={this.props.loading}
				extra={
					<Select size='small' value={this.state.term} onChange={(value) => this.setState({ term: value })}>
						<Select.Option value='week' key='week'>
							Past Days
						</Select.Option>
						<Select.Option value='year' key='year'>
							Past Months
						</Select.Option>
					</Select>
				}
			>
				<C3Chart data={this.getColumnsForTerm()} axis={this.axis} />
			</Card>
		);
	}
}

export default UsersChart;
