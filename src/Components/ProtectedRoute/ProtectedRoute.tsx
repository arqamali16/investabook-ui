import { useValues } from 'kea';
import React from 'react';
import _ from 'lodash';
import { Redirect, Route } from 'react-router-dom';
import ApiLogic from '../../Logics/ApiLogic';

const ProtectedRoute = ({ render: Component, path, ...rest }: any): any => {
	const stringRoute: any = localStorage.getItem('localRoute');
	const comparisonRoutes = JSON.parse(stringRoute);
	const currentLocation = _.last(_.split(window.location.href, window.location.origin));

	const isRestricted = _.find(comparisonRoutes, ['path', currentLocation]);

	return (
		<Route
			{...rest}
			render={(props) => {
				return localStorage.getItem('token') && isRestricted ? (
					<Component />
				) : (
					<Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
				);
			}}
		/>
	);
};

export default ProtectedRoute;
