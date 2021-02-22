import { WarningFilled } from '@ant-design/icons/lib/icons';
import { Alert } from 'antd';
import React, { Component } from 'react';

export default class ErrorPage extends Component {
	render() {
		return (
			<div>
				<Alert
					message="You don't have permission to access this module"
					description='Please ask admin for the permission'
					type='error'
					showIcon
					icon={<WarningFilled />}
				/>
			</div>
		);
	}
}
