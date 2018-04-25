import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Divider, Icon, Popconfirm, Button, Switch } from 'antd';
import styles from './Frame.css';
import OrderCollectionsPage from '../components/OrderCollectionsPage'

export default class DataTable extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			
		}
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickCreate = this.handleClickCreate.bind(this);
		this.handleSwitchchange = this.handleSwitchchange.bind(this);
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
			type: model + '/createData'
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
	render() {
		const _that = this;
		const { dataList, columnMatch, dispatch, count, pageSize, loading, model } = this.props;
		const columns = [];
		const dataSource = [];

		//表头
		for(const key in columnMatch)
		{
			if(columnMatch[key][1] === true)
			{
				switch(columnMatch[key][5])
				{
					case 'varchar':
						columns.push({
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							...columnMatch[key][4]
						});
						break;
					case 'switch':
						columns.push({
							title: columnMatch[key][0],
							dataIndex: key,
							key,
							...columnMatch[key][4],
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
			      <OrderCollectionsPage {...this.props} dataId={data.id} />
			      <Divider type="vertical" />
			      <Popconfirm 
			      	title="删除后将不可恢复！"
			       	onConfirm={() => this.handleClickDelete(data)}
			       	okText={"确认"}	
			       	cancelText={"取消"}
			      >
		          	<a
			          type="primary" 
			          size="small"
			          data-goods_id={this.props.goodsId} 
			          onClick={this.showModal}
			          href={"javascript:void(0);"}
			        >
			          删除
			        </a>
		          </Popconfirm>
			    </div>
		  	)},
		});

		return (
			<div>
				<button onClick={this.handleClickCreate}>添加</button>
				<Spin spinning={loading}>
					<Table 
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