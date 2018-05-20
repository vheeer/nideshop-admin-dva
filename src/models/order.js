import getModalDesc from './curd';

//命名空间
const namespace = "order";
//全局提示
const alertMessage = "您可以在这里确认发货已支付的订单";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 278;
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
                     id: ["ID", false, 'varchar', true, "varchar required", {width: 60}, false],
                user_id: ["用户ID", false, 'varchar', false, "varchar", {width: 150}, true],
                 avatar: ["头像", true, 'avatar', false, "avatar", {width: 60}, false],
               order_sn: ["单号", true, 'varchar', false, "varchar", {width: 200,fixed: 'left'}, true],
               nickname: ["昵称", true, 'varchar', false, "varchar", {width: 200}, true],
           order_status: ["订单状态", true, 'order_status', false, "varchar", {width: 90}, false],
        shipping_status: ["物流状态", false, 'varchar', false, "varchar", {width: 90}, false],
             pay_status: ["支付状态", true, 'pay_status', false, "varchar", {width: 90}, false],
              consignee: ["收件人", true, 'varchar', true, "varchar", {width: 90}, true],
                country: ["国家", false, 'varchar', false, "varchar", {width: 120}, false],
               province: ["省", false, 'varchar', false, "varchar", {width: 120}, false],
                   city: ["市", false, 'varchar', false, "varchar", {width: 120}, false],
               district: ["区", false, 'varchar', false, "varchar", {width: 120}, false],
                address: ["详细地址", true, 'varchar', true, "varchar", {width: 180}, true],
                 mobile: ["电话", true, 'varchar', true, "varchar", {width: 150}, true],
             postscript: ["留言", true, 'varchar', true, "varchar", {width: 150}, true],
           shipping_fee: ["运费", false, 'varchar', false, "money", {width: 150}, false],
               pay_name: ["pay_name", false, 'varchar', false, "varchar", {width: 150}, false],
                 pay_id: ["pay_id", false, 'varchar', false, "varchar", {width: 150}, false],
           actual_price: ["用户实际需要支付金额", true, 'varchar', "money", "money", {width: 150}, false],
               integral: ["integral", false, 'varchar', false, "varchar", {width: 150}, false],
         integral_money: ["integral_money", false, 'varchar', false, "varchar", {width: 150}, false],
            order_price: ["订单总额", true, 'varchar', false, "money", {width: 150}, true],
            goods_price: ["商品总价", false, 'varchar', false, "money", {width: 90}, false],
               add_time: ["下单时间", true, 'date_time', false, "varchar", {width: 180}, false],
           confirm_time: ["确认时间", false, 'date_time', false, "varchar", {width: 180}, false],
               pay_time: ["支付时间", false, 'date_time', false, "varchar", {width: 180}, false],
          freight_price: ["运费", true, 'varchar', false, "money", {width: 150}, false],
              coupon_id: ["优惠券ID", false, 'varchar', false, "varchar", {width: 90}, false],
              parent_id: ["parent_id", false, 'varchar', false, "varchar", {width: 150}, false],
           coupon_price: ["优惠券金额", false, 'varchar', false, "money", {width: 105}, false],
        callback_status: ["callback_status", false, 'varchar', false, "varchar", {width: 150}, false],
            order_goods: ["order_goods", false, 'varchar', false, "varchar", {width: 150}, false],

    };
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][5]["width"]:0);
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
      let statusText = '';
      switch(pay_status)
      {
        case 0:
          statusText = '未支付';
          break;
        case 2:
          statusText = '已支付';
          break;
        default:
          break;
      }
      return statusText;
    },
    loading: true
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
