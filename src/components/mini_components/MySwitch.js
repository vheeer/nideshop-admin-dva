import react from 'react';
import { Switch } from 'antd';
//解决开关无法在表单内赋初始值问题
export default class MySwitch extends react.Component {
    render() {
    	console.log(this.props);
        return (
            <Switch
            	{...this.props}
                checked={this.props.value}
            />
        );
    }
}