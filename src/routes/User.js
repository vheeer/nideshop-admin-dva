
import { connect } from 'dva';
import styles from './IndexPage.css';
import DataTable from '../components/DataTable';

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
			      {...this.props.user}
			      model={"user"}
			      dispatch={dispatch}
		      />
		    </div>
	    )
	}
}
export default connect(({ user }) => ({ user }))(User);
