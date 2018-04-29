import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import DataTable from '../components/DataTable';

class Order extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			
		}
	}
  	render() {
  		const { dispatch } = this.props;
	  	return(
		    <div className={styles.normal}>
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
