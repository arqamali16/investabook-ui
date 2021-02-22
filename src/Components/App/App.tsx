/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * @description Menu Items
 */

import React from 'react';
import { Switch, Route, BrowserRouter, Redirect, Link } from 'react-router-dom';
import _ from 'lodash';

import Login from '../Login';
import ProtectedRoute from '../../Components/ProtectedRoute';
import RestrictedRoute from '../../Components/RestrictedRoute';

import Credential from '../../Components/CredentialManagement';
import Settings from '../../Components/Settings';
import Users from '../../Components/Users';
import Roles from '../../Components/Roles';
import Records from '../../Components/Records';
import Recipients from '../../Components/Recipients/index';
import Process from '../../Components/ProcessManagement';
import Verification from '../../Components/Verification';
import Reports from '../../Components/Reports';
import Developer from '../../Components/Developer';

import VerifyModal from '../../Components/Verify';

import Profile from '../../Components/Profile';

const routeMapping = {
	Records: <Records />,
	Recipients: <Recipients />,
	Roles: <Roles />,
	Users: <Users />,
	Dashboard: <Profile />,
	Settings: <Settings />,
	'Process Management': <Process />,
	'Credential Management': <Credential />,
};

const App = (props: any) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/login' render={() => <Login />} />
				<Redirect exact from='/' to='/login' />
				{/* <Route exact path='/developer' render={() => <Developer />} />
				<Route exact path='/expo/verify/*' render={() => <VerifyModal />} /> */}
				<RestrictedRoute exact path='/dashboard' render={() => <Profile />} />
				<RestrictedRoute exact path='/settings' render={() => <Settings />} />
				<ProtectedRoute exact path='/roles' render={() => <Roles />} />
				<ProtectedRoute exact path='/users' render={() => <Users />} />
				<ProtectedRoute exact path='/records' render={() => <Records />} />
				<ProtectedRoute exact path='/recipients' render={() => <Recipients />} />
				<ProtectedRoute exact path='/process' render={() => <Process />} />
				<ProtectedRoute exact path='/credential' render={() => <Credential />} />
				<ProtectedRoute exact path='/verification' render={() => <Verification />} />
				<ProtectedRoute exact path='/analytics' render={() => <Reports />} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
