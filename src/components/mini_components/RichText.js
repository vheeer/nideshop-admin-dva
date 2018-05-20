import React from 'react';
import './RichText.css';
import { Button } from 'antd';
// import E from 'wangeditor';
// import E from '../../routes/wangEditor';
const E = window.wangEditor;

export default class RichText extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: this.props.richText
      }
  }
  render() {
    return (
      <div className="App">
        {/* 将生成编辑器 */}
        <div ref="editorElem" style={{textAlign: 'left'}}>
        </div>

        <Button type="primary" onClick={this.clickHandle.bind(this)}>确认修改</Button>
      </div>
    );
  }
  componentWillReceiveProps(props) {
    const _that = this;
  	const { richText } = props;
    const elem = this.refs.editorElem;
    // alert("before");
    elem.innerHTML = richText;
    // alert("after");
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      _that.setState({
        editorContent: html
      })
    }
    editor.create();
  }
  componentDidMount() {
    const _that = this;
  	const { richText } = this.props;
    const elem = this.refs.editorElem;
    elem.innerHTML = richText;
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      _that.setState({
        editorContent: html
      })
    }
    editor.create();
  }
  clickHandle() {
    // alert(this.state.editorContent);
      this.props.onSave(this.state.editorContent);
  }
}