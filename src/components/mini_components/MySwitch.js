import React from 'react';
import { Switch } from 'antd';
//解决开关无法在表单内赋初始值问题
export default class MySwitch extends React.Component {
    render() {
        return (
            <Switch
            	{...this.props}
                checked={this.props.value}
            />
        );
    }
}