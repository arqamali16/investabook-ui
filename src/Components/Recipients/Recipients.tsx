import { ContactsFilled, IdcardFilled, IdcardOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Form, Row, Space, Table, Tabs, Tooltip } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import CustomLayout from '../CustomLayout';
import MultiForm from './RecipientFrom';
import InfoDrawer from './InfoDrawer';
import AdvanceSearch from './AdvanceSearch';
import RecipientDetails from '../../assests/recipientDetails.png';
import { useActions } from 'kea';
import NormalSearch from './NormalSearch';

const { TabPane } = Tabs;

const Recipients = (props: any) => {
	const { recipientPermissions, recipientsLoading, recipientInfo, actions, labels } = props;
	const { showInformation, clearRecipientInfo, searchRecipients } = actions;
	const { canAddRecipient } = recipientPermissions;

	const [activeKey, changeActiveKey] = useState('1');
	const [searchBarVisible, showSearchBar] = useState(false);
	const [advanceSearchVisible, showAdvanceSearch] = useState(false);
	const [searchVisible, showSearch] = useState(false);

	const recipientsColumns: any = [
		{
			title: '#',
			dataIndex: _.toUpper(_.get(labels, 'Group ID', '')),
			key: 'unique_group_id',
			align: 'center',
			width: 50,
			render: (value: any, record: any, index: number) => index + 1,
		},
		{
			title: _.toUpper(_.get(labels, 'Enrolled Id', '')),
			dataIndex: 'enrolled_id',
			key: 'enrolled_id',
		},
		{
			title: 'NAME',
			dataIndex: 'name',
			key: 'name',
			render: (name: object) => _.get(name, 'en'),
		},
		{
			title: _.toUpper(_.get(labels, 'Public Key', 'Shahada Id')),
			dataIndex: 'public_key',
			key: 'public_key',
		},
		{
			title: _.toUpper(_.get(labels, 'Created By', '')),
			dataIndex: 'created_by',
			key: 'created_by',
			width: 120,
		},
		{
			title: _.toUpper(_.get(labels, 'Created Timestamp', '')),
			dataIndex: 'created_at',
			key: 'created_at',
			width: 120,
			sorter: (a: any, b: any) => moment(a.created_at).isBefore(b.created_at),
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},
		{
			title: _.toUpper(_.get(labels, 'Modified By', '')),
			dataIndex: 'modified_by',
			key: 'modified_by',
			width: 120,
		},
		{
			title: _.toUpper(_.get(labels, 'Modified Timestamp', '')),
			dataIndex: 'modified_at',
			key: 'modified_at',
			width: 120,
			render: (date: string) => moment(date).format('DD/MM/YYYY hh:mm A'),
		},

		{
			title: 'MORE DETAILS',
			dataIndex: 'identification',
			key: 'identification',
			width: 200,
			align: 'center',
			render: (contact: object, data: any) => {
				return <IdcardOutlined style={{ fontSize: '30px' }} onClick={() => showInformation(data)} />;
			},
		},
	];

	const handleSearch = (value: any) => {
		searchRecipients(value, advanceSearchVisible);
	};

	const closeAll = () => {
		showSearch(false);
		showAdvanceSearch(false);
	};

	return (
		<CustomLayout loading={recipientsLoading}>
			<Card
				className='main-card-border'
				title={_.get(labels, 'Recipients', '')}
				extra={
					searchVisible ? (
						<React.Fragment>
							{!advanceSearchVisible && (
								<NormalSearch
									changeActiveKey={changeActiveKey}
									showAdvanceSearch={showAdvanceSearch}
									closeAll={closeAll}
									handleSearch={handleSearch}
									// searchLoading={searchLoading}
								/>
							)}
						</React.Fragment>
					) : (
						<SearchOutlined onClick={() => showSearch(true)} />
					)
				}
			>
				<Tabs defaultActiveKey='1' activeKey={activeKey} onChange={changeActiveKey}>
					<TabPane tab={_.get(labels, 'Recipients', '')} key='1'>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								{advanceSearchVisible && (
									<AdvanceSearch close={closeAll} searchRecipients={searchRecipients} />
								)}
							</Col>
							<Col span={24}>
								<Table
									size='middle'
									className='table-header-styling'
									dataSource={props.recipients}
									columns={recipientsColumns}
									scroll={{ y: 440, x: 400 }}
									pagination={{
										pageSize: 25,
										showQuickJumper: true,
										size: 'small',
									}}
								></Table>
							</Col>
						</Row>
					</TabPane>
					{canAddRecipient && (
						<TabPane tab={_.get(labels, 'Add Recipients', '')} key='2'>
							<MultiForm addRecipient={props.actions.addRecipient} labels={labels} />
						</TabPane>
					)}
				</Tabs>
			</Card>
			<InfoDrawer content={recipientInfo} onClose={clearRecipientInfo} visible={!_.isEmpty(recipientInfo)} />
		</CustomLayout>
	);
};

export default Recipients;
