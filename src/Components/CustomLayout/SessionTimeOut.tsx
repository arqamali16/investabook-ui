import React from 'react';
import { Button, Result } from 'antd';
import LoginSvg from '../../assests/Login.svg';

const SessionTimeOut = (props: any) => {
	const { logout } = props;
	return (
		<Result
			title='Oops! Session expired, Please login again.'
			extra={
				<Button type='primary' onClick={logout}>
					Login
				</Button>
			}
			icon={<img src={LoginSvg}></img>}
		/>
	);
};

export default SessionTimeOut;
