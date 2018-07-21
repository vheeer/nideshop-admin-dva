import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import DataTable from '../components/OtherTable';

class User extends React.Component {
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
			      {...this.props.others}
			      model={"others"}
			      dispatch={dispatch}
		      />
		    </div>
	    )
	}
}
export default connect(({ others }) => ({ others }))(User);
