import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { header } from 'antd';
import DataTable from '../components/DataTable';

class Order extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {

		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		// this.props.dispatch({
		// 	type: 'order/test'
		// });
	}
  	render() {
  		const { dispatch } = this.props;
	  	return(
		    <div className={styles.normal}>
		      <header className={styles.title}>订单列表</header>
		      <DataTable
			      {...this.props.order}
			      model={"order"}
			      dispatch={dispatch}
		      />
		    </div>
	    )
	}
}


export default connect(({ order }) => ({ order }))(Order);
