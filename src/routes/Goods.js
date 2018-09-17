import React from 'react';
import { connect } from 'dva';
import styles from './Goods.css';
import { Row, Col, Button, Alert, Input, Table, Modal, Select, Popover } from 'antd';
import Cube from '../components/Cube';
import CategoryCollectionsPage from '../components/CategoryCollectionsPage';
import GoodsCollectionsPage from '../components/GoodsCollectionsPage';
import MultiImgUploader from '../components/mini_components/MultiImgUploader';
import RichText from '../components/mini_components/RichText';
import config from '../config';

const { Option } = Select;

function sequence(a, b) {
	return a - b;
}

class Goods extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			firstCategoryModelVisible: false,
			firstCategoryModelConfirmLoading: false,
			toggleEditor: false,
			goods_specification: [],
			skuFields: {},
			speFields: {},
			speModelVisible: false,
			selectSpe: null
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
		this.speModelOk = this.speModelOk.bind(this);
		this.speModelCancel = this.speModelCancel.bind(this);
		this.selectSpe = this.selectSpe.bind(this);
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
	changeSkuGoodsNumberInput(e, { id }, val, record, data) {
		console.log('value', e.target.value)
		console.log('id', id)
		console.log('val', val)
		console.log('record', record)
		console.log('data', data)

		const { skuFields } = this.state;
		if (!skuFields[id]) {
			skuFields[id] = {};
		}
		skuFields[id]['goods_number'] = e.target.value;
		this.setState({
			skuFields
		})
	}
	changeSkuPriceInput(e, { id }, val, record, data) {
		console.log('value', e.target.value)
		console.log('id', id)
		console.log('val', val)
		console.log('record', record)
		console.log('data', data)

		const { skuFields } = this.state;
		if (!skuFields[id]) {
			skuFields[id] = {};
		}
		skuFields[id]['retail_price'] = e.target.value;
		this.setState({
			skuFields
		})
	}
	handleSkuAdd(e, val, record, data) {
		console.log('value', e.target.value)
		console.log('val', val)
		console.log('record', record)
		console.log('data', data)
		const { dispatch, goods: { goodsFocusId } } = this.props;
		let goods_specification_ids = [];
		let { parseGoodsSpecifications } = this.state;
		Object.keys(record).forEach(key => {
			goods_specification_ids.push(parseGoodsSpecifications[key][record[key]]);
		})
		const goods_specification_ids_str = goods_specification_ids.sort(sequence).join('_');
		dispatch({
			type: 'product/createData',
			goods_id: goodsFocusId,
			goods_specification_ids: goods_specification_ids_str,
			need_flush: false,
			callback: function() {
				dispatch({
					type: 'product/readData',
			        pageSize: 999,
			        key: 'goods_id',
			        value: goodsFocusId
				})
			}
		})
	}
	handleSkuSave(e, { id }, val, record, data) {
		console.log('value', e.target.value)
		console.log('id', id)
		console.log('val', val)
		console.log('record', record)
		console.log('data', data)
		console.log(this.state.skuFields[id])
		const { dispatch } = this.props;
		dispatch({
			type: 'product/updateData',
			id,
			need_flush: false,
			...this.state.skuFields[id]
		})
	}
	addSpeValue(e, id) {
		const { dispatch, goods: { goodsFocusId } } = this.props;
		dispatch({
			type: 'goods_specification/createData',
			goods_id: goodsFocusId,
			specification_id: id,
			need_flush: false,
			value: '请输入',
			callback: function() {
				dispatch({
					type: 'goods_specification/readData',
			        pageSize: 999,
			        key: 'goods_id',
			        value: goodsFocusId
			    })
			}
		})
	}
	changeGoodsSpeValue(e, id) {
		console.log('value', e.target.value);
		const { speFields } = this.state;
		speFields[id] = e.target.value;
		this.state.speFields = speFields;
	}
	saveSpeValue(e, id) {
		console.log("id", id);
		const { dispatch, goods: { goodsFocusId } } = this.props;
		dispatch({
			type: 'goods_specification/updateData',
			id,
			value: this.state.speFields[id],
			need_flush: false,
			callback: function() {
				dispatch({
					type: 'goods_specification/readData',
			        pageSize: 999,
			        key: 'goods_id',
			        value: goodsFocusId
			    })
			}
		})
	}
	deleteSpeValue(e, id) {
		const { dispatch, goods: { goodsFocusId } } = this.props;
		dispatch({
			type: 'goods_specification/deleteData',
			id,
			need_flush: false,
			callback: function() {
				dispatch({
					type: 'goods_specification/readData',
			        pageSize: 999,
			        key: 'goods_id',
			        value: goodsFocusId
			    })
			}
		})
	}
	selectSpe(e) {
		console.log(e)
		this.setState({
			selectSpe: e
		})
	}
	addSpeKey(e) {
		const { dispatch, goods: { goodsFocusId } } = this.props;
		this.setState({
			speModelVisible: true
		})
	}
	speModelOk(e) {
		const { dispatch, goods: { goodsFocusId } } = this.props;
		const { selectSpe } = this.state;
		this.setState({
			speModelVisible: false
		})
		dispatch({
			type: 'goods_specification/createData',
			goods_id: goodsFocusId,
			specification_id: selectSpe,
			need_flush: false,
			value: '请输入',
			callback: function() {
				dispatch({
					type: 'goods_specification/readData',
			        pageSize: 999,
			        key: 'goods_id',
			        value: goodsFocusId
			    })
			}
		})
	}
	speModelCancel(e) {
		const { dispatch, goods: { goodsFocusId } } = this.props;
		this.setState({
			speModelVisible: false
		})
	}
	render() {
		const _this = this;
		console.log("props of Goods: ", this.props);
	    const { goods_desc, topCategoryFocusId, firstCategory, galleryList, goodsFocusId } = this.props.goods;
	    // 规格
	    const { dataList: specification } = this.props.specification;
	    const { dataList: goods_specifications } = this.props.goods_specification;
	    const { dataList: product } = this.props.product;
	    let parseProduct = {};
	    let parseGoodsSpecifications = {};
	    this.state.parseGoodsSpecifications = parseGoodsSpecifications;
	    product.forEach(item => {
	    	const goods_specification_ids_arr = item['goods_specification_ids'].split('_').sort(sequence);
	    	const goods_specification_ids_str = goods_specification_ids_arr.join('_');
	    	parseProduct[goods_specification_ids_str] = item;
	    })
	    const spes = [];
	    let lastId = null;
	    let columns = [];
	    let productData = [];
	    let data = [];
	    goods_specifications.forEach(goods_specification => {goods_specification.specification.name
	    	const { id, name } = goods_specification.specification;
	    	const obj = {};
	    	if (parseGoodsSpecifications[goods_specification.specification.name] === undefined) {
	    		parseGoodsSpecifications[goods_specification.specification.name] = {};
	    	}
	    	parseGoodsSpecifications[goods_specification.specification.name][goods_specification.value] = goods_specification.id;
	    	if (spes[spes.length - 1] && spes[spes.length - 1]['id'] === id) {
	    		spes[spes.length - 1]['values'].push({ value: goods_specification.value, id: goods_specification.id })
	    	} else {
	    		console.log('goods_specificationgoods_specificationgoods_specificationgoods_specification', goods_specification)
	    		spes.push({
	    			id,
	    			name,
	    			title: name,
		    		dataIndex: name,
		    		key: name,
	    			values: [
	    				{ value: goods_specification.value, id: goods_specification.id }
	    			]
	    		})
	    		data.push({
	    			title: name,
	    			dataIndex: name,
	    			key: name
	    		})
	    	}
	    	lastId = id;
	    })
	    console.log('spesspesspesspes', spes)
	    data.unshift({
	    	title: 'ID',
	    	dataIndex: 'id',
	    	key: 'id',
	    	render: (val, record) => {
	    		let goods_specification_ids = [];
	    		Object.keys(record).forEach(key => {
	    			goods_specification_ids.push(parseGoodsSpecifications[key][record[key]]);
	    		})
	    		const goods_specification_ids_str = goods_specification_ids.sort(sequence).join('_');
	    		if (parseProduct[goods_specification_ids_str]) {
	    			const { id } = parseProduct[goods_specification_ids_str];
	    			return id;
	    		} else {
	    			return '';
	    		}
	    	}
	    })
	    data.push({
	    	title: '库存',
	    	dataIndex: '库存',
	    	key: '库存',
	    	render: (val, record) => {
	    		let goods_specification_ids = [];
	    		Object.keys(record).forEach(key => {
	    			goods_specification_ids.push(parseGoodsSpecifications[key][record[key]]);
	    		})
	    		const goods_specification_ids_str = goods_specification_ids.sort(sequence).join('_');
	    		let id;
	    		if (parseProduct[goods_specification_ids_str]) {
	    			id = parseProduct[goods_specification_ids_str];
	    		}
	    		if (parseProduct[goods_specification_ids_str]) {
	    			const { goods_number } = parseProduct[goods_specification_ids_str];
	    			return <Input 
	    						defaultValue={goods_number} 
	    						className={styles.sku_input} 
	    						onChange={((record, data) =>
									e => _this.changeSkuGoodsNumberInput(e, id, val, record, data)
								)(id, val, record, data)}
							/>;
	    		} else {
	    			return '';
	    		}
	    	}
	    })				
	    data.push({
	    	title: '价格',
	    	dataIndex: '价格',
	    	key: '价格',
	    	render: (val, record) => {
	    		let goods_specification_ids = [];
	    		Object.keys(record).forEach(key => {
	    			goods_specification_ids.push(parseGoodsSpecifications[key][record[key]]);
	    		})
	    		const goods_specification_ids_str = goods_specification_ids.sort(sequence).join('_');
	    		let id;
	    		if (parseProduct[goods_specification_ids_str]) {
	    			id = parseProduct[goods_specification_ids_str];
	    		}
	    		if (parseProduct[goods_specification_ids_str]) {
	    			const { retail_price } = parseProduct[goods_specification_ids_str];
	    			return <Input 
	    						defaultValue={retail_price} 
	    						className={styles.sku_input} 
	    						onChange={((record, data) =>
									e => _this.changeSkuPriceInput(e, id, val, record, data)
								)(id, val, record, data)}
							/>;
	    		} else {
	    			return '';
	    		}
	    	}
	    })
	    data.push({
	    	title: '商品图',
	    	dataIndex: '商品图',
	    	key: '商品图',
	    	render: (val, record) => {
	    		let goods_specification_ids = [];
	    		Object.keys(record).forEach(key => {
	    			goods_specification_ids.push(parseGoodsSpecifications[key][record[key]]);
	    		})
	    		const goods_specification_ids_str = goods_specification_ids.sort(sequence).join('_');
	    		if (parseProduct[goods_specification_ids_str]) {
	    			const { img_url } = parseProduct[goods_specification_ids_str];
	    			return <Input defaultValue={img_url} className={styles.sku_input} onChange={null} />;
	    		} else {
	    			return '';
	    		}
	    	}
	    })
	    data.push({
	    	title: '编辑',
	    	dataIndex: 'edit',
	    	key: 'edit',
	    	render: (val, record, data) => {
				let goods_specification_ids = [];
	    		Object.keys(record).forEach(key => {
	    			goods_specification_ids.push(parseGoodsSpecifications[key][record[key]]);
	    		})
	    		const goods_specification_ids_str = goods_specification_ids.sort(sequence).join('_');
	    		let id;
	    		if (parseProduct[goods_specification_ids_str]) {
	    			id = parseProduct[goods_specification_ids_str];
	    		}
	    		let btn;
	    		if (!id) {
	    			btn = <Button
	    					type="primary"
    						onClick={((val, record, data) =>
								e => _this.handleSkuAdd(e, val, record, data)
							)(val, record, data)}
						>
							添加
						</Button>;
	    		} else {
    				btn = <Button
	    					type="primary"
    						onClick={((id, val, record, data) =>
								e => _this.handleSkuSave(e, id, val, record, data)
							)(id, val, record, data)}
						>
							保存
						</Button>;
	    		}
	    		return btn
	    	}
	    })
	    console.log('parseProduct', parseProduct);
	    console.log('parseGoodsSpecifications', parseGoodsSpecifications);
	    let source = spes.slice(0);
	    console.log('source', source)
	    if(source[0])
	    {
		    let result = [];
		    let i = 1;

			source[0]['values'].forEach(value => {
				let obj = {};
					obj[source[0]['name']] = value.value;
				result.push(obj)
			})

			console.log('result', result);

			function cloneArr(arr) {
				const newArr = arr.slice(0).map(item => {
					return Object.assign({}, item);
				})
				return newArr;
			}

		    function re(i, result) {
		    	if (!source[i]) {
		    		return result
		    	}
		    	const { values: vs_i, name } = source[i];
		    	let final_result = [];
		    	vs_i.forEach(v_i => {
		    		// console.log('遍历新values')
		    		const new_result = cloneArr(result);
		    		new_result.forEach((item, index) => {
		    			// console.log('遍历结果集', v_i);
		    			new_result[index][name] = v_i.value;
		    			// console.log('结果', new_result);
		    		})
		    		final_result = [ ...final_result, ...new_result ]
		    		// console.log('new_result', new_result)
		    	});
		    	// console.log('final_result', final_result)
		    	i = i + 1;
		    	return re(i, final_result)

		    }
		    console.log('开始')

		    let final_result;
		    // for (let i = 0;i < source.length;i++) {
		    	final_result = re(i, result);
		    	console.log('final_result is: ', final_result)
		    // }
		    console.log('结束')
		    // 产品
		    columns = data;
		    console.log('columns', columns)
		    productData = final_result;
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
								<Popover content={item.name} title="商品名称" placement="rightTop" trigger="hover">
									<Cube
										handleOnClick={this.handleGoodsClick}
										src={item.list_pic_url}
										goodsFocusId={item.id}
									>
									</Cube>
						            {item.name.substr(0, 6)}
						        </Popover>
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
												const { value: currentValue, id } = value;
												console.log('value --- index ---- id', currentValue, index, id)
												return (
													<Row key={index}>
														<Col span={18}>
															<Input 
																onChange={
																	((id) =>
																		e => _this.changeGoodsSpeValue(e, id)
																	)(id)
																}
																defaultValue={currentValue}
															/>
														</Col>
														<Col span={6}>
															<a href="javascript:(0)" onClick={
																((id) =>
																	e => _this.saveSpeValue(e, id)
																)(id)
															}>
																保存
															</a>
															<a href="javascript:(0)" onClick={
																((id) =>
																	e => _this.deleteSpeValue(e, id)
																)(id)
															}>
																删除
															</a>
														</Col>
													</Row>
												)
											})
										}
										<Button 
											onClick={
												((id) =>
													e => _this.addSpeValue(e, id)
												)(id)
											}
										>
											添加规格值
										</Button>
									</Col>
								)
							})
						}
						<Col key="addSpe" span={4}>
							<Button 
								onClick={
									(() =>
										e => _this.addSpeKey(e)
									)()
								}
							>
								添加规格
							</Button>
						</Col>
					</Row>
					<Modal
			          title="添加规格"
			          visible={this.state.speModelVisible}
			          onOk={this.speModelOk}
			          onCancel={this.speModelCancel}
			        >
				        <Select defaultValue={0} style={{ width: 120 }} onChange={this.selectSpe}>
				        	<Option value={0}>请选择</Option>
					        {
					        	specification.map(spe => 
									<Option key={spe.id} value={spe.id}>{spe.name}</Option>
					        	)
					        }
						</Select>
			        </Modal>
					{JSON.stringify(this.state.speFields)}
					<br/>---------<br/>
					{JSON.stringify(this.state.skuFields)}
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
