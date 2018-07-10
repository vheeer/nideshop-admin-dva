import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';

export default class SingleImgUploader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.value,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.setState({ 
      previewVisible: false 
    });
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange(data) {
    const { dispatch, goods } = this.props;
    const { goodsFocusId } = goods;
    const { file, fileList } = data;
    if(!file.error && fileList.length > 0 && file.status === "done"){
      message.success("成功上传");
      dispatch({
        type: "goods/getGalleryByGood",
        goodsFocusId
      });
    }
    this.setState({ fileList });
  }
  componentWillReceiveProps(props) {
    const { value: fileList } = props;
    this.setState({
      fileList
    });
  }
  render() {
    const { max } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.props.handleRemove}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
