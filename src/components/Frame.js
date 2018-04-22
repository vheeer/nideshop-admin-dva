import React from 'react';
import { Layout, Icon, Breadcrumb, Row, Col } from 'antd';
import styles from './Frame.css';
import Menus from './Menus';
const { Header, Sider, Content } = Layout;

export default class Frame extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        collapsed: false
      };
      this.handleClickLogout = this.handleClickLogout.bind(this);
  }
  toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed
      });
  }
  handleClickLogout() {
    this.props.dispatch({
      type: "user/logout"
    });
  }
  static propTypes = {  
    
  }
  render() {
    console.log("props of Frame: ", this.props);
    return (
      <Layout className={styles.main}>
        <Header className={styles.top}>
          <div className={styles.logo} />
          <div className={styles.nav_login_box}>
          {
            !this.props.user.id
            ?
            <Breadcrumb>
              <Breadcrumb.Item><a href="#/login" onClick={this.props.handleClickLogin}>登录</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="#/register" onClick={this.props.handleClickRegister}>注册</a></Breadcrumb.Item>
            </Breadcrumb>
            :
            <Breadcrumb>
              <Breadcrumb.Item><a onClick={this.handleClickLogout}>退出</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="#/changePSD">改密</a></Breadcrumb.Item>
            </Breadcrumb>
          }
          </div>
        </Header>
        <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
	            <Menus {...this.props} />
            </Sider>
            <Layout>
                <Row>
                  <Col span={2}>
                    <Icon
                      className={styles.menu_trigger_box_trigger}
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                  </Col>
                  <Col span={14}>
                    <Breadcrumb 
                      className={styles.nav}
                      separator=">"
                    >
                      <Breadcrumb.Item>{this.props.page.firstBreadcrumbItem}</Breadcrumb.Item>
                      {
                        this.props.page.secondBreadcrumbItem
                        ?
                        <Breadcrumb.Item><a href={this.props.page.defaultKey}>{this.props.page.secondBreadcrumbItem}</a></Breadcrumb.Item>
                        :
                        null
                      }
                    </Breadcrumb>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                
            	
                
            	<Content className={styles.content}>
                <div className={styles.content_div}>
                	{this.props.children}
                </div>
            	</Content>
            </Layout>
          </Layout>
        </Layout>
    )
  }
}