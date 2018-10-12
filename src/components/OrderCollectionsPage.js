import react from 'react';
import { Form, Input, Modal, InputNumber, Select, Button } from 'antd';
import { getDiff } from '../utils/mini_utils';
import SingleImgUploader from './mini_components/SingleImgUploader';
import styles from './OrderCollectionsPage.css';
import config from '../config';
import RichTextstyles from './mini_components/RichText.css';
import RichTextS from './mini_components/RichTextS';
const { TextArea } = Input;
const FormItem = Form.Item;

const { Option } = Select;

class VSelect extends react.Component {
  render() {
    return <Select {...this.props} defaultValue={this.props.value} />;
  }
}
const GoodsCollectionCreateForm = Form.create({
  onFieldsChange(props, changedFields) {

  },
  mapPropsToFields(props) {
    const { editGoodsObj, columnMatch } = props;

    /*** 表单值生成 ***/
    //填值函数
    const KV = (key, value) => {
      fieldsObj[key] = Form.createFormField({
        value
      });
    }

    //查询到的字段列表
    let keys = [];
    if(editGoodsObj)
      keys = Object.keys(editGoodsObj);
    const fieldsObj = {};
    for(const key of keys)
    {
      //跳过字段
      if(columnMatch[key][3] === false)
        continue;
      //默认字段值
      switch(columnMatch[key][4])
      {
        case "varchar":
          KV(key, editGoodsObj[key]);
          break;
        case "textArea":
          KV(key, editGoodsObj[key]);
          break;
        case "varchar required":
          KV(key, editGoodsObj[key]);
          break;
        case "number":
          KV(key, editGoodsObj[key]);
          break;
        case "money":
          KV(key, editGoodsObj[key]);
          break;
        case "gender":
          KV(key, editGoodsObj[key]);
          break;
        case "image":
          const filelist = [{
            uid: -1,
            name: columnMatch[key][0],
            status: 'done',
            url: editGoodsObj[key]
          }];
          fieldsObj[key] = Form.createFormField({
            value: filelist
          });
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
  class extends react.Component {
    constructor(props){
      super(props);
      this.state = {

      }
    }
    RichTextOnChange() {
      console.log('rich');
    }
    render() {
      const { editGoodsObj, visible, onCancel, onCreate, form, columnMatch, model } = this.props;
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
        switch(columnMatch[key][4])
        {
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
          case "textArea":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: false, message: '' }],
                })(
                  <TextArea className={styles.textArea} />
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
          case "number":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: false, message: '请输入价格' }],
                })(
                  <InputNumber
                    min={0}
                    max={1500000}
                  />
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
                    max={15000.00}
                    formatter={value => "￥" + parseFloat(value).toFixed(2)}
                    parser={value => parseFloat(value.split('￥')[1]?value.split('￥')[1]:0.00)}
                  />
                )}
              </FormItem>
            ));
            break;
          case "image":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: false, message: '请输入价格' }],
                })(
                  <SingleImgUploader
                    name={columnMatch[key][0]}
                    action={config.host + "/" + model + "/changeimg?column=" + key + "&id=" + editGoodsObj['id']} 
                  />
                )}
              </FormItem>
            ));
            break;
          case "gender":
            fieldsHTML.push((
              <FormItem
                key={key}
                label={columnMatch[key][0]}
              >
                {getFieldDecorator(key, {
                  rules: [{ required: false, message: '' }],
                })(
                  <VSelect>
                    <Option value={0}>未知</Option>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
                  </VSelect>
                )}
              </FormItem>
            ));
            break;
          case "richtext":
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
          className={styles.model}
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

export default class GoodsCollectionsPage extends react.Component {
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
    const { button_text } = this.props;
    return (
      <span>
        <a onClick={this.showModal}>
          {button_text}
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