import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Divider, Popconfirm, Switch, Input, Select, Button, Message, Row, Col, Icon, Alert } from 'antd';
import OrderCollectionsPage from '../components/OrderCollectionsPage';
import { getDiff } from '../utils/mini_utils';
import styles from './DataTable.css';
const { Option } = Select;

export default class DataTable extends React.Component {
	constructor(props) {
    	super(props);
    	console.log("propsc", props);
		this.state = {
			...props,
			key: '__none',
			value: ''
		}
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickCreate = this.handleClickCreate.bind(this);
		this.handleSwitchchange = this.handleSwitchchange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.selectHandleChange = this.selectHandleChange.bind(this);
		this.inputHandleChange = this.inputHandleChange.bind(this);
		this.handleInputClick = this.handleInputClick.bind(this);
		this.pageSizeHandleChange = this.pageSizeHandleChange.bind(this);
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
		dispatch({
			type: model + '/readData'
		});
	}
	handleClickCreate(e) {
		const { dispatch, model } = this.props;
		dispatch({
			type: model + '/createData',
			order_sn: parseInt(Math.random() * 1000000, 10)
		});
		dispatch({
			type: model + '/readData'
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
	handleInputClick() {
		console.log("this.state", this.state);
		const { dispatch, model } = this.props;
		//查询第一页
		this.state.currentPage = 1;
		const { key, value, pageSize, currentPage: page } = this.state;
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
	shouldComponentUpdate(nextProps, nextState) {
		//获取DIFF
		const diffProps = getDiff(nextProps, this.props);
		const diffState = getDiff(nextState, this.state);
		//不重新渲染条件
		const result = diffState.length === 1 && diffState[0] === "pageSize";

		// console.log("diffProps is", diffProps, "nextProps is ", this.props);
		// console.log("diffState is", diffState, "nextState is ", this.state);

		// console.log("不重新渲染条件", result);
		if(result)
		  return false;
		else
		  return true;
	}
	render() {
		const _that = this;
		const { dataList, columnMatch, dispatch, count, loading, model, order_status, pay_status, totalWidth, actionWidth, alertMessage, currentPage: page } = this.props;
		const { pageSize, key, value } = this.state;

		//表头
		const columns = [];
		for(const key in columnMatch)
		{
			if(columnMatch[key][1] === true)
			{
				switch(columnMatch[key][5])
				{
					case 'varchar':
						columns.push({
							...columnMatch[key][4],
							title: columnMatch[key][0],
							dataIndex: key,
							key
						});
						break;
					case 'switch':
						columns.push({
							...columnMatch[key][4],
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
							...columnMatch[key][4],
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							render: (data, record) => {
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
					case 'order_status':
						columns.push({
							...columnMatch[key][4],
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
							...columnMatch[key][4],
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
							...columnMatch[key][4],
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
		  	return (
			    <div>
					<OrderCollectionsPage 
					  columnMatch={columnMatch}
					  dispatch={dispatch}
					  model={model}
					  editGoodsObj={record} 
					  handleInputChange={this.handleInputChange} 
					/>
					<Divider type="vertical" />
					<Popconfirm 
						title="删除后将不可恢复！"
						onConfirm={() => this.handleClickDelete(data)}
						okText={"确认"}	
						cancelText={"取消"}
					>
						<a>删除</a>
					</Popconfirm>
			    </div>
		  	)},
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
		return (
			<div>
				<Alert className={styles.alert} message={alertMessage} type="info" />
				<Row className={styles.operation}>
				    <Select defaultValue="__none" className={styles.key} onChange={this.selectHandleChange}>
				    	<Option value="__none">全部</Option>
				    	{Options}
				    </Select>
				    <Input type="text" className={styles.value} value={value} placeholder={holder} onChange={this.inputHandleChange} disabled={key === "__none"} />
				    <Select defaultValue="10" className={styles.pageSize} onChange={this.pageSizeHandleChange}>
				    	<Option value={7}>7</Option>
				    	<Option value={15}>15</Option>
				    	<Option value={20}>20</Option>
				    	<Option value={25}>25</Option>
				    	<Option value={100}>100</Option>
				    </Select>
				    <Button className={styles.search} type="primary" onClick={this.handleInputClick}>查询</Button>
				    <Button className={styles.create} type="primary" onClick={this.handleClickCreate}><Icon type="plus"></Icon>添加</Button>
			    </Row>


				<Spin spinning={loading}>
					<Table 
						rowClassName={styles.row}
						scroll={{ x: totalWidth + actionWidth }}
						columns={columns} 
						dataSource={dataList} 
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
				</Spin>
			</div>
		)
	}
}