import * as CURD from '../services/curd';
import { message } from 'antd';
export default {

  namespace: 'order',

  state: {

    dataList: [],
    /*
     * 字段对应表  
     * columnMatch: {
     *   数据库字段名: [显示的字段名, 表格中是否开启,表单字段展示类型, 表单中是否开启, 表格列描述],
     *   id: ["ID", true, 'varchar'],
     *   column_2: [……],
     *   ……
     * }
     *
     */
    columnMatch: {
                     id: ["ID", false, 'varchar required', true, {width: 60}, "varchar"],
               order_sn: ["单号", true, 'varchar', true, {width: 200,fixed: 'left'}, "varchar"],
                user_id: ["用户ID", true, 'varchar', true, {width: 150}, "varchar"],
           order_status: ["订单状态", true, 'varchar', true, {width: 150}, "varchar"],
        shipping_status: ["物流状态", false, 'varchar', false, {width: 150}, "varchar"],
             pay_status: ["支付状态", true, 'varchar', false, {width: 150}, "switch"],
              consignee: ["收件人", true, 'varchar', false, {width: 150}, "varchar"],
                country: ["国家", true, 'varchar', false, {width: 150}, "varchar"],
               province: ["省", true, 'varchar', false, {width: 150}, "varchar"],
                   city: ["市", true, 'varchar', false, {width: 150}, "varchar"],
               district: ["区", true, 'varchar', false, {width: 150}, "varchar"],
                address: ["详细地址", true, 'varchar', false, {width: 650}, "varchar"],
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
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const hash = window.location.hash.split("#/")[1];
        switch(hash)
        {
          case 'order/list':
            // read
            dispatch({ 
              type: 'readData'
            });
            break;
          default:
            break;
        }

        //create
        // dispatch({
        //   type: 'test',
        //   insert_values: {
        //     user_id: 26,
        //     mobile: 15022211134,
        //     order_sn: Math.random() * 100000
        //   }
        // })

        //update
        // dispatch({
        //   type: 'test',
        //   update_values: {
        //     id: 209,
        //     user_id: 26,
        //     mobile: 15022211134,
        //     order_sn: Math.random() * 100000
        //   }
        // })

        //delete
        // dispatch({
        //   type: 'test',
        //   id: 208
        // })

      });
    }
  },
  effects: {
    //添加数据
    *createData({ type, ...createDesc }, { call, put }) {
      //默认更新形式
      const defaultCreateDesc = {
        model: "order",
        pay_status: 0,
        order_sn: parseInt(Math.random() * 1000)
      }
      //确认更新形式
      const currentCreateDesc = Object.assign(defaultCreateDesc, createDesc);
      //更新数据
      const result = yield call(CURD.create, currentCreateDesc);
      //查询结果
      if(result.data.errno === 0)
        message.success("添加成功");
      else
        return message.fail("添加数据失败");
    },
    //删除数据
    *deleteData({ type, id }, { call, put }) {
      //删除数据
      const result = yield call(CURD.delete_row, { model: "order", id });
      //查询结果
      if(result.data.errno === 0)
        message.success("删除成功");
      else
        return message.fail("删除数据失败");
    },
    //更新数据
    *updateData({ type, ...updateDesc }, { call, put }) {
      //默认更新形式
      const defaultUpdateDesc = {
        model: "order"
      }
      //确认更新形式
      const currentUpdateDesc = Object.assign(defaultUpdateDesc, updateDesc);
      //更新数据
      const result = yield call(CURD.update, currentUpdateDesc);
      //查询结果
      if(result.data.errno === 0)
        message.success("修改成功");
      else
        return message.fail("修改数据失败");
    },
    //拉取数据
    *readData({ type, ...readDesc }, { call, put }) {
      //默认拉取形式
      const defaultReadDesc = {
        model: "order",
        order: "id desc",
        page: 1,
        pageSize: 5
      }
      //确认拉取形式
      const currentReadDesc = Object.assign(defaultReadDesc, readDesc);
      //加载中状态
      yield put({ type: 'toggleLoading', loading: true });
      //拉取数据
      const result = yield call(CURD.read, currentReadDesc);
      //恢复正常状态
      yield put({ type: 'toggleLoading', loading: false });
      //查询结果
      if(result.data.errno === 0)
        message.success("读取信息成功", 1);
      else
        return message.fail("读取数据失败");
      //订单列表分页信息
      const { count, totalPage, pageSize, currentPage } = result.data.data;
      //订单列表
      const { data: dataList } = result.data.data;
      //修改全局状态
      yield put({
        type: 'change',
        dataList,
        count,
        pageSize,
        currentPage
      });
    }
  },
  reducers: {
    init(state, data) {
      let newState = Object.assign({}, state);
          newState.orderList = data;
      console.log("Model init", newState);
      return newState;
    },
    change(state, data) {
      let newState = Object.assign({}, state);
      for(const key in data)
      {
        newState[key] = data[key];
      }
      console.log("Model change", newState);
      return newState;
    },
    toggleLoading(state, { loading }) {
      let newState = Object.assign({}, state);
          newState.loading = loading;
      return newState;
    }
  }

};
