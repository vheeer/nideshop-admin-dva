import React from 'react';
import { Menu, Icon } from 'antd';
export default class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) { 

  }  
  render() {
    console.log("props of Menus: ", this.props);
    const { menuConfig } = this.props.page;
    return (
          <Menu 
            theme="dark" 
            mode="inline" 
            selectedKeys={this.props.page.selectedKeys}
            defaultOpenKeys={this.props.page.openDefaultKey}
            onClick={this.handleClick}
          >
            {
              menuConfig.map((item, index) => {
                if(!item.children) {
                  return (
                    <Menu.Item key={item.href}>
                      <a href={item.href}>
                        <Icon type={item.icon} />
                        <span>{item.word}</span>
                      </a>
                    </Menu.Item>
                  )
                }else{
                  return (
                    <Menu.SubMenu 
                      key={item.href}
                      title={
                        <span>
                          <Icon type={item.icon} />
                          <span>{item.word}</span>
                        </span>
                    }>
                      {
                        item.children.map((item, index) => {
                          return (
                            <Menu.Item key={item.href}>
                              <a href={item.href}>
                                <Icon type={item.icon} />
                                <span>{item.word}</span>
                              </a>
                            </Menu.Item>
                          )
                        })
                      }
                    </Menu.SubMenu>
                  )
                }
              })
            }
          </Menu>
        )
  }
}