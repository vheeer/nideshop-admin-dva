import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import Frame from './components/Frame';
import Curd from './routes/Curd';

import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Register from './routes/Register';
import ChangePSD from './routes/ChangePSD';
import Goods from './routes/Goods';

/*
import Order from './routes/Order';
import Brand from './routes/Brand';
import Topic from './routes/Topic';
import User from './routes/User';
*/

let WrapFrame = connect(({ page, account }) => ({
  page, 
  account
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

		   		<Route path="/shop/brand" exact component={Curd("brand")} />
		   		<Route path="/shop/topic" exact component={Curd("topic")} />

		   		<Route path="/order/list" exact component={Curd("order")} />

		   		<Route path="/vip/list" exact component={Curd("user")} />

			</WrapFrame>
		</Switch>
    </Router>
  );
}

export default RouterConfig;
