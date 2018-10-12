import react from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import DataTable from '../components/DataTable';

class Brand extends react.Component {
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
			      {...this.props.brand}
			      model={"brand"}
			      dispatch={dispatch}
		      />
		    </div>
	    )
	}
}
export default connect(({ brand }) => ({ brand }))(Brand);
