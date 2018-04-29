import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import Frame from './components/Frame';

import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Register from './routes/Register';
import ChangePSD from './routes/ChangePSD';
import Goods from './routes/Goods';
import Order from './routes/Order';

let WrapFrame = connect(({ page, user }) => ({
  page, 
  user
}))(Frame);
function RouterConfig({ history }) {
  return (
    <Router history={history}>
		<Switch>
			<WrapFrame>
		   		<Route path="/" exact component={IndexPage} />
		   		<Route path="/login" exact component={Login} />
		   		<Route path="/register" exact component={Register} />
		   		<Route path="/changePSD" exact component={ChangePSD} />

		   		<Route path="/goods/list" exact component={Goods} />

		   		<Route path="/order/list" exact component={Order} />
			</WrapFrame>
		</Switch>
    </Router>
  );
}

export default RouterConfig;
