import React from 'react';
import { Form, Modal, Input, Row, Col } from 'antd';
const { ReactDOM } = React;
const Editor = window.wangEditor;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};
const FormItem = Form.Item;
@Form.create()
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      editorText: '',
    }
  }
  submit = values => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
         //提交表单处理事项
         this.props.OnSubmit(values);
      }
    });
  };
  componentDidMount() {
      //判断modal是否需要显示
    if (this.props.visible) {
      //获取真实dom，创新富文本编辑器
      var editor = new Editor(ReactDOM.findDOMNode(this._div));
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
      editor.customConfig.onchange = (html) => {
        this.setState({
          editorHtml: html,
          editorText: editor.txt.text()
        })
        //将html值设为form表单的desc属性值
        this.props.form.setFieldsValue({
          'desc': html
        });
      }
      editor.create();
    }
  }
  //自定义表单验证规则
  validateEditorFrom = (rule, value, callback) => {
      //此处根据富文本框的text值进行验证，但注意富文本框中输入空格，使用‘&nbsp‘表示，此方法不能处理只输入空格的验证。
    if (this.state.editorText.trim() === '') {
      callback('不能为空');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  }

  render() {
    const { id, visible, confirmLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id', { initialValue: id });
    return (
      <Modal
        title="编辑信息"
        width={'60%'}
        confirmLoading={confirmLoading}
        visible={visible}
        onOk={this.submit}
        onCancel={this.props.onCancel}
      >
        <Form>
          <Row>
            <Col>
              <FormItem {...formItemLayout} label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请填写名称' }],
                  initialValue: ''
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="描述">
                {getFieldDecorator('desc', {
                  rules: [{
                    required: true,
                    message: '请填写描述',
                  }, {// 使用自定义的校验规则
                    validator: this.validateEditorFrom
                  }],
                  initialValue: ''
                })(<div ref={(ref) => this._div = ref}></div>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default MyModal;