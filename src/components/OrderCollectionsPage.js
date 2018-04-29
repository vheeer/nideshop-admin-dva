import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';
import { getDiff } from '../utils/mini_utils';
import styles from './GoodsCollectionsPage.css';

const FormItem = Form.Item;

const GoodsCollectionCreateForm = Form.create({
  onFieldsChange(props, changedFields) {

  },
  mapPropsToFields(props) {
    const { editGoodsObj, columnMatch } = props;

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
  onValuesChange(props, values) {
    console.log(values);
  },
})(
  class extends React.Component {
  	constructor(props){
  		super(props);
      this.state = {

      }
  	}
    render() {
      const { editGoodsObj, visible, onCancel, onCreate, form, columnMatch } = this.props;
      const { getFieldDecorator } = form;

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
            break;
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
            break;
          default:
            break;
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

		};
	}
  showModal = (event) => {
    this.setState({
      visible: true
    });
  }
  handleCancel = () => {
      this.setState({ 
        visible: false
      });
  }
  handleCreate = () => {
    const props = this.formRef.props;
    const form = props.form;
    const { dispatch, model, currentPage } = props;
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
      //防止提交后表单值立即重新渲染为修改前数据
      dispatch({
        type: model + '/changeDataValues',
        values: newValues
      })
      //关闭
      this.setState({ 
        visible: false
      });
    });

  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  shouldComponentUpdate(nextProps, nextState) {
    //获取DIFF
    const diffState = getDiff(nextState, this.state);
    //不重新渲染条件
    const result = diffState.indexOf("visible") === -1;

    if(result)
      return false;
    else
      return true;
  }
  render() {
    return (
      <span>
        <a onClick={this.showModal}>
          编辑
        </a>
        <GoodsCollectionCreateForm
          {...this.props}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </span>
    );
  }
}