import React from 'react';
import { Button, Form, Input, Modal, InputNumber, Popconfirm } from 'antd';
import SingleImgUploader from './mini_components/SingleImgUploader';
import MySwitch from './mini_components/MySwitch';
import styles from './GoodsCollectionsPage.css';
import { boolToNum, numToBool } from '../utils/mini_utils';
import config from '../config';

const { TextArea } = Input;
const FormItem = Form.Item;

const GoodsCollectionCreateForm = Form.create({
  onFieldsChange(props, changedFields) {

  },
  mapPropsToFields(props) {
  	const goodsList = props.goods.goodsList;
  	const { editGoodsId } = props;
    //获取正在编辑的商品对象
  	let editGoodsObj = null;
  	goodsList.forEach((item) => {
  		if(item.id === parseInt(editGoodsId, 10)) {
  			editGoodsObj = Object.assign({}, item);
  		}
  	});
  	editGoodsObj = editGoodsObj || {};
  	let { id, name, category_id, goods_unit, is_new, is_hot, is_on_sale, prima_pic_url, list_pic_url, goods_brief, goods_desc, brand_id, add_time, retail_price, extra_price, primary_product_id } = editGoodsObj;
    //prima图片
    let prima_pic_url_filelist = [{
      uid: -1,
      name: 'prima_pic_url',
      status: 'done',
      url: prima_pic_url
    }];
    //list_pic图片
    let list_pic_url_filelist = [{
      uid: -1,
      name: 'list_pic_url',
      status: 'done',
      url: list_pic_url
    }];
    //开关表单类型转换
    is_new = numToBool(editGoodsObj.is_new);
    is_hot = numToBool(editGoodsObj.is_hot);
    is_on_sale = numToBool(editGoodsObj.is_on_sale);
    return {
      id: Form.createFormField({
        value: id
      }),
      name: Form.createFormField({
        value: name
      }),
      category_id: Form.createFormField({
        value: category_id
      }),
      brand_id: Form.createFormField({
        value: brand_id
      }),
      add_time: Form.createFormField({
        value: add_time
      }),
      retail_price: Form.createFormField({
        value: retail_price
      }),
      goods_brief: Form.createFormField({
        value: goods_brief
      }),
      goods_desc: Form.createFormField({
        value: goods_desc
      }),
      goods_unit: Form.createFormField({
        value: goods_unit
      }),
      is_new: Form.createFormField({
        value: is_new
      }),
      is_hot: Form.createFormField({
        value: is_hot
      }),
      is_on_sale: Form.createFormField({
        value: is_on_sale
      }),
      prima_pic_url: Form.createFormField({
        value: prima_pic_url_filelist
      }),
      list_pic_url: Form.createFormField({
        value: list_pic_url_filelist
      }),
      extra_price: Form.createFormField({
        value: extra_price
      }),
      primary_product_id: Form.createFormField({
        value: primary_product_id
      })
    }
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
      const { goodsId, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="编辑商品"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          className={styles.modal}
        >
          <Form layout="vertical">
            <FormItem
  	          label="商品ID"
  	        >
  	          {getFieldDecorator('id', {
  	            rules: [{ required: false, message: '' }],
  	          })(
  	            <Input disabled />
  	          )}
  	        </FormItem>
            <FormItem
  	          label="商品名称"
  	        >
  	          {getFieldDecorator('name', {
  	            rules: [{ required: true, message: '请输入商品名称' }],
  	          })(
  	            <Input placeholder="请输入名称" />
  	          )}
  	        </FormItem>
            <FormItem
              label="商品分类"
            >
              {getFieldDecorator('category_id', {
                rules: [{ required: true, message: '请输入商品分类' }],
              })(
                <Input placeholder="请输入分类" />
              )}
            </FormItem>
            <FormItem
              label="品牌"
            >
              {getFieldDecorator('brand_id', {
                rules: [{ required: false, message: '请输入所属品牌' }],
              })(
                <Input placeholder="请输入品牌" />
              )}
            </FormItem>
            <FormItem
              label="商品简介"
            >
              {getFieldDecorator('goods_brief', {
                rules: [{ required: false, message: '请输入商品简介' }],
              })(
                <Input placeholder="请输入简介" />
              )}
            </FormItem>
            {
            <FormItem
              label="商品描述"
            >
              {getFieldDecorator('goods_desc', {  
                rules: [{ required: false, message: '请输入商品描述' }],
              })(
                <TextArea placeholder="请输入描述" />
              )}
            </FormItem>
            }
            {/*
            <FormItem
              label="默认产品ID"
            >
              {getFieldDecorator('primary_product_id', {
                rules: [{ required: false, message: '请输入默认产品ID' }],
              })(
                <Input placeholder="请输入描述" />
              )}
            </FormItem>
            */}
            <FormItem
              label="价格"
            >
              {getFieldDecorator('retail_price', {
                rules: [{ required: true, message: '请输入价格' }],
              })(
                <InputNumber
                  min={0.00}
                  max={15000.00}
                  formatter={value => "￥" + parseFloat(value).toFixed(2)}
                  parser={value => parseFloat(value.split('￥')[1]?value.split('￥')[1]:0.00)}
                />
              )}
            </FormItem>
            {/*
            <FormItem
              label="运费"
            >
              {getFieldDecorator('extra_price', {
                rules: [{ required: true, message: '请输入价格' }],
              })(
                <InputNumber
                  min={0.00}
                  max={5000.00}
                  formatter={value => "￥" + parseFloat(value).toFixed(2)}
                  parser={value => parseFloat(value.split('￥')[1]?value.split('￥')[1]:0.00)}
                />
              )}
            </FormItem>
            */}
            <FormItem
              label="单位"
            >
              {getFieldDecorator('goods_unit', {
                rules: [{ required: true, message: '请输入商品单位' }],
              })(
                 <Input placeholder="请输入单位" />
              )}
            </FormItem>
            {/*
            <FormItem
              label="添加时间"
            >
              {getFieldDecorator('add_time', {
                rules: [{ required: false, message: '添加时间' }],
              })(
                 <Input disabled />
              )}
            </FormItem>
            <FormItem
              label="prima_pic_url"
            >
              {getFieldDecorator('prima_pic_url', {
                rules: [{ required: false, message: 'prima_pic_url' }],
              })(
                <SingleImgUploader
                  {...this.props} 
                  name={'prima_pic_url'}
                  action={config.host + "/goods/changeImage?column=prima_pic_url&goodsId=" + goodsId} 
                />
              )}
            </FormItem>
            */}
            <FormItem
              label="商品图"
            >
              {getFieldDecorator('list_pic_url', {
                rules: [{ required: false, message: 'list_pic_url' }],
              })(
                <SingleImgUploader
                  {...this.props} 
                  name={'list_pic_url'}
                  action={config.host + "/goods/changeImage?column=list_pic_url&goodsId=" + goodsId} 
                />
              )}
            </FormItem>
  	        <FormItem
              label="新品"
            >
              {getFieldDecorator('is_new', {
                rules: [{ required: false, message: '是否启用' }],
              })(
              <MySwitch />
              )}
            </FormItem>
            <FormItem
              label="热销"
            >
              {getFieldDecorator('is_hot', {
                rules: [{ required: false, message: '是否启用' }],
              })(
                <MySwitch />
              )}
            </FormItem>
            <FormItem
              label="在售"
            >
              {getFieldDecorator('is_on_sale', {
                rules: [{ required: false, message: '是否启用' }],
              })(
              <MySwitch />
              )}
            </FormItem>
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
  deleteGoods = () => {
    const { dispatch, goodsId } = this.props;
    dispatch({
      type: 'goods/deleteGoods',
      goodsId
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const props = this.formRef.props;
    const form = props.form;
    const { firstCategoryFocusId } = props.goods;
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
      //类型
      if(newValues.is_new)
        newValues.is_new = boolToNum(newValues.is_new);
      if(newValues.is_hot)
        newValues.is_hot = boolToNum(newValues.is_hot);
      if(newValues.is_on_sale)
        newValues.is_on_sale = boolToNum(newValues.is_on_sale);
      //提交修改的信息
      if(Object.keys(newValues).length > 1) {
        this.formRef.props.dispatch({
        	type: 'goods/postGoodsValues',
        	values: newValues
        });
      }
      this.formRef.props.dispatch({
        type: 'goods/getGoodsByFirstCategory',
        firstCategoryFocusId
      });

	  //关闭
      // form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <div>
        <Button type="primary" data-goods_id={this.props.goodsId} onClick={this.showModal}>编辑</Button>
         <Popconfirm title="删除商品的一切信息，不可恢复！" onConfirm={this.deleteGoods} okText="是" cancelText="否">
            <Button type="" data-goods_id={this.props.goodsId}>删除</Button>
         </Popconfirm>
        <GoodsCollectionCreateForm
          {...this.props}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          editGoodsId={this.state.editGoodsId}
        />
      </div>
    );
  }
}