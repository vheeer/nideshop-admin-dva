import react from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

export default class EditModel extends react.Component {
  state = {
    visible: this.props.visible
  }
  static propTypes = {
    confirmLoading: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds'
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>编辑</Button>
        <Modal title={this.props.title}
          visible={visible}
          footer={[
            <Button 
              key="submit" 
              type="primary" 
              loading={confirmLoading} 
              onClick={this.handleOk}
            >
              保存
            </Button>
          ]}
        >
          <p>{ModalText}</p>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}