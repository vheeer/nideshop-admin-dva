import * as CURD from '../services/curd';
import { message } from 'antd';
export default {

  namespace: 'order',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        //read
        // dispatch({
        //   type: 'test',
        //   select_description: {
        //     order: "id desc",
        //     page: 1,
        //     offset: 2
        //   }
        // })

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
        dispatch({
          type: 'test',
          id: 208
        })

      });
    }
  },
  effects: {
    //拉取数据
    *test(data, { call, put }) {
      data.model = "order";
      // const result = yield call(CURD.read, data);
      // const result = yield call(CURD.create, data);
      // const result = yield call(CURD.update, data);
      const result = yield call(CURD.delete_row, data);
      console.log("result", result);
    }
  },
  reducers: {
    init(state, { topCategory, firstCategory, topCategoryFocusId }) {
      let newState = Object.assign({}, state);
          newState.topCategory = topCategory;
          newState.firstCategory = firstCategory;
          newState.topCategoryFocusId = topCategoryFocusId;
      console.log("Model init", newState);
      return newState;
    }
  }

};
