import getModalDesc from './curd';

//命名空间
const namespace = "order";
//全局提示
const alertMessage = "您可以在这里确认发货已支付的订单";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 108;
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
  pageSize
}
//获取模型操作过程
const { effects, reducers } = getModalDesc(namespace, { defaultCreateDesc, defaultUpdateDesc, defaultReadDesc });
/*
 * 字段对应表  
 * columnMatch: {
 *   数据库字段名: [显示的字段名, 表格中是否开启,表单字段展示类型, 表单中是否开启, 表格列描述, 表格字段展示类型],
 *   id: ["ID", true, 'varchar'],
 *   column_2: [……],
 *   ……
 * }
 * 4个汉字宽90px 5个汉字宽105px
 */
const columnMatch = {
                     id: ["ID", false, 'varchar required', true, {width: 60}, "varchar", true],
                user_id: ["用户ID", false, 'varchar', true, {width: 150}, "varchar", true],
                 avatar: ["头像", true, 'varchar', true, {width: 60,fixed: 'left'}, "avatar", false],
               order_sn: ["单号", true, 'varchar', true, {width: 200,fixed: 'left'}, "varchar", true],
               nickname: ["昵称", true, 'varchar', false, {width: 200}, "varchar", true],
           order_status: ["订单状态", true, 'varchar', true, {width: 90}, "order_status", false],
        shipping_status: ["物流状态", false, 'varchar', false, {width: 90}, "varchar", false],
             pay_status: ["支付状态", true, 'varchar', false, {width: 90}, "pay_status", false],
              consignee: ["收件人", true, 'varchar', false, {width: 90}, "varchar", true],
                country: ["国家", true, 'varchar', false, {width: 120}, "varchar", false],
               province: ["省", true, 'varchar', false, {width: 120}, "varchar", false],
                   city: ["市", true, 'varchar', false, {width: 120}, "varchar", false],
               district: ["区", true, 'varchar', false, {width: 120}, "varchar", false],
                address: ["详细地址", true, 'varchar', false, {width: 180}, "varchar", true],
                 mobile: ["电话", true, 'varchar', false, {width: 150}, "varchar", true],
             postscript: ["", false, 'varchar', false, {width: 150}, "varchar", false],
           shipping_fee: ["运费", false, 'varchar', false, {width: 150}, "varchar", false],
               pay_name: ["", false, 'varchar', false, {width: 150}, "varchar", false],
                 pay_id: ["", false, 'varchar', false, {width: 150}, "varchar", false],
           actual_price: ["", false, 'money', false, {width: 150}, "varchar", false],
               integral: ["", false, 'varchar', false, {width: 150}, "varchar", false],
         integral_money: ["", false, 'varchar', false, {width: 150}, "varchar", false],
            order_price: ["", false, 'money', false, {width: 150}, "varchar", false],
            goods_price: ["订单总额", true, 'money', false, {width: 90}, "varchar", false],
               add_time: ["下单时间", true, 'varchar', false, {width: 180}, "date_time", false],
           confirm_time: ["确认时间", true, 'varchar', false, {width: 180}, "date_time", false],
               pay_time: ["支付时间", true, 'varchar', false, {width: 180}, "date_time", false],
          freight_price: ["", false, 'money', false, {width: 150}, "varchar", false],
              coupon_id: ["优惠券ID", true, 'varchar', false, {width: 90}, "varchar", false],
              parent_id: ["", false, 'varchar', false, {width: 150}, "varchar", false],
           coupon_price: ["优惠券金额", true, 'money', false, {width: 105}, "varchar", false],
        callback_status: ["", false, 'varchar', false, {width: 150}, "varchar", false],
    };
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][4]["width"]:0);
  return totalWidth;
})();
export default {
  namespace,
  state: {
    dataList: [],
    columnMatch,
    alertMessage,
    totalWidth,
    pageSize,
    actionWidth,
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
    setup({ dispatch, history }) {
      let fun = location => {
        if(typeof fun["executed"] === "undefined"){
          const hash = window.location.hash.split("#/")[1];
          if(hash === namespace + '/list'){
            dispatch({
              type: 'readData'
            });
            fun["executed"] = true;
          }
        }
      };
      history.listen(fun);
    }
  },
  effects: {
    ...effects
  },
  reducers: {
    ...reducers
  }
}
