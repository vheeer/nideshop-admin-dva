  import * as CURD from '../services/curd';
  import { message } from 'antd';
  const getModalDesc = (model, { defaultCreateDesc, defaultUpdateDesc, defaultReadDesc }) => {
    return {
      subscriptions: {
        setup({ dispatch, history }) {
          history.listen(location => {
            const hash = window.location.hash.split("#/")[1];
            switch(hash)
            {
              case model + '/list':
                // read
                dispatch({ 
                  type: 'readData'
                });
                break;
              default:
                break;
            }
          });
        }
      },
      effects: {
        //添加数据
        *createData({ type, ...createDesc }, { call, put }) {
          //确认添加形式
          const currentCreateDesc = Object.assign(defaultCreateDesc, createDesc);
          //添加数据
          const result = yield call(CURD.create, currentCreateDesc);
          //查询结果
          if(result.data.errno === 0)
            message.success("添加成功");
          else
            return message.error("添加数据失败");
        },
        //删除数据
        *deleteData({ type, id }, { call, put }) {
          //删除数据
          const result = yield call(CURD.delete_row, { model, id });
          //查询结果
          if(result.data.errno === 0)
            message.success("删除成功");
          else
            return message.error("删除数据失败");
        },
        //更新数据
        *updateData({ type, ...updateDesc }, { call, put }) {
          //确认更新形式
          const currentUpdateDesc = Object.assign(defaultUpdateDesc, updateDesc);
          //更新数据
          const result = yield call(CURD.update, currentUpdateDesc);
          //查询结果
          if(result.data.errno === 0)
            message.success("修改成功");
          else
            return message.error("修改数据失败");
        },
        //拉取数据
        *readData({ type, ...readDesc }, { call, put }) {
          //使用副本对象，防止默认对象defaultReadDesc被修改
          const defaultReadDescCopy = Object.assign({}, defaultReadDesc);
          //确认拉取形式
          const currentReadDesc = Object.assign(defaultReadDescCopy, readDesc);
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
            return message.error("读取数据失败");
          //订单列表分页信息
          const { count, pageSize, currentPage } = result.data.data;
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
        },
        //按id修改记录值
        changeDataValues(state, { values }) {
          const { id } = values; 
          let newState = Object.assign({}, state);
          newState.dataList.forEach((item) => {
            if(item.id === id){
              item = Object.assign(item, values);
            }
          });
          return newState;
        }
      }
    }
  };
  export default getModalDesc