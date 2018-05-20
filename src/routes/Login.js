import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    this.props.handleLogin(values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(values) {
    this.props.dispatch({ type: 'account/login', values });
  }
  render() {
    console.log("Login this.props", this.props);
    return (
      <div>
        <h1>用户登陆</h1>
        <WrappedNormalLoginForm handleLogin={this.handleLogin}></WrappedNormalLoginForm>
        <p>{this.props.user.loginLoading?"加载中...":""}</p>
      </div>
    );
  }
};

export default connect(({ user }) => ({
  user: user,
}))(Login);