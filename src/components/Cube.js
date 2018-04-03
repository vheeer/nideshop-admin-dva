import React from 'react';
import {  } from 'antd';
import styles from './Cube.css';
export default class Cube extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		};
	}
	render() {
		const { topCategoryFocusId, firstCategoryFocusId, goodsFocusId } = this.props;
		let cube;
		if(topCategoryFocusId){
			cube = (
				<div data-top_category_focus_id={topCategoryFocusId} className={styles.cube_box}  onClick={this.props.handleOnClick}>
		    		<img src={this.props.src} />
		    	</div>
		    );
		}else if(firstCategoryFocusId){
			cube = (
				<div data-first_category_focus_id={firstCategoryFocusId} className={styles.cube_box}  onClick={this.props.handleOnClick}>
		    		<img src={this.props.src} />
		    	</div>
		    );
		}else if(goodsFocusId){
			cube = (
				<div data-goods_focus_id={goodsFocusId} className={styles.cube_box}  onClick={this.props.handleOnClick}>
		    		<img src={this.props.src} />
		    	</div>
		    );
		}else{
			cube = (
				<div className={styles.cube_box}  onClick={this.props.handleOnClick}>
		    		<img src={this.props.src} />
		    	</div>
		    );
		}
		
		return cube;
	}
}