  import * as CURD from '../services/curd';
  import { message } from 'antd';
  const getModalDesc = (model, { defaultCreateDesc, defaultUpdateDesc, defaultReadDesc }) => {
    return {
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
          //刷新数据
          yield put({
            type: 'readData'
          });
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
          //刷新数据
          yield put({
            type: 'readData'
          });
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
          //刷新数据
          yield put({
            type: 'readData'
          });
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
          if(result.data.errno === 0){
            // message.success("读取信息成功");
          }
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
        },
        //读取字段信息
        *readColumn({ type, ...readDesc }, { call, put }) {
          //加载中状态
          yield put({ type: 'toggleLoading', loading: true });
          //拉取数据
          const result = yield call(CURD.readColumn, readDesc);
          //恢复正常状态
          yield put({ type: 'toggleLoading', loading: false });
          //查询结果
          if(result.data.errno === 0)
            message.success("读取信息成功");
          else
            return message.error("读取数据失败");
        },
        //修改字段排序
        *column({ type, ...changes }, { call, put }) {
          
        }
      },
      reducers: {
        change(state, data) {
          const newState = Object.assign({}, state);
          const { columnMatch } = state;
          for(const key in data)
          {
            if(key === "dataList" && typeof data[key] === "object" && data[key].length > 0)
            {
              const firstData = data[key][0];
              for(const key in firstData)
              {
                if(columnMatch.hasOwnProperty(key) === false)
                  columnMatch[key] = [key, true, 'varchar', true, "varchar", {width: 150}, true];
              }
            }
            newState[key] = data[key];
          }
          console.log("Model change", newState);
          return newState;
        },
        toggleLoading(state, { loading }) {
          const newState = Object.assign({}, state);
              newState.loading = loading;
          return newState;
        },
        //按id修改记录值
        changeDataValues(state, { values }) {
          const { id } = values; 
          const newState = Object.assign({}, state);
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