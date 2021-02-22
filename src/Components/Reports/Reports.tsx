import React, { PureComponent } from 'react';
import { Card, Tabs } from 'antd';
import _ from 'lodash';
import Group from './BatchedRecords';
import CustomLayout from '../CustomLayout';
import Analytics from './Analytics';

import ReportLogic from '../../Logics/reportsLogic';
import { useActions, useValues } from 'kea';
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons';

const Reports = () => {
	const { closeReports, timeOut } = useActions(ReportLogic);
	const { selectedGroup } = useValues(ReportLogic);

	return (
		<CustomLayout timeOut={timeOut}>
			<Card title='Analytics'>
				{_.isEmpty(selectedGroup) ? (
					<Group />
				) : (
					<Card
						style={{ maxHeight: '670px', overflow: 'scroll' }}
						title={`Group - ${_.get(selectedGroup, 'unique_group_id', '')}`}
						extra={<ArrowLeftOutlined style={{ fontSize: '22px' }} onClick={() => closeReports()} />}
					>
						<Analytics />
					</Card>
				)}
			</Card>
		</CustomLayout>
	);
};

export default Reports;
