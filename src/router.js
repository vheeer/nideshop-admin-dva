import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import Frame from './components/Frame';
import Curd from './routes/Curd';
import Goods from './routes/Goods';
import Login from './routes/Login';
import Order from './routes/Order';
import Topic from './routes/Topic';
import Others from './routes/Others';
import menuConfig from './menuConfig.json';
import IndexPage from './routes/IndexPage';

const ingore_model = [ "goods", "order", "others" ]; //过滤模型
const routes = [];
menuConfig.forEach(firstPath => {
	const { href: href_1, children } = firstPath;
	if(children)
		children.forEach(secondPath => {
			const { href: href_2, model } = secondPath;
			// 过滤指定模型
			if(ingore_model.indexOf(model) > -1)
				return false;
			routes.push((
				<Route key={href_1 + href_2} path={href_2.substr(1)} exact component={Curd(model)} />
			));
		});
});
// 添加指定路由
routes.unshift((<Route key={"/goods/list"} path="/goods/list" exact component={Goods} />));
routes.unshift((<Route key={"/login"} path="/login" exact component={Login} />));
routes.unshift((<Route key={"/order/list"} path="/order/list" exact component={Order} />));
// routes.unshift((<Route key={"/topic/list"} path="/topic/list" exact component={Topic} />)); 
routes.unshift((<Route key={"/others/others"} path="/others/others" exact component={Others} />));

let WrapFrame = connect(({ page, account }) => ({
  page, 
  account
}))(Frame);
function RouterConfig({ history }) {
	console.log("routes", routes);
  return (
    <Router history={history}>
		<Switch>
			<WrapFrame>
		   		<Route path="/" exact component={IndexPage} />
		   		{routes}
			</WrapFrame>
		</Switch>
    </Router>
  );
}

export default RouterConfig;
