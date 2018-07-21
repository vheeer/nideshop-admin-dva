import React from 'react';
import { Form, Icon, Input, Button, Modal, InputNumber } from 'antd';
import SingleImgUploader from './mini_components/SingleImgUploader';
import styles from './GoodsCollectionsPage.css';
import config from '../config';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    const { dispatch, model, currentPage, form } = this.props;
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

  render() {
    console.log('OtherTable props: ', this.props);
      const { dataList: editGoodsObj, visible, onCancel, onCreate, form, columnMatch, model } = this.props;
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
      /*** 表单结构生成 ***/
      const fieldsHTML = [];
      for(const key in editGoodsObj[0])
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
                  <Input className={styles.textArea} />
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
          //   break;
          // case "image":
          //   fieldsHTML.push((
          //     <FormItem
          //       key={key}
          //       label={columnMatch[key][0]}
          //     >
          //       {getFieldDecorator(key, {
          //         rules: [{ required: false, message: '请输入价格' }],
          //       })(
          //         <SingleImgUploader
          //           name={columnMatch[key][0]}
          //           action={config.host + "/" + model + "/changeimg?column=" + key + "&id=" + editGoodsObj['id']}
          //         />
          //       )}
          //     </FormItem>
          //   ));
          //   break;
          default:
            break;
        }
      }

      return (
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {
            fieldsHTML
          }
           <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              保存
            </Button>
          </FormItem>
        </Form>
      );
    }
}

const WrappedHorizontalLoginForm = Form.create({

  mapPropsToFields(props) {
    let { dataList: editGoodsObj, columnMatch } = props;
    editGoodsObj = editGoodsObj[0];
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
})(HorizontalLoginForm);

export default WrappedHorizontalLoginForm;