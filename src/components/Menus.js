import React from 'react';
import { Menu, Icon } from 'antd';
export default class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: props.page.openDefaultKey
    }
    this.handleOpenChange = this.handleOpenChange.bind(this);
  }
  handleOpenChange(openKeys) {
    console.log("openKeys", openKeys);
    while(openKeys.length > 1)
    {
      openKeys.shift();
    }
    this.setState({
      openKeys
    });
  }
  render() {
    console.log("Menus props", this.props);
    const { menuConfig } = this.props.page;

    const { selectedKeys, openDefaultKey } = this.props.page;
    const { openKeys } = this.state;

    return (
          <Menu 
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={openDefaultKey}
            openKeys={openKeys}
            onOpenChange={this.handleOpenChange}
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