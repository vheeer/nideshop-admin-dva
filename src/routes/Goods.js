import React from 'react';
import { connect } from 'dva';
import styles from './Goods.css';
import { header, content, Row, Col } from 'antd';
import Cube from '../components/Cube';

class Goods extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {

		}
		this.handleTopCategoryClick = this.handleTopCategoryClick.bind(this);
		this.handleFirstCategoryClick = this.handleFirstCategoryClick.bind(this);
		this.handleGoodsClick = this.handleGoodsClick.bind(this);
	}
	handleTopCategoryClick(event) {
		const top_category_focus_id = event.currentTarget.dataset.top_category_focus_id;
		//切换顶级分类焦点
		this.props.dispatch({
			type: 'goods/changeTopCategoryFoucs',
			topCategoryFocusId: top_category_focus_id
		});
		// 清空一级分类焦点
		this.props.dispatch({
			type: 'goods/changeFirstCategoryFoucs',
			firstCategoryFocusId: null
		});
		// 清空商品列表
		this.props.dispatch({
			type: 'goods/changeGoodsList',
			goodsList: []
		});
		// 清空商品焦点
		this.props.dispatch({
			type: 'goods/changeGoodsFoucs',
			goodsFocusId: null
		});
		// 清空商品展示图列表
		this.props.dispatch({
			type: 'goods/changeGalleryList',
			galleryList: []
		});
	}
	handleFirstCategoryClick(event) {
		const first_category_focus_id = event.currentTarget.dataset.first_category_focus_id;
		//拉取商品信息
		this.props.dispatch({
			type: 'goods/getGoodsByFirstCategory',
			firstCategoryFocusId: first_category_focus_id
		});
		//清空商品焦点
		this.props.dispatch({
			type: 'goods/changeGoodsFoucs',
			goodsFocusId: null
		});
		// 清空商品展示图列表
		this.props.dispatch({
			type: 'goods/changeGalleryList',
			galleryList: []
		});
	}
	handleGoodsClick(event) {
		const goods_focus_id = event.currentTarget.dataset.goods_focus_id;
		this.props.dispatch({
			type: 'goods/getGalleryByGood',
			GoodsFocusId: goods_focus_id
		});
	}
	render() {
		console.log("props of Goods: ", this.props);
		// 当前一级分类
		const firstCategory_now = this.props.goods.firstCategory.filter((item) => {
		  return item.parent_id === parseInt(this.props.goods.topCategoryFocusId);
	    });

		return (
			<div>
				{/* 顶级分类 */}
				<Row type="flex" justify="middle">
				{
					this.props.goods.topCategory.map((item, index) => {
						return (
							<Col key={item.id} className={styles.category_col}>
								<Cube
									handleOnClick={this.handleTopCategoryClick}
									src={item.img_url}
									topCategoryFocusId={item.id}
								>
								</Cube>
							</Col>
						);
					})
				}
				</Row>
				{/* 一级分类 */}
				<Row type="flex" justify="middle">
				{
					firstCategory_now.map((item, index) => {
						return (
							<Col key={item.id} className={styles.category_col}>
								<Cube
									handleOnClick={this.handleFirstCategoryClick}
									src={item.wap_banner_url}
									firstCategoryFocusId={item.id}
								>
								</Cube>
							</Col>
						);
					})
				}
				</Row>
				{/* 货物列表 */}
				<Row type="flex" justify="middle">
				{
					this.props.goods.goodsList.map((item, index) => {
						return (
							<Col key={item.id} className={styles.category_col}>
								<Cube
									handleOnClick={this.handleGoodsClick}
									src={item.list_pic_url}
									goodsFocusId={item.id}
								>
								</Cube>
							</Col>
						);
					})
				}
				</Row>
				{/* 展示图列表 */}
				<Row type="flex" justify="middle">
				{
					this.props.goods.galleryList.map((item, index) => {
						return (
							<Col key={item.id} className={styles.category_col}>
								<Cube
									src={item.img_url}
								>
								</Cube>
							</Col>
						);
					})
				}
				</Row>
			</div>
		);
	}
}
export default connect(({ goods }) => ({ goods }))(Goods);
