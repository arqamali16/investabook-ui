import React from 'react';
import _ from 'lodash';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ render: Component, path, ...rest }: any): any => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return localStorage.getItem('token') ? (
					<Component />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				);
			}}
		/>
	);
};

export default ProtectedRoute;
