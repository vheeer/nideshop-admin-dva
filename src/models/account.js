import { routerRedux } from 'dva/router';
import * as userService from '../services/user';
import { message } from 'antd';
import Cookies from 'js-cookie';
import config from '../config';
const { defaultId, defaultAcc } = config;
export default {
  namespace: 'account',
  state: {
    loginLoading: false,
    userName: '',
    id: ''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        let userName,id,login;
        //测试时使用默认登录态
        if(window.location.origin === "http://localhost:8000" || 1){
          userName = "zhangjizhe1993728@126.com";
          id = 14;
          dispatch({
            type: 'setUserName',
            userName: defaultAcc,
            id: defaultId
          });
        }else{
          //线上时使用cookie判断登录态
          userName = Cookies.get('userName');
          id = Cookies.get('id');
          login = Cookies.get('login');
          console.log("in www id& login", id, login);
          if(login === "1"){
            //已经登录
            dispatch({
              type: 'setUserName',
              userName: userName,
              id: id
            });
          }else if(login === "0"){
            dispatch(routerRedux.push('/login'));
          }else if(login === undefined){
            dispatch(routerRedux.push('/login'));
          }
        }
      })
    }
    
  },
  reducers: {
    'showLoginLoading'(state) {
      let newState = Object.assign({}, state);
        newState.loginLoading = true;
      return newState;
    },
    'hideLoginLoading'(state) {
      let newState = Object.assign({}, state);
        newState.loginLoading = false;
      return newState;
    },
    'setUserName'(state, { userName, id }) {
      let newState = Object.assign({}, state);
        newState.userName = userName;
        newState.id = id;
      return newState;
    }
  },
  effects: {
    *login ({ values }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      const mes = yield call(userService.login, values);
      yield put({ type: 'hideLoginLoading' });
      if(mes.data.mes === "success"){
        message.success("成功登录");
        yield put({ 
          type: 'setUserName', 
          userName: mes.data.data.userName,
          id: mes.data.data.id 
        });
        yield put({ type: 'main_data/fetch' });
        yield put(routerRedux.push('/goods/list'));//登录成功后跳到货物管理
      }else{
        message.error("登录失败");
      }
    },
    *register ({ values }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      const mes = yield call(userService.register, values);
      yield put({ type: 'hideLoginLoading' });
      if(mes.data.mes === "success"){
        message.success("注册成功并登录");
        yield put({ 
          type: 'setUserName', 
          userName: mes.data.data.userName,
          id: mes.data.data.id 
        });
        yield put(routerRedux.push('/goods/list'));//注册成功后跳到货物管理
        yield put({ 
          type: 'main_data/fetch'
        });
      }else{
        message.error("注册失败");
      }
    },
    *logout ({ values }, { call, put }) {
      const mes = yield call(userService.logout);
      if(mes.data.mes === "success"){
        message.success("退出成功");
        yield put({
          type: 'setUserName', 
          userName: undefined,
          id: undefined 
        });
        yield put(routerRedux.push('/login'));//退出成功后跳到登录页面
      }else{
        message.warning("系统异常");
      }
    },
    *changePSD ({ values }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      const mes = yield call(userService.changePSD, values);
      yield put({ type: 'hideLoginLoading' });
      if(mes.data.mes === "success"){
        message.success("更改密码成功");
        yield put(routerRedux.push('/goods/list'));//改密成功后跳到货物管理
      }else{
        message.error("更改密码失败");
      }
    },
  }
};