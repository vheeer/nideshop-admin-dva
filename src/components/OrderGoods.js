import React from 'react';
import { Button, Modal, Avatar, List, Steps, Row, Col, Card, InputNumber, Input, Tooltip, Message } from 'antd';
import styles from './OrderGoods.css';
import config from '../config';
import Excel from './mini_components/Excel';
const { order_status_match } = config;
const { Step } = Steps;
const { Search } = Input;

export default class OrderGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      actual_price_btn: false,
      actual_price_old: props.actual_price,
      actual_price_now: props.actual_price,
      freight_id_now: props.freight_id,
      postscript_consignor_now: props.postscript_consignor
    }
    this.handleUpdateActualPrice = this.handleUpdateActualPrice.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      actual_price_btn: false,
      actual_price_now: e
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleActualPriceChange = (e) => {
    console.log("改变实际价格： ", e);
    this.setState({
      actual_price_now: e,
      actual_price_btn: true
    });
  }
  handleUpdateActualPrice = (e) => {
    const { dispatch, id } = this.props;
    const { actual_price_now } = this.state;
    dispatch({
      type: 'order/updateData',
      id,
      actual_price: actual_price_now
    });
    this.setState({
      actual_price_btn: false,
      actual_price_old: actual_price_now
    });
  }
  handleCancleActualPrice = (e) => {
    const { actual_price_old } = this.state;
    this.setState({
      actual_price_now: actual_price_old,
      actual_price_btn: false
    });
  }
  handleFreightIdChange = (e) => {
    const { value } = e.target;
    this.setState({
      freight_id_now: value
    })
  }
  handleUpdateFreightId = (e) => {
    const { dispatch, id, shipping_status } = this.props;
    const { freight_id_now } = this.state;
    if(shipping_status !== 2){
      dispatch({
        type: 'order/updateData',
        id,
        freight_id: freight_id_now
      });
      this.setState({
        freight_id_old: freight_id_now
      })
    }else
      Message.warning("已收货，无法修改");
  }
  handleUpdatePostScript = (e) => {
    const { dispatch, id, shipping_status } = this.props;
    const { postscript_consignor_now } = this.state;
    if(shipping_status !== 2)
      dispatch({
        type: 'order/updateData',
        id,
        postscript_consignor: postscript_consignor_now
      });
    else
      Message.warning("已收货，无法修改");
  }
  handlePostScriptChange = (e) => {
    const { value } = e.target;
    this.setState({
      postscript_consignor_now: value
    })
  }
  confirmSend = (e) => {
    const { dispatch } = this.props;
    let id = e.target.dataset.id;
    dispatch({
      type: "order/shipped",
      id
    })
  }
  handleAccept = (e) => {
    let id = e.target.dataset.id;
    const { dispatch } = this.props;
    dispatch({
      type: "order/acceptRefund",
      id
    })
  }
  handleReject = (e) => {
    let id = e.target.dataset.id;
    const { dispatch } = this.props;
    dispatch({
      type: "order/refuseRefund",
      id,
      order_status: 300
    })
  }
  onCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  render() {
    // console.log("Order_goods props: ", this.props);
    const { id, order_status, pay_status, shipping_status, order_sn, freight_id, order_goods, user, add_time, order_price, actual_price, goods_price, consignee, address, mobile, postscript, province_text, city_text, district_text, freight_price, postscript_consignor, others } = this.props;
    const { actual_price_btn, actual_price_now, freight_id_now, postscript_consignor_now } = this.state;
    // 防报错user
    let _user;
    if(user){
      _user = user;
    }else{
      _user = {};
    }
    // 防报错others
    let _others;
    if(others.dataList[0]){
      _others = others.dataList[0];
    }else{
      _others = {
        default_province_text: {},
        default_city_text: {},
        default_district_text: {}
      };
    }

    const { default_consignor, default_address, default_contact, default_postscript_consignor, default_province_text, default_city_text, default_district_text } = _others;
    // 实际金额输入框
    const inputNumberProperties = {
      defaultValue: actual_price,
      value: actual_price_now,
      min: 0.00,
      max: 15000.00,
      disabled: false,
      onChange: this.handleActualPriceChange,
      formatter: value => "￥" + parseFloat(value).toFixed(2),
      parser: value => parseFloat(value.split('￥')[1]?value.split('￥')[1]:0.00)
    }
    if(typeof inputNumberProperties.value !== "number"){
      inputNumberProperties.value = actual_price; // 防报错
    }
    // 运单输入框
    const inputFreightIdProperties = {
      defaultValue: freight_id,
      value: freight_id_now,
      enterButton: "修改",
      placeholder: "请填写运单号",
      onSearch: this.handleUpdateFreightId,
      onChange: this.handleFreightIdChange,
      disabled: (order_status === 403 || order_status === 401 || shipping_status === 2)?true:false, //收货后将无法修改，退款操作时无法修改
    }
    // 卖家留言输入框
    const inputPostScriptProperties = {
      defaultValue: (!postscript_consignor || postscript_consignor === "")?default_postscript_consignor:postscript_consignor,
      value: postscript_consignor_now,
      enterButton: "修改",
      placeholder: "不填写则使用默认留言",
      onSearch: this.handleUpdatePostScript,
      onChange: this.handlePostScriptChange,
      disabled: (order_status === 403 || order_status === 401 || shipping_status === 2)?true:false, //收货后将无法修改，退款操作时无法修改
    }
    // 操作按钮
    const shipping_btn_show = shipping_status === 0 && order_status === 201;
    const accept_btn_show = order_status === 401;
    const reject_btn_show = order_status === 401;
    // 订单信息内容
    const order_data = [
      {
        key: 'avatar',
        title: _user.nickname,
        content: "下单时间：" + new Date(add_time * 1000).format("yyyy-MM-dd hh:mm:ss"),
        avatar: _user.avatar
      },
      {
        key: 'goods_price',
        title: '商品价格',
        description: goods_price + "元",
        content: '（订单商品的总金额）'
      },
      {
        key: 'order_price',
        title: '订单价格',
        description: order_price + "元（运费： " + freight_price + "元）",
        content: '（用户理论需要支付的金额）'
      },
      {
        key: 'actual_price',
        title: '实际价格',
        description: (
          <div>
            <InputNumber
              {...inputNumberProperties}
              disabled={pay_status === 0?false:true}
            />
            &nbsp;&nbsp;
            {actual_price_btn?<Button type="primary" onClick={this.handleUpdateActualPrice}>保存</Button>:null}
            &nbsp;&nbsp;
            {actual_price_btn?<Button onClick={this.handleCancleActualPrice}>取消</Button>:null} 
          </div>
        ),
        content: '（用户实际需要支付的金额，用户支付前商家可修改）'
      }
    ]; 
    // 发货运单
    const shipping_message = {
      consignor: default_consignor,
      shipping_address: default_province_text["name"] + " " + default_city_text["name"] + " " + default_district_text["name"],
      shipping_address_desc: default_address,
      shipping_mobile: default_contact,
      shipping_postscript: postscript_consignor?postscript_consignor:default_postscript_consignor
    };
    // 收货运单
    const deliver_message = {
      consignee,
      deliver_address: province_text["name"] + " " + city_text["name"] + " " + district_text["name"],
      deliver_address_desc: address,
      deliver_mobile: mobile,
      deliver_postscript: postscript
    };
    // 打印运单
    const print_data = [{
      order_sn,
      deliver_province_text: province_text["name"],
      deliver_city_text: city_text["name"],
      deliver_district_text: district_text["name"],
      deliver_address_all: deliver_message["deliver_address"] + " " + address,
      deliver_telephone: "",
      shipping_telephone: "",
      ...shipping_message,
      ...deliver_message
     }];
    // 订单商品HMTL
    const goods_html = (
      <List
        itemLayout="horizontal"
        dataSource={order_goods}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img className={styles.img} src={item.list_pic_url} alt={item.name} />
              }
              title={<span>{item.goods_name}</span>}
              description={item.retail_price + "元 * " + item.number + item.goods_unit}
            />
          </List.Item>
        )}
      />
    );
    // 订单信息HTML
    const order_html = (
      <List
        itemLayout="horizontal"
        dataSource={order_data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={item.avatar?<Avatar src={item.avatar} />:null}
              title={<span className={styles.title}>{item.title}</span>}
              description={item.description}
            />
            <div className={styles.content}>{item.content}</div>
          </List.Item>
        )}
      />
    );
    // 运单信息HTML
    const shipping_html = (
      <div>
        <div className={styles.print_btn}>
          <Excel data={print_data} btn_ele={<Button type="primary">导出</Button>} />
        </div>
        <div className={styles.shipping}>
          <Row gutter={16}>
            <Col span={12}>
              <Card title={"发件人： " + shipping_message.consignor} bordered={false}>
                <p><b>地址：</b> {shipping_message.shipping_address}</p>
                <p><b>详细地址：</b> {shipping_message.shipping_address_desc}</p>
                <p><b>商家留言：</b> {shipping_message.shipping_postscript}</p>
                <p><b>联系方式：</b> {shipping_message.shipping_mobile}</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title={"收件人： " + deliver_message.consignee} bordered={false}>
                <p><b>地址：</b> {deliver_message.deliver_address}</p>
                <p><b>详细地址：</b> {deliver_message.deliver_address_desc}</p>
                <p><b>买家留言：</b> {deliver_message.deliver_postscript}</p>
                <p><b>联系方式：</b> {deliver_message.deliver_mobile}</p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={16} push={8}>
              <Row>
                <Col className={styles.freight_col} span={4}>
                  运单号：
                </Col>
                <Col className={styles.freight_col} span={20}>
                  <Tooltip title="发货后将无法修改">
                    <Search {...inputFreightIdProperties} />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={16} push={8}>
              <Row>
                <Col className={styles.freight_col} span={4}>
                  卖家留言：
                </Col>
                <Col className={styles.freight_col} span={20}>
                  <Tooltip title="发货后将无法修改">
                    <Search {...inputPostScriptProperties} />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
    // 订单详情底部
    const modal_footer = (
      <Row>
          {shipping_btn_show?<Button type="primary" data-id={id} onClick={this.confirmSend}>发货</Button>:null}
          {accept_btn_show?<Button type="primary" data-id={id} onClick={this.handleAccept}>同意退款</Button>:null}
          {reject_btn_show?<Button type="primary" data-id={id} onClick={this.handleReject}>拒绝退款</Button>:null}
        
          <Button
            type={!shipping_btn_show && !accept_btn_show && !reject_btn_show?"primary":""}
            onClick={this.handleCancel}
          >
            关闭
          </Button>
      </Row>
    );
    return (
      <span>
        <a href="javascript:(0)" onClick={this.showModal}>查看商品</a>
        <Modal
          className={styles.model}
          width={800}
          title={"订单：" + order_sn + "（" + order_status_match[order_status] + "）"}
          visible={this.state.visible}
          destroyOnClose={true}
          maskClosable={false}
          keyboard={true}
          footer={modal_footer}
          onCancel={this.onCancel}
        >

          <Steps direction="vertical" current={2}>
            <Step title="订单商品：" description={goods_html} />
            <Step title="订单信息：" description={order_html} />
            <Step title="运单信息：" description={shipping_html} />
          </Steps>

        </Modal>
      </span>
    );
  }
}