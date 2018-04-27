import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Divider, Popconfirm, Switch } from 'antd';
import OrderCollectionsPage from '../components/OrderCollectionsPage';
import styles from './DataTable.css';

export default class DataTable extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			...props
		}
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickCreate = this.handleClickCreate.bind(this);
		this.handleSwitchchange = this.handleSwitchchange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
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
	render() {
		const _that = this;
		const { dataList, columnMatch, dispatch, count, pageSize, loading, model, order_status, pay_status } = this.props;
		const columns = [];

		//表头
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
									<img src={data} width={50} alt={record.nickname} />
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

		return (
			<div>
				{/*<button onClick={this.handleClickCreate}>添加</button>*/}
				<Spin spinning={loading}>
					<Table 
						rowClassName={styles.row}
						scroll={{ x: 5000 }}
						columns={columns} 
						dataSource={dataList} 
						pagination={{
							total: count,
							pageSize,
							onChange: (page, pageSize) => {
								dispatch({
									type: model + '/readData',
							        page
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