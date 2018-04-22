import React from 'react';
import { connect } from 'dva';
import styles from './Goods.css';
import { Row, Col, Button } from 'antd';
import Cube from '../components/Cube';
import CategoryCollectionsPage from '../components/CategoryCollectionsPage';
import GoodsCollectionsPage from '../components/GoodsCollectionsPage';
import MultiImgUploader from '../components/mini_components/MultiImgUploader';
import RichText from '../components/mini_components/RichText';
import config from '../config';


class Goods extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			firstCategoryModelVisible: false,
			firstCategoryModelConfirmLoading: false,
			toggleEditor: false
		}
		this.handleTopCategoryClick = this.handleTopCategoryClick.bind(this);
		this.handleFirstCategoryClick = this.handleFirstCategoryClick.bind(this);
		this.handleGoodsClick = this.handleGoodsClick.bind(this);
		this.handleAddTopCategory = this.handleAddTopCategory.bind(this);
		this.handleAddFirstCategory = this.handleAddFirstCategory.bind(this);
		this.handleAddGoods = this.handleAddGoods.bind(this);
		this.handleGalleryRemove = this.handleGalleryRemove.bind(this);
		this.handleDescSave = this.handleDescSave.bind(this);
		this.handleToggleEditor = this.handleToggleEditor.bind(this);
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
		// 清空商品描述
		this.props.dispatch({
			type: 'goods/clearGoodsDesc'
		});
	}
	handleFirstCategoryClick(event) {
		const first_category_focus_id = event.currentTarget.dataset.first_category_focus_id;
		// 拉取商品信息
		this.props.dispatch({
			type: 'goods/getGoodsByFirstCategory',
			firstCategoryFocusId: first_category_focus_id,
			clearGoodsFocusId: true
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
		// 清空商品描述
		this.props.dispatch({
			type: 'goods/clearGoodsDesc'
		});
	}
	handleGoodsClick(event) {
		const goods_focus_id = event.currentTarget.dataset.goods_focus_id;
		// 拉取商品展示图
		this.props.dispatch({
			type: 'goods/getGalleryByGood',
			goodsFocusId: goods_focus_id
		});
	}
	handleAddTopCategory() {
		this.props.dispatch({
			type: 'goods/addTopCategory'
		})
	}
	handleAddFirstCategory() {
		const { topCategoryFocusId } = this.props.goods;
		this.props.dispatch({
			type: 'goods/addFirstCategory',
			topCategoryFocusId
		})
	}
	handleAddGoods() {
		const { firstCategoryFocusId } = this.props.goods;
		this.props.dispatch({
			type: 'goods/addGoods',
			firstCategoryFocusId
		})
	}
	handleGalleryRemove(event) {
		const { status, uid } = event;
		if(status === "removed")
			this.props.dispatch({
				type: 'goods/deleteGallery',
				galleryId: uid
			});
	}
	handleDescSave(richText) {
		const _that = this;
		const { goodsFocusId, firstCategoryFocusId } = this.props.goods;
		this.props.dispatch({
			type: 'goods/postGoodsValues',
			values: {
				id: goodsFocusId,
				goods_desc: richText
			}
		})
			_that.props.dispatch({
				type: 'goods/getGoodsByFirstCategory',
				firstCategoryFocusId,
				clearGoodsFocusId: false
			});
		
	    this.setState({
			toggleEditor: !this.state.toggleEditor
		});
	}
	handleToggleEditor() {
		this.setState({
			toggleEditor: !this.state.toggleEditor
		})
	}
	render() {
		console.log("props of Goods: ", this.props);
	    const { goods_desc, topCategoryFocusId, firstCategory, galleryList, goodsFocusId } = this.props.goods;
	     // alert(goods_desc);
		// 当前一级分类数组
		const firstCategory_now = firstCategory.filter((item) => {
		  return item.parent_id === parseInt(topCategoryFocusId, 10);
	    });
		// 商品轮播图
		const gallery_fileList = [];
		galleryList.forEach((item, index) => {
			gallery_fileList.push({
		      uid: item.id,
		      name: 'img_url',
		      status: 'done',
		      url: item.img_url
		    });
		});
		//商品描述
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
								{item.name}
								<CategoryCollectionsPage {...this.props} categoryId={item.id} />
							</Col>
						);
					})
				}
				<Button onClick={this.handleAddTopCategory}>
					添加
				</Button>
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
								{item.name}
								<CategoryCollectionsPage {...this.props} categoryId={item.id} />
							</Col>
						);
					})
				}
				<Button onClick={this.handleAddFirstCategory}>
					添加
				</Button>
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
								{item.name}
								<GoodsCollectionsPage {...this.props} goodsId={item.id} />
							</Col>
						);
					})
				}
				<Button onClick={this.handleAddGoods}>
					添加
				</Button>
				</Row>
				{/* 展示图列表 */}
				<Row type="flex" justify="middle">
				<div className={"ostro_picWall"}>
					<MultiImgUploader
						{...this.props}
						action={config.host + "/goods/addGallery?column=img_url&goodsId=" + goodsFocusId}
						value={gallery_fileList} 
						max={50} 
						handleRemove={this.handleGalleryRemove}
					/>
				</div>
				{/*
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
				*/}
				</Row>
				{/* 商品描述 */}
				<Row type="flex" justify="middle">
				{/*
					<Col className={styles.category_col}>
						<div dangerouslySetInnerHTML={{ __html: goods_desc }} />
					</Col>
				*/}
				
				{
					typeof goods_desc === "string" || typeof goods_desc === "object"
					?
					!this.state.toggleEditor
					?
					<div className={styles.goods_desc_box}>
						<button onClick={this.handleToggleEditor}>{this.state.toggleEditor?"取消":"编辑"}</button>
						<Col className={styles.category_col}>
							<div dangerouslySetInnerHTML={{ __html: goods_desc }} />
						</Col>
					</div>
					:
					<div className={styles.goods_desc_box}>
						<button onClick={this.handleToggleEditor}>{this.state.toggleEditor?"取消":"编辑"}</button>
						<RichText 
							onSave={this.handleDescSave} 
							richText={goods_desc} 
						/>
					</div>
					:
					null
				}
				</Row>
			</div>
		);
	}
}
export default connect(({ goods }) => ({ goods }))(Goods);
