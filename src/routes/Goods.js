import React from 'react';
import { connect } from 'dva';
import styles from './Goods.css';
import { Row, Col, Button, Alert, Input, Table } from 'antd';
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
			toggleEditor: false,
			goods_specification: []
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
		this.changeGoodsSpeValue = this.changeGoodsSpeValue.bind(this);
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
		// 拉取商品展示图、规格、描述
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
	changeGoodsSpeValue() {

	}
	render() {
		console.log("props of Goods: ", this.props);
	    const { goods_desc, topCategoryFocusId, firstCategory, galleryList, goodsFocusId } = this.props.goods;
	    // 规格
	    const { dataList: goods_specifications } = this.props.goods_specification;
	    const spes = [];
	    let lastId = null;
	    let tmp = {};
	    goods_specifications.forEach(goods_specification => {
	    	const { id, name } = goods_specification.specification;

	    	if (spes[spes.length - 1] && spes[spes.length - 1]['id'] === id) {
	    		spes[spes.length - 1]['values'].push(goods_specification.value)
	    	} else {
	    		spes.push({
	    			id,
	    			name,
	    			values: [
	    				goods_specification.value
	    			]
	    		})
	    	}
	    	lastId = id;
	    })
	    // 产品
	    const columns = spes.map(spe => {
	    	spe.title = spe.name;
	    	spe.dataIndex = spe.name;
	    	return spe;
	    });
	    let productData = [{
	    	'颜色': 1,
	    	'长度': 20
	    }];

	    let source = spes.slice(0);
	    if(source[0])
	    {
		    let result = [];
		    let i = 1;

			source[0]['values'].forEach(value => {
				let obj = {};
					obj[source[0]['name']] = value;
				result.push(obj)
			})

			console.log('result', result);

			function cloneArr(arr) {
				// const newArr = arr.slice(0);
				const newArr = arr.slice(0).map(item => {
					return Object.assign({}, item);
				})
				return newArr;
			}

		    function re(i) {
		    	const { values: vs_i, name } = source[i];
		    	let final_result = [];
		    	vs_i.forEach(v_i => {
		    		console.log('遍历新values')
		    		const new_result = cloneArr(result);
		    		new_result.forEach((item, index) => {
		    			console.log('遍历结果集', v_i);
		    			// item[name] = v_i;
		    			new_result[index][name] = v_i;
		    			console.log('结果', new_result[index][name]);
		    			console.log('结果', new_result[index]);
		    			console.log('结果', new_result);
		    		})
		    		final_result = [ ...final_result, ...new_result ]
		    		console.log('new_result', new_result)
		    	});
		    	console.log('final_result', final_result)
		    }
		    console.log('开始')
		    re(i);
		    console.log('结束')
		}

	    // [{ '颜色': 1 }, { '颜色': 2 }]

	    // [{ '颜色': 1 }, { '颜色': 2 }]
	    // [{ '颜色': 1 }, { '颜色': 2 }]

	    // [{ '颜色': 1, '尺寸': 1 }, { '颜色': 1, '尺寸': 2 }, { '颜色': 2, '尺寸': 1 }, { '颜色': 2, '尺寸': 2 }]

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
				<Alert className={styles.alert} message="顶级分类" type="info" />
				<Row type="flex" justify="middle">
				{
					this.props.goods.topCategory.map((item, index) => {
						return (
							<Col key={item.id} className={styles.category_col}>
								<Cube
									handleOnClick={this.handleTopCategoryClick}
									src={item.wap_banner_url}
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
				<Alert className={styles.alert} message="一级分类" type="info" />
				<Row type="flex" justify="middle">
				{
					firstCategory_now.map((item, index) => {
						return (
							<Col key={item.id} className={styles.category_col}>
								<Cube
									handleOnClick={this.handleFirstCategoryClick}
									src={item.icon_url}
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
				{/* 商品列表 */}
				<Alert className={styles.alert} message="商品列表" type="info" />
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
				<Alert className={styles.alert} message="商品轮播图" type="info" />
				{/* 商品展示图列表 */}
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

				{/* 商品SKU开始 */}
				<Alert className={styles.alert} message="商品规格" type="info" />
				<div className={styles.sku}>
					{/* 商品所有规格 */}
					<Row className={styles.goods_specification_item}>
						{
							spes.map((spe, index) => {
								const { id, name, values } = spe;
								return (
									<Col key={id} span={4}>
										<h3>{name}</h3>
										{
											values.map((value, index) => {
												console.log(value, index)
												return (
													<Row key={index}>
														<Col span={18}>
															<Input onChange={this.changeGoodsSpeValue} value={value} />
														</Col>
														<Col span={6}>
															<a href="javascript:(0)">删除</a>
														</Col>
													</Row>
												)
											})
										}
										<Button>添加规格值</Button>
									</Col>
								)
							})
						}
						<Col key="addSpe" span={4}>
							<Button>添加规格</Button>
						</Col>
					</Row>
				</div>
				{/* 商品SKU结束 */}

				{/* 产品开始 */}
				<Alert className={styles.alert} message="商品规格" type="info" />
				<Table columns={columns} dataSource={productData} />
				{/* 产品结束 */}

				{/* 商品描述 */}
				<Alert className={styles.alert} message="商品详情" type="info" />
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
						<Button type="primary" onClick={this.handleToggleEditor}>{this.state.toggleEditor?"取消":"编辑"}</Button>
						<Col className={styles.category_col}>
							<div dangerouslySetInnerHTML={{ __html: goods_desc }} />
						</Col>
					</div>
					:
					<div className={styles.goods_desc_box}>
						<Button type="primary" onClick={this.handleToggleEditor}>{this.state.toggleEditor?"取消":"编辑"}</Button>
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
export default connect(({ goods, specification, goods_specification, product }) => ({ goods, specification, goods_specification, product }))(Goods);
