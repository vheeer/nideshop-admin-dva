import getModalDesc from './curd';
import request from '../utils/request';
import { objToParams } from '../utils/mini_utils';
import config from '../config';
import { message } from 'antd';
<<<<<<< HEAD
const { order_status_match, pay_status_match } = config;
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c

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
<<<<<<< HEAD
                     id: ["ID", false, 'varchar', true, "varchar required", {width: 60}, false],
                user_id: ["用户ID", false, 'varchar', false, "varchar", {width: 150}, true],
                 avatar: ["头像", false, 'avatar', false, "avatar", {width: 80}, false],
                   user: ["用户", true, 'user', false, "avatar", {width: 180}, false],
               order_sn: ["单号", true, 'varchar', false, "varchar", {width: 220}, true],
               nickname: ["昵称", false, 'varchar', false, "varchar", {width: 200}, true],
=======
                     id: ["ID", true, 'varchar', true, "varchar required", {width: 60,fixed: 'left'}, false],
                user_id: ["用户ID", false, 'varchar', false, "varchar", {width: 150}, true],
                 avatar: ["头像", true, 'avatar', false, "avatar", {width: 80}, false],
               order_sn: ["单号", true, 'varchar', false, "varchar", {width: 220}, true],
               nickname: ["昵称", true, 'varchar', false, "varchar", {width: 200}, true],
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
           order_status: ["订单状态", true, 'order_status', false, "varchar", {width: 110}, false],
        shipping_status: ["物流状态", false, 'varchar', false, "varchar", {width: 110}, false],
             pay_status: ["支付状态", true, 'pay_status', false, "varchar", {width: 110}, false],
              consignee: ["收件人", true, 'varchar', true, "varchar", {width: 90}, true],
                country: ["国家", false, 'varchar', false, "varchar", {width: 120}, false],
               province: ["省", false, 'varchar', false, "varchar", {width: 120}, false],
                   city: ["市", false, 'varchar', false, "varchar", {width: 120}, false],
               district: ["区", false, 'varchar', false, "varchar", {width: 120}, false],
<<<<<<< HEAD
          province_text: ["省", true, 'region', false, "varchar", {width: 120}, false],
              city_text: ["市", true, 'region', false, "varchar", {width: 120}, false],
          district_text: ["区", true, 'region', false, "varchar", {width: 120}, false],
                address: ["详细地址", true, 'varchar', true, "varchar", {width: 180}, true],
                 mobile: ["电话", true, 'varchar', true, "varchar", {width: 150}, true],
             postscript: ["留言", true, 'varchar', true, "varchar", {width: 150}, true],
   postscript_consignor: ["商家留言", true, 'varchar', true, "varchar", {width: 150}, true],
=======
                address: ["详细地址", true, 'varchar', true, "varchar", {width: 180}, true],
                 mobile: ["电话", true, 'varchar', true, "varchar", {width: 150}, true],
             postscript: ["留言", true, 'varchar', true, "varchar", {width: 150}, true],
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
           shipping_fee: ["运费", false, 'varchar', false, "money", {width: 150}, false],
               pay_name: ["pay_name", false, 'varchar', false, "varchar", {width: 150}, false],
                 pay_id: ["pay_id", false, 'varchar', false, "varchar", {width: 150}, false],
           actual_price: ["用户实际需要支付金额", true, 'varchar', "money", "money", {width: 200}, false],
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
                referee: ["推荐人ID", true, 'varchar', false, "varchar", {width: 150}, false],
<<<<<<< HEAD
             freight_id: ["", false, 'varchar', false, "varchar", {width: 150}, false],
           out_trade_no: ["", false, 'varchar', false, "varchar", {width: 150}, false],
            shipping_id: ["", false, 'varchar', false, "varchar", {width: 150}, false]

=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c

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
<<<<<<< HEAD
          statusText = order_status_match[order_status];
=======
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
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
      return statusText;
    },
    pay_status: pay_status => {
      let statusText = '';
<<<<<<< HEAD
          statusText = pay_status_match[pay_status];
=======
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
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
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
    ...effects,
<<<<<<< HEAD
    //同意退款
    *acceptRefund({ type, id }, { call, put }) {
      const params_str = objToParams({ id });

      let url = config.host + '/' + namespace + '/acceptrefund';

      const result = yield request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params_str
      });
      console.log("退款结果", result);
      const { mes } = result.data.data;
      if(mes === "success"){
        message.success("已拒绝退款");
        //刷新数据
        yield put({
          type: 'readData'
        });
      }else{
        message.warning("操作失败");
      }
    },
=======
>>>>>>> 6de01f8aad4eaf1b163366defdc6f70fdeee514c
    //拒绝退款
    *refuseRefund({ type, id }, { call, put }) {
      const params_str = objToParams({ id });

      let url = config.host + '/' + namespace + '/refuserefund';

      const result = yield request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params_str
      });
      console.log("退款结果", result);
      const { mes } = result.data.data;
      if(mes === "success"){
        message.success("已拒绝退款");
        //刷新数据
        yield put({
          type: 'readData'
        });
      }else{
        message.warning("操作失败");
      }
    },
    //确认发货
    *shipped({ type, id }, { call, put }) {
      const params_str = objToParams({ id });

      let url = config.host + '/' + namespace + '/shipped';

      const result = yield request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params_str
      });
      console.log("确认发货结果", result);
      const { mes } = result.data.data;
      if(mes === "success"){
        message.success("已确认发货");
        //刷新数据
        yield put({
          type: 'readData'
        });
      }else{
        message.warning("操作失败");
      }
    }
  },
  reducers: {
    ...reducers
  }
}
