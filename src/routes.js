import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/register';
import Events from './pages/Events';
import TopNav from './components/TopNav';

import MyRegistrations from './pages/Myregistrations';

export default function Routes() {
	return (
		<BrowserRouter>
			<TopNav />
			<Switch>
				<Route exact path='/' component={Dashboard} />
				<Route exact path='/notifications' component={MyRegistrations}/>
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route path='/events' component={Events} />
			</Switch>
		</BrowserRouter>
	);
}
