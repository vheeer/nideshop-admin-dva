import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { header, content } from 'antd';

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
	  	return(
		    <div className={styles.normal}>
		      <header className={styles.title}>this is dashboard title</header>
		      <content>this is dashboard content</content>

		      <div><h1 onClick={this.handleClick}>测试</h1></div>
		    </div>
	    )
	}

}


export default connect()(Order);
