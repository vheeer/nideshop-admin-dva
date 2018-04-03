import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Register from './routes/Register';
import ChangePSD from './routes/ChangePSD';
import Goods from './routes/Goods';
import Frame from './components/Frame';
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
			</WrapFrame>
		</Switch>
    </Router>
  );
}

export default RouterConfig;
