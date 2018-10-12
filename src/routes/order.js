import react from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import DataTable from '../components/OrderTable';

class Order extends react.Component {
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
			      others={this.props.others}
			      model={"order"}
			      dispatch={dispatch}
		      />
		    </div>
	    )
	}
}
export default connect(({ order, others }) => ({ order, others }))(Order);
