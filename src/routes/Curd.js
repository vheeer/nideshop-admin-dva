import react from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import DataTable from '../components/DataTable';

export default model => connect(
	//纯函数
	function(x) {
		let obj = {};
			obj[model] = x[model];
		return obj
	}
)(
	class extends react.Component {
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
				      {...this.props[model]}
				      others={this.props.others}
			      	  {...this.props['others']}
				      model={model}
				      dispatch={dispatch}
			      />
			    </div>
		    )
		}
	}
);
