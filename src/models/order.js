import getModalDesc from './curd';

const namespace = "order";
//默认添加形式
const defaultCreateDesc = {
  model: namespace,
  pay_status: 0
}
//默认更新形式
const defaultUpdateDesc = {
  model: namespace
}
//默认拉取形式
const defaultReadDesc = {
  model: namespace,
  order: "id desc",
  page: 1,
  pageSize: 5
}
//获取模型操作过程
const { subscriptions, effects, reducers } = getModalDesc(namespace, { defaultCreateDesc, defaultUpdateDesc, defaultReadDesc });

export default {
  namespace,

  state: {
    dataList: [],
    /*
     * 字段对应表  
     * columnMatch: {
     *   数据库字段名: [显示的字段名, 表格中是否开启,表单字段展示类型, 表单中是否开启, 表格列描述, 表格字段展示类型],
     *   id: ["ID", true, 'varchar'],
     *   column_2: [……],
     *   ……
     * }
     * 4个汉字宽90px
     */
    columnMatch: {
                     id: ["ID", false, 'varchar required', true, {width: 60}, "varchar"],
                user_id: ["用户ID", false, 'varchar', true, {width: 150}, "varchar"],
                 avatar: ["头像", true, 'varchar', true, {width: 53,fixed: 'left'}, "avatar"],
               order_sn: ["单号", true, 'varchar', true, {width: 200,fixed: 'left'}, "varchar"],
               nickname: ["昵称", true, 'varchar', false, {width: 200}, "varchar"],
           order_status: ["订单状态", true, 'varchar', true, {width: 90}, "order_status"],
        shipping_status: ["物流状态", false, 'varchar', false, {width: 90}, "varchar"],
             pay_status: ["支付状态", true, 'varchar', false, {width: 90}, "pay_status"],
              consignee: ["收件人", true, 'varchar', false, {width: 90}, "varchar"],
                country: ["国家", true, 'varchar', false, {width: 120}, "varchar"],
               province: ["省", true, 'varchar', false, {width: 120}, "varchar"],
                   city: ["市", true, 'varchar', false, {width: 120}, "varchar"],
               district: ["区", true, 'varchar', false, {width: 120}, "varchar"],
                address: ["详细地址", true, 'varchar', false, {width: 180}, "varchar"],
                 mobile: ["电话", true, 'varchar', false, {width: 150}, "varchar"],
             postscript: ["", false, 'varchar', false, {width: 150}, "varchar"],
           shipping_fee: ["运费", false, 'varchar', false, {width: 150}, "varchar"],
               pay_name: ["", false, 'varchar', false, {width: 150}, "varchar"],
                 pay_id: ["", false, 'varchar', false, {width: 150}, "varchar"],
           actual_price: ["", false, 'money', false, {width: 150}, "varchar"],
               integral: ["", false, 'varchar', false, {width: 150}, "varchar"],
         integral_money: ["", false, 'varchar', false, {width: 150}, "varchar"],
            order_price: ["", false, 'money', false, {width: 150}, "varchar"],
            goods_price: ["订单总额", true, 'money', false, {width: 150}, "varchar"],
               add_time: ["下单时间", true, 'varchar', false, {width: 150}, "varchar"],
           confirm_time: ["确认时间", true, 'varchar', false, {width: 150}, "varchar"],
               pay_time: ["支付时间", true, 'varchar', false, {width: 150}, "varchar"],
          freight_price: ["", false, 'money', false, {width: 150}, "varchar"],
              coupon_id: ["优惠券ID", true, 'varchar', false, {width: 150}, "varchar"],
              parent_id: ["", false, 'varchar', false, {width: 150}, "varchar"],
           coupon_price: ["优惠券金额", true, 'money', false, {width: 150}, "varchar"],
        callback_status: ["", false, 'varchar', false, {width: 150}, "varchar"],
    },
    order_status: order_status => {
      let statusText = '未付款';
      switch(order_status) 
      {
        case 0:
          statusText = '未付款';
          break;
        case 101:
          statusText = '已取消';
          break;
        case 102:
          statusText = '已删除';
          break;
        case 201:
          statusText = '待发货';
          break;
        case 300:
          statusText = '已发货';
          break;
        case 301:
          statusText = '已收货';
          break;
        case 401:
          statusText = '退款申请';
          break;
        case 402:
          statusText = '退款申请';
          break;
        case 403:
          statusText = '已退款';
          break;
        default:
          break;
      }
      return statusText;
    },
    pay_status: pay_status => {
      let statusText = '未付款';
      switch(pay_status)
      {
        case 0:
          statusText = '未付款';
          break;
        case 1:
          statusText = '已付款';
          break;
        default:
          break;
      }
      return statusText;
    },
    loading: false
  },
  subscriptions: {
    ...subscriptions
  },
  effects: {
    ...effects
  },
  reducers: {
    ...reducers,
    changeDataValues(state, { values }) {
      const { id } = values; 
      let newState = Object.assign({}, state);
        newState.dataList.forEach((item) => {
          if(item.id === id){
            item = Object.assign(item, values);
          }
        });
      return newState;
    },
  }
}
