/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * @description Menu Items
 */

import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter
} from "react-router-dom";


import Login from '../Login'
import Navigation from './Navigation'



const App = (props: any) => {
	const onLogin = (link: string) => {
		// this.props.history.push(path);
	}
	return (
		<Router>
			<Switch>
				<Route exact path="/" render={(routerProps) => <Login onSubmit={onLogin} {...routerProps} />} />
				<Route exact path='/home-tax' render={(routerProps) => <Navigation />} />
			</Switch>
		</Router>
	);
}


export default App