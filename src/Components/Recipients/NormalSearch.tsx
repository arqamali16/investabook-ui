import { Col, Row, Input, Button } from 'antd';
import React from 'react';

const { Search } = Input;

const NormalSearch = (props: any) => {
	const { changeActiveKey, showAdvanceSearch, closeAll, handleSearch, searchLoading } = props;

	const handleAdSearch = () => {
		showAdvanceSearch(true);
		changeActiveKey('1');
	};

	return (
		<Row>
			<Col>
				<Search
					placeholder='Search Recipient by Enrolled ID or Name'
					enterButton
					className='advance-search'
					onFocus={() => changeActiveKey('1')}
					onSearch={handleSearch}
					loading={searchLoading}
				/>
			</Col>
			<Col>
				<Button type='link' onClick={handleAdSearch}>
					Advance Search
				</Button>
			</Col>
			<Col>
				<Button type='link' onClick={closeAll}>
					Close
				</Button>
			</Col>
		</Row>
	);
};

export default NormalSearch;
