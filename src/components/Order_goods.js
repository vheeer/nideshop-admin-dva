import React from 'react';
import { Button, Modal, Avatar, List } from 'antd';
import styles from './Order_goods.css';

export default class Order_goods extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    console.log("Order_goods props: ", this.props);
    const { order_sn, order_goods } = this.props;
    return (
      <span>
        <a href="javascript:(0)" onClick={this.showModal}>查看商品</a>
        <Modal
          title={"订单" + order_sn + "的商品"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
           <List
            itemLayout="horizontal"
            dataSource={order_goods}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <img className={styles.img} src={item.list_pic_url} />
                  }
                  title={<a href="javascript:(0)">{item.goods_name}</a>}
                  description={item.retail_price + "元 * " + item.number + item.goods_unit}
                />
              </List.Item>
            )}
          />
        </Modal>
      </span>
    );
  }
}