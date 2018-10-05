import { Component } from 'react';
import { Button, Form, Input, Modal, InputNumber, Popconfirm } from 'antd';
import SingleImgUploader from './mini_components/SingleImgUploader';
import MySwitch from './mini_components/MySwitch';
import { boolToNum, numToBool } from '../utils/mini_utils';
import config from '../config';

const FormItem = Form.Item;

const CategoryCollectionCreateForm = Form.create({
  onFieldsChange(props, changedFields) {

  },
  mapPropsToFields(props) {
  	const topCategoryList = props.goods.topCategory;
  	const firstCategoryList = props.goods.firstCategory;
  	const { editCategoryId } = props;
  	let editTopCategoryObj = null;
  	let editFirstCategoryObj = null;
  	topCategoryList.forEach((item) => {
  		if(item.id === parseInt(editCategoryId, 10)) {
  			editTopCategoryObj = Object.assign({}, item);
  		}
  	});
  	firstCategoryList.forEach((item) => {
  		if(item.id === parseInt(editCategoryId, 10)) {
  			editFirstCategoryObj = Object.assign({}, item);
  		}
  	});
  	const editCategoryObj = (editTopCategoryObj || editFirstCategoryObj) || {};
          editCategoryObj.is_show = numToBool(editCategoryObj.is_show);
  	const { id, name, front_desc, is_show, sort_order, show_index, img_url, banner_url, icon_url, wap_banner_url } = editCategoryObj;
    let img_url_filelist = [{
      uid: -1,
      name: 'img',
      status: 'done',
      url: img_url
    }];
    let banner_url_filelist = [{
      uid: -1,
      name: 'img',
      status: 'done',
      url: banner_url
    }];
    let icon_url_filelist = [{
      uid: -1,
      name: 'img',
      status: 'done',
      url: icon_url
    }];
    let wap_banner_url_filelist = [{
      uid: -1,
      name: 'img',
      status: 'done',
      url: wap_banner_url
    }];
    // 判断当前是否为顶级分类
    let is_top;
    if(editFirstCategoryObj && !editTopCategoryObj && Object.keys(editFirstCategoryObj).length !== 0){
      is_top = false;
    }else if(editTopCategoryObj && Object.keys(editTopCategoryObj).length !== 0 && !editFirstCategoryObj){
      is_top = true;
    }

    return {
      id: Form.createFormField({
        value: id
      }),
      name: Form.createFormField({
        value: name
      }),
      front_desc: Form.createFormField({
        value: front_desc
      }),
      is_show: Form.createFormField({
        value: is_show
      }),
      sort_order: Form.createFormField({
        value: sort_order
      }),
      img_url: Form.createFormField({
        value: img_url_filelist
      }),
      banner_url: Form.createFormField({
        value: banner_url_filelist
      }),
      // 一级分类按钮图
      icon_url: Form.createFormField({
        value: !is_top?icon_url_filelist:null
      }),
      // 顶级分类大图
      wap_banner_url: Form.createFormField({
        value: is_top?wap_banner_url_filelist:null
      }),
      show_index: Form.createFormField({
        value: show_index
      })
    }
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(
  class extends Component {
  	constructor(props){
  		super(props);
      this.state = {
        
      };
  	}
    render() {
      const { categoryId, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="编辑一级分类"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem
	          label="分类ID"
	        >
	          {getFieldDecorator('id', {
	            rules: [{ required: false, message: '' }],
	          })(
	            <Input disabled />
	          )}
	        </FormItem>
            <FormItem
	          label="分类名称"
	        >
	          {getFieldDecorator('name', {
	            rules: [{ required: true, message: '请输入分类名称' }],
	          })(
	            <Input placeholder="请输入名称" />
	          )}
	        </FormItem>
          {/*
            <FormItem
              label="分类简介"
            >
              {getFieldDecorator('front_desc', {
                rules: [{ required: false, message: '请输入分类简介' }],
              })(
                <TextArea 
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入简介" 
                />
              )}
            </FormItem>
          */}
          <FormItem
            label="分类排序（后台管理）"
          >
            {getFieldDecorator('sort_order', {
              rules: [{ required: false, message: '请输入排序' }],
            })(
              <InputNumber min={1} max={500} />
            )}
          </FormItem>
          <FormItem
            label="分类排序（小程序端）"
          >
            {getFieldDecorator('show_index', {
              rules: [{ required: false, message: '请输入排序' }],
            })(
              <InputNumber min={1} max={500} />
            )}
          </FormItem>
          {/*图片开始*/}
          {/*
          <FormItem
            label="img_url"
          >
            {getFieldDecorator('img_url', {
              rules: [{ required: false, message: 'img_url' }],
            })(
              <SingleImgUploader
                {...this.props} 
                action={config.host + "/category/changeImage?column=img_url&categoryId=" + categoryId} 
              />
            )}
          </FormItem>
          <FormItem
            label="banner_url"
          >
            {getFieldDecorator('banner_url', {
              rules: [{ required: false, message: 'banner_url' }],
            })(
              <SingleImgUploader
                {...this.props} 
                action={config.host + "/category/changeImage?column=banner_url&categoryId=" + categoryId} 
              />
            )}
          </FormItem>
          */}
          {
            (() => this.props.form.getFieldValue("icon_url"))()
            ?
            (<FormItem
              label="一级分类按钮图"
            >
              {getFieldDecorator('icon_url', {
                rules: [{ required: false, message: 'icon_url' }],
              })(
                  <SingleImgUploader
                    {...this.props} 
                    action={config.host + "/category/changeImage?column=icon_url&categoryId=" + categoryId} 
                  />
              )}
            </FormItem>)
            :
            null
          }

          {
            (() => this.props.form.getFieldValue("wap_banner_url"))()
            ?
            (<FormItem
              label="分类页顶部大图（顶级分类展示图）"
            >
              {getFieldDecorator('wap_banner_url', {
                rules: [{ required: false, message: 'wap_banner_url' }],
              })(
                  <SingleImgUploader
                    {...this.props} 
                    action={config.host + "/category/changeImage?column=wap_banner_url&categoryId=" + categoryId} 
                  />
              )}
            </FormItem>)
            :
            null
          }
          {/*图片结束*/}
	        <FormItem
	          label="启用"
	        >
	          {getFieldDecorator('is_show', {
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

export default class CategoryCollectionsPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			visible: false,
			editCategoryId: null
		};
	}
  showModal = (event) => {
  	const editCategoryId = event.currentTarget.dataset.category_id;
    this.setState({
    	visible: true,
    	editCategoryId
    });
  }
  deleteCategory = () => {
    const { dispatch, categoryId } = this.props;
    dispatch({
      type: "goods/deleteCategory",
      categoryId
    })
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const props = this.formRef.props;
    const form = props.form;
    const { topCategoryFocusId } = props.goods;
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
      if(newValues.is_show)
        newValues.is_show = boolToNum(newValues.is_show);
      
      //提交修改的信息
      if(Object.keys(newValues).length > 1) {
        this.formRef.props.dispatch({
          type: 'goods/postCategoryValues',
          values: newValues
        });
      }
      this.formRef.props.dispatch({
        type: 'goods/getCategory',
        topCategoryFocusId 
      });

      //关闭
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <div>
        <Button type="primary" data-category_id={this.props.categoryId} onClick={this.showModal}>编辑</Button>
         <Popconfirm title="删除分类及其子分类与商品，不可恢复！" onConfirm={this.deleteCategory} okText="是" cancelText="否">
          <Button type="" data-category_id={this.props.categoryId}>删除</Button>
         </Popconfirm>
        <CategoryCollectionCreateForm
          {...this.props}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          editCategoryId={this.state.editCategoryId}
        />
      </div>
    );
  }
}