import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Table, Spin, Divider, Popconfirm, Switch, Input, Select, Button, Message, Row, Icon, Alert } from 'antd';
import OrderCollectionsPage from './OrderCollectionsPage';
import Excel from './mini_components/Excel';
=======
import { Table, Spin, Divider, Popconfirm, Switch, Input, Select, Button, Message, Row, Icon, Alert, Tag } from 'antd';
import OrderCollectionsPage from '../components/OrderCollectionsPage';
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
import { getDiff } from '../utils/mini_utils';
import styles from './DataTable.css';
const { Option } = Select;

export default class DataTable extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			...props,
			key: '__none',
			value: '',
<<<<<<< HEAD
			is_column: false,
			selectedRows: []
		}

	    // 如果没有others，则稍后获取
	    setTimeout(() => {
		    if(props.others.dataList.length === 0){
		      props.dispatch({
		        type: 'others/readData'
		      });
		    }
	    },400);

=======
			is_column: false
		}
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickCreate = this.handleClickCreate.bind(this);
		this.handleSwitchchange = this.handleSwitchchange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.selectHandleChange = this.selectHandleChange.bind(this);
		this.inputHandleChange = this.inputHandleChange.bind(this);
		this.handleInputClick = this.handleInputClick.bind(this);
		this.pageSizeHandleChange = this.pageSizeHandleChange.bind(this);
		this.switchData = this.switchData.bind(this);
		this.switchColumn = this.switchColumn.bind(this);
		this.confirmSend = this.confirmSend.bind(this);
		this.handleClickAccept = this.handleClickAccept.bind(this);
	}
	static propTypes = {
		columnMatch: PropTypes.object.isRequired,
		dataList: PropTypes.array.isRequired
	}
	handleClickEdit(e) {
		console.log(e.target);
	}
	handleClickDelete({ id }) {
		const { dispatch, model } = this.props;
		dispatch({
			type: model + '/deleteData',
			id
		});
	}
	handleClickCreate(e) {
		const { dispatch, model } = this.props;
		dispatch({
			type: model + '/createData',
			order_sn: parseInt(Math.random() * 1000000, 10)
		});
	}
	handleSwitchchange(e, record, key, data) {
		const { dispatch, model } = this.props;
		const { id } = record;

		const dispatchObj = {
			type: model + '/updateData',
			id
		};
		dispatchObj[key] = e === false?0:1;

		dispatch(dispatchObj);
	}
	handleInputChange(values, editGoodsObj) {
		// const newValues = Object.assign(editGoodsObj, values);
		// this.setState(newValues);
	}
	selectHandleChange(key) {
		const setObj = {};
		setObj.key = key;
		setObj.value = "";
		this.setState(setObj);
	}
	inputHandleChange(e) {
		const { value } = e.target;
		this.setState({
			value
		});
	}
	switchData(e) {
		this.setState({
			is_column: false
		});
	}
	switchColumn(e) {
		const { dispatch, model } = this.props;
		this.setState({
			is_column: true
		});
		dispatch({
			type: model + '/readColumn'
		});
	}
	handleInputClick() {
		const { model } = this.props;
		//查询第一页
		const page = 1;
		this.setState({ currentPage: page });
		const { key, value, pageSize } = this.state;
		if(value === "" && key !== "__none")
			return Message.warning("请填写查询内容");
		if(key !== "__none")
			this.props.dispatch({
	          type: model + '/readData',
	          key,
	          value,
	          pageSize,
	          page
	        });
		else
			this.props.dispatch({
	          type: model + '/readData',
	          pageSize,
	          page
	      	});
	}
	pageSizeHandleChange(pageSize) {
		this.setState({
			pageSize
		});
	}
	confirmSend(e, record) {
		const { id } = record;
		console.log(record);	
		const { dispatch } = this.props;
		dispatch({
			type: "order/shipped",
			id
		})
	}
	handleClickAccept(record) {
		const { id } = record;
		console.log(record);	
		const { dispatch } = this.props;
		dispatch({
<<<<<<< HEAD
			type: "order/accept",
=======
			type: "distribute_apply/accept",
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
			id
		})
	}
	refuseRefund(e, record) {
		const { id } = record;
		const { dispatch } = this.props;
		dispatch({
			type: "order/refuseRefund",
			id,
			order_status: 300
		})
	}
	shouldComponentUpdate(nextProps, nextState) {
		//获取DIFF
		const diffState = getDiff(nextState, this.state);
		//不重新渲染条件
		const result = diffState.length === 1 && diffState[0] === "pageSize";
		if(result)
		  return false;
		else
		  return true;
	}
<<<<<<< HEAD
	handleCantPrint() {
		Message.warning("请选择要打印的订单");
	}
	render() {
		const _that = this;
		const { dataList, columnMatch, dispatch, count, loading, model, order_status, pay_status, totalWidth, actionWidth, alertMessage, currentPage: page, column_dataList, others } = this.props;
		const { pageSize, key, value, is_column, selectedRows } = this.state;
		// 防报错others
	    let _others;
	    if(others.dataList[0]){
	      _others = others.dataList[0];
	    }else{
	      _others = {
	        default_country_text: {},
	        default_province_text: {},
	        default_city_text: {},
	        default_district_text: {}
	      };
	    }
	    console.log("_otherss", _others);
	    let print_data = [];
	    selectedRows.forEach(orderData => {
		    const { order_sn, consignee, address, mobile, postscript, province_text, city_text, district_text, postscript_consignor } = orderData;
			const { default_consignor, default_address, default_contact, default_postscript_consignor, default_province_text, default_city_text, default_district_text } = _others;
		    // 发货运单
		    const shipping_message = {
		      consignor: default_consignor,
		      shipping_address: default_province_text["name"] + " " + default_city_text["name"] + " " + default_district_text["name"],
		      shipping_address_desc: default_address,
		      shipping_mobile: default_contact,
		      shipping_postscript: postscript_consignor?postscript_consignor:default_postscript_consignor
		    };
		    // 收货运单
		    const deliver_message = {
		      consignee,
		      deliver_address: province_text["name"] + " " + city_text["name"] + " " + district_text["name"],
		      deliver_address_desc: address,
		      deliver_mobile: mobile,
		      deliver_postscript: postscript
		    };
		    // 打印运单
		    const print_data_single = {
		      order_sn,
		      deliver_province_text: province_text["name"],
		      deliver_city_text: city_text["name"],
		      deliver_district_text: district_text["name"],
		      deliver_address_all: deliver_message["deliver_address"] + " " + address,
		      deliver_telephone: "",
		      shipping_telephone: "",
		      ...shipping_message,
		      ...deliver_message
		     };
		     print_data.push(print_data_single);
		});
=======
	render() {
		const _that = this;
		const { dataList, columnMatch, dispatch, count, loading, model, order_status, pay_status, totalWidth, actionWidth, alertMessage, currentPage: page, column_dataList } = this.props;
		const { pageSize, key, value, is_column } = this.state;
    	console.log("props of DataTable: ", this.props);

>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
    	/* 详细数据 */
    	//查询到的字段列表
    	let keys = [];
    	if(dataList && dataList.length !== 0)
    		keys = Object.keys(dataList[0]);
		//表头
		const columns = [];
		for(const key of keys)
		{
			//字段对应表中有相应的字段,且显示
			if(columnMatch[key][1] === true)
			{
				switch(columnMatch[key][2])
				{
					case 'varchar':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key
						});
						break;
					case 'gender':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								return (
									<span>{data?"男":"女"}</span>
								)
							}
						});
						break;
					case 'switch':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								return (
									<Switch 
										defaultChecked={data === 1?true:false} 
										onChange={
											((record, key, data) =>
												e => _that.handleSwitchchange(e, record, key, data)
											)(record, key, data)
										}
									></Switch>
								)
							}
						});
						break;
					case 'avatar':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								if(!data || data === "")
									data = "https://www.yinmudianying.club/nideshop/files/images/default.png";
								return (
									<img 
										src={data} 
										width={18} 
										alt={record.nickname}
										className={styles.avatar}
									/>
								)
							}
						});
						break;
					case 'image':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								return (
									<div className={styles.image_box}>
										<img 
											src={data} 
											alt={columnMatch[key][0]}
											className={styles.image}
										/>
									</div>
								)
							}
						});
						break;
					case 'order_status':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								const statusText = order_status(data);
								return (
									<span>{ statusText }</span>
								)
							}
						});
						break;
					case 'pay_status':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								const statusText = pay_status(data);
								return (
									<span>{ statusText }</span>
								)
							}
						});
						break;
					case 'date_time':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data) => {
								let dataText = "";
								if(!data || data === "")
									dataText = "";
								else
									dataText = new Date(data * 1000).format("yyyy-MM-dd hh:mm:ss");
								return (
									<span>{dataText}</span>
								)
							}
						});
						break;
<<<<<<< HEAD
					case 'user':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								let src = "";
								if(!data)
									return null;
								if(!data["avatar"] || data["avatar"] === "")
									src = "https://www.yinmudianying.club/nideshop/files/images/default.png";
								else
									src = data["avatar"];
								return (
									<div>
										<img 
											src={src} 
											width={18} 
											alt={record.nickname}
											className={styles.avatar}
										/>
										<span>{data["nickname"]}</span>
									</div>
								)
							}
						});
						break;
					case 'region':
						columns.push({
							...columnMatch[key][5],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
								return (
									<span>{data["name"]}</span>
								)
							}
						});
						break;
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
					default:
						break;
				}
			}
		}
		//添加操作按钮
		columns.push({
		  title: '操作',
		  key: 'action',
		  fixed: 'right',
		  width: actionWidth,
		  render: (data, record) => {
<<<<<<< HEAD
		  	const { order_status, pay_status } = record;
		  	let buttons = null;
			const OrderGoods = require('./OrderGoods').default;
=======
		  	const { order_status, pay_status, shipping_status } = record;
		  	let buttons = null;
			const Order_goods = require('./Order_goods').default;
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
			const divider_1 = ( <Divider type="vertical" key="1" /> );
			const divider_2 = ( <Divider type="vertical" key="2" /> );
			const edit_btn = (
  				<OrderCollectionsPage 
  				  key="opera_1"
				  columnMatch={columnMatch}
				  dispatch={dispatch}
				  model={model}	
				  editGoodsObj={record} 
				  handleInputChange={this.handleInputChange} 
				  button_text="编辑"
				/>
			);
			const delete_btn = (
				<Popconfirm 
					key="opera_3"
					title="删除后将不可恢复！"
					onConfirm={() => this.handleClickDelete(data)}
					okText={"确认"}	
					cancelText={"取消"}
				>
					<a>删除</a>
				</Popconfirm>
			);
			const order_goods_btn = (	
<<<<<<< HEAD
				<OrderGoods
					{...record}	
					dispatch={dispatch}
					others={others}
=======
				<Order_goods
					{...record}	
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
					key="opera_4"
				/>
			);
			const opera = [ edit_btn, divider_1, delete_btn, divider_2, order_goods_btn ];

			switch(order_status)
			{
				case 0:
					break;
				case 101:
					break;
				case 201:
					buttons = (
		  				<div>
		  					{opera}
			  				<Popconfirm 
								title="此操作不可撤回，您确认要发货吗？"
								onConfirm={
									(record => 
										e => _that.confirmSend(e, record)
									)(record)
								}
								okText={"确认"}	
								cancelText={"取消"}
							>
	  							<Button className={styles.op_button} type="primary">
									发货
								</Button>
							</Popconfirm>
					    </div>
					);
					break;
				case 300:
					break;
				case 301:
					break;
				case 401:
					buttons = (
		  				<div>
		  					{opera}
			  				<Popconfirm 
								title="确认拒绝退款吗？"
								onConfirm={
									(record => 
										e => _that.refuseRefund(e, record)
									)(record)
								}
								okText={"确认"}	
								cancelText={"取消"}
							>
	  							<Button className={styles.op_button} type="primary">
									拒绝退款
								</Button>
							</Popconfirm>
					    </div>
					);
					break;
				case 403:
					break;
				default:
					break;
			}
				
	  			if(order_status === 201 && pay_status === 2)
		  			buttons = (
		  				<div>
		  					{opera}
			  				<Popconfirm 
								title="此操作不可撤回，您确认要发货吗？"
								onConfirm={
									(record => 
										e => _that.confirmSend(e, record)
									)(record)
								}
								okText={"确认"}	
								cancelText={"取消"}
							>
	  							<Button className={styles.op_button} type="primary">
									发货
								</Button>
							</Popconfirm>
					    </div>
					);
		  		else if(order_status === 301 && pay_status === 2)
		  			buttons = (
		  				<div>
		  					{opera}
		  					<Button className={styles.op_button} disabled>已收货</Button>
					    </div>
					);
		  		else if(order_status === 300 && pay_status === 2)
		  			buttons = (
		  				<div>
		  					{opera}
		  					<Button className={styles.op_button} disabled>已发货</Button>
					    </div>
					);
		  		else if(order_status === 0 && pay_status === 0)
		  			buttons = (
		  				<div>
		  					{opera}
		  					<Button className={styles.op_button} disabled>未付款</Button>
					    </div>
					);
		  		else if(order_status === 101 && pay_status === 0)
		  			buttons = (
		  				<div>
		  					{opera}
		  					<Button className={styles.op_button} disabled>已取消</Button>
					    </div>
					);
		  	return buttons;
		  },
		});
		//搜索框
		const Options = [];
		for(const key in columnMatch)
		{
			if(columnMatch[key][6])
				Options.push(
					<Option value={key} key={key}>
						{columnMatch[key][0]}
					</Option>
				);
		}
		//输入框占位符
		let holder = "";
		if(columnMatch[key])
			holder = "请输入" + columnMatch[key][0];

		/* 字段管理 */
		const column_columns = null;
<<<<<<< HEAD

	    // rowSelection object indicates the need for row selection
	    const rowSelection = {
	      onChange: (selectedRowKeys, selectedRows) => {
	      	this.setState({ selectedRows });
	        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	      },
	      getCheckboxProps: record => ({
	        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
	        // name: record.name,
	      }),
	    }
		
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
		return (
			<div>
				<Alert className={styles.alert} message={alertMessage} type="info" />
				<Row className={styles.operation}>
				    <Select defaultValue="__none" className={styles.key} onChange={this.selectHandleChange}>
				    	<Option value="__none">全部</Option>
				    	{Options}
				    </Select>
				    <Input type="text" className={styles.value} value={value} placeholder={holder} onChange={this.inputHandleChange} disabled={key === "__none"} />
				    <Select defaultValue="7" className={styles.pageSize} onChange={this.pageSizeHandleChange}>
				    	<Option value={7}>7</Option>
				    	<Option value={15}>15</Option>
				    	<Option value={20}>20</Option>
				    	<Option value={25}>25</Option>
				    	<Option value={100}>100</Option>
				    </Select>
				    <Button className={styles.search} type="primary" onClick={this.handleInputClick}>查询</Button>
<<<<<<< HEAD
					{
						selectedRows.length === 0
						?
						<Button type="primary" onClick={this.handleCantPrint}>批量打印</Button>
						:
						<Excel data={print_data} btn_ele={<Button type="primary">批量打印</Button>} />
					}
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
			    	<Button className={styles.create} type="primary" onClick={this.handleClickCreate}><Icon type="plus"></Icon>添加</Button>
				    <Button.Group size="middle">
				    	<Button className={""} type={is_column?"primary":""} onClick={this.switchColumn}><Icon type="database" />字段管理</Button>
				    	<Button className={""} type={is_column?"":"primary"} onClick={this.switchData}>详细数据<Icon type="database" /></Button>
			        </Button.Group>
			    </Row>


				<Spin spinning={loading}>
					{
						is_column
						?
						<Table 
							rowClassName={styles.row}
							columns={column_columns}
							dataSource={column_dataList}
<<<<<<< HEAD
							others={others}
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
							rowKey={ record => record.id }
						/>
						:
						<Table 
<<<<<<< HEAD
							rowSelection={rowSelection}
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
							rowClassName={styles.row}
							scroll={{ x: totalWidth + actionWidth }}
							columns={columns} 
							dataSource={dataList} 
<<<<<<< HEAD
							others={others}
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
							pagination={{
								total: count,
								pageSize,
								current: page,
								onChange: (page, pageSize) => {
									dispatch({
										type: model + '/readData',
								        page,
								        pageSize,
								        key: key === "__none"?undefined:key,
								        value: value === ""?undefined:value
									})
								}
							}}
							rowKey={ record => record.id }
						/>
					}
				</Spin>
			</div>
		)
	}
}