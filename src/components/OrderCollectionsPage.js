import React from 'react';
import { Button, Form, Input, Modal, InputNumber } from 'antd';
import SingleImgUploader from './mini_components/SingleImgUploader';
import MySwitch from './mini_components/MySwitch';
import styles from './GoodsCollectionsPage.css';
import { boolToNum, numToBool } from '../utils/mini_utils';
import config from '../config';

const { TextArea } = Input;
const FormItem = Form.Item;
const globalData = {};

const GoodsCollectionCreateForm = Form.create({
  onFieldsChange(props, changedFields) {

  },
  mapPropsToFields(props) {
  	const goodsList = props.dataList;
    const { dataId: editGoodsId, columnMatch, dispatch, count, pageSize, loading, model } = props;

    /*** 获取正在编辑的商品对象 ***/
  	let editGoodsObj = null;
  	goodsList.forEach((item) => {
  		if(item.id === parseInt(editGoodsId, 10)) {
  			editGoodsObj = item;
  		}
  	});
  	editGoodsObj = editGoodsObj || {};
    globalData.editGoodsObj = editGoodsObj;

    /*** 表单值生成 ***/
    //填值函数
    const KV = (key, value) => {
      fieldsObj[key] = Form.createFormField({
        value: value
      });
    }
    const fieldsObj = {};
    for(const key in editGoodsObj)
    {
      //跳过字段
      if(columnMatch[key][3] === false)
        continue;
      //默认字段值
      switch(columnMatch[key][2])
      {
        case "varchar":
          KV(key, editGoodsObj[key]);
          break;
        case "varchar required":
          KV(key, editGoodsObj[key]);
          break;
        case "money":
          KV(key, editGoodsObj[key]);
          break;
        default:
          break;
      }
    }
    
    return fieldsObj;
    
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(
  class extends React.Component {
  	constructor(props){
  		super(props);
      this.state = {

      };
  	}
    render() {
      const { goodsId, visible, onCancel, onCreate, form, columnMatch } = this.props;
      const { getFieldDecorator } = form;
      const { editGoodsObj } = globalData;

      /*** 表单结构生成 ***/
      const fieldsHTML = [];
      for(const key in editGoodsObj)
      {
        //id字段
        if(key === "id")
        {
          fieldsHTML.push((
            <FormItem
              key={key}
              label={columnMatch[key][0]}
            >
              {getFieldDecorator(key, {
                rules: [{ required: true, message: '' }],
              })(
                <Input disabled />
              )}
            </FormItem>
          ));
          continue;
        }
        //指定字段
        if(key && 0)
        {
          continue;
        }
        //跳过字段
        if(columnMatch[key][3] === false)
          continue;
        //默认字段类型
        switch(columnMatch[key][2])
        {
          //默认
          case "varchar":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: false, message: '' }],
                })(
                  <Input />
                )}
              </FormItem>
            ));
          break;
          case "varchar required":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: true, message: '' }],
                })(
                  <Input />
                )}
              </FormItem>
            ));  
          case "money":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: false, message: '请输入价格' }],
                })(
                  <InputNumber
                    min={0.00}
                    max={5000.00}
                    formatter={value => "￥" + parseFloat(value).toFixed(2)}
                    parser={value => parseFloat(value.split('￥')[1]?value.split('￥')[1]:0.00)}
                  />
                )}
              </FormItem>
            ));  
        }
      }

      return (
        <Modal
          visible={visible}
          title="编辑记录"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          className={styles.modal}
        >
          <Form layout="vertical">
            {
              fieldsHTML
            }
          </Form>
        </Modal>
      );
    }
  }
);

export default class GoodsCollectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			visible: false,
			editGoodsId: null
		};
	}
  showModal = (event) => {
  	const editGoodsId = event.currentTarget.dataset.goods_id;
    this.setState({
    	visible: true,
    	editGoodsId
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const props = this.formRef.props;
    const form = props.form;
    const { dataId: editGoodsId, columnMatch, dispatch, count, pageSize, loading, model, currentPage } = props;
    form.validateFields((err, values) => {
      if(err){
        return;
      }
      //提取修改过的表单域
      const newValues = Object.assign({}, values);
      for(let key in values)
      {
      	if(key === "id")
      		continue;
      	if(!form.isFieldTouched(key))
      		delete newValues[key];
      }
      //提交修改的信息
      if(Object.keys(newValues).length > 1) {
        dispatch(Object.assign({ type: model + '/updateData' }, newValues));
      }
      //重新拉取信息
      dispatch({
        type: model + '/readData',
        page: currentPage
      })

      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <span>
        <a
          type="primary" 
          size="small"
          data-goods_id={this.props.goodsId} 
          onClick={this.showModal}
          href={"javascript:void(0);"}
        >
          编辑
        </a>
        <GoodsCollectionCreateForm
          {...this.props}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          editGoodsId={this.state.editGoodsId}
        />
      </span>
    );
  }
}