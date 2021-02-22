import React, { useState } from 'react';
import _ from 'lodash';
import { useActions, useValues } from 'kea';

import CustomTable from '../../Common/Table';
import { getGroupListColumns } from './Columns';
import RecordsLogics from '../../Logics/recordLogic';
import DrawerDecription from '../../Common/DrawerDescription';
import Template from './TemplatePreview';

const AllRecords = () => {
	const values = useValues(RecordsLogics);
	const actions = useActions(RecordsLogics);
	const { records } = values;

	const [showAllRecords, setAllRecords] = useState({});
	const [templateVisible, showTemplate] = useState(false);
	const [defaultRecord, setDefaultRecord] = useState(_.first(records));

	const passingFunction = (selectedRecord: any) => {
		setAllRecords(selectedRecord);
	};

	return (
		<React.Fragment>
			<CustomTable
				size='small'
				pagination={{
					pageSize: 25,
					showQuickJumper: true,
					size: 'small',
				}}
				className='table-header-styling'
				rowKey={(record: any) => record.record_id}
				dataSource={_.get(values, 'records')}
				columns={getGroupListColumns(values, actions, passingFunction, showTemplate, setDefaultRecord)}
				scroll={{ y: 480, x: 400 }}
			/>
			{!_.isEmpty(showAllRecords) && (
				<DrawerDecription
					descriptionArray={records}
					defaultIndex={_.findIndex(records, ['enrolled_id', _.get(showAllRecords, 'enrolled_id')])}
					visible={!_.isEmpty(showAllRecords)}
					onClose={() => setAllRecords({})}
				/>
			)}
			{templateVisible && (
				<Template
					visible={templateVisible}
					recordData={records}
					defaultRecord={defaultRecord}
					onClose={() => showTemplate(false)}
				/>
			)}
		</React.Fragment>
	);
};

export default AllRecords;
