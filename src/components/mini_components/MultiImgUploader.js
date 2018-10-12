import react from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import styles from './MultiImgUploader.css';

export default class SingleImgUploader extends react.Component {
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
    console.log('file', file);
    // 获取、添加轮播图格式
    let type;
    const currentType = file.url.split('.').pop();
    const currentName = file.url.split('/').pop();
    const imgType = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if(imgType.indexOf(currentType) > -1) {
      type = 'img';
    }
    this.setState({
      ...file,
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      type,
      currentName
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
    const { previewVisible, previewImage, fileList, type, currentName } = this.state;
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
          withCredentials={true}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <h3>{currentName}</h3>
          {
            type === 'img'
            ?
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            :
              <video className={styles.video} src={previewImage} controls="controls">
                您的浏览器不支持 video 标签。
              </video>
          }
        </Modal>
      </div>
    );
  }
}
