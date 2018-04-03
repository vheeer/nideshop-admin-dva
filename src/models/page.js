import menuConfig from '../menuConfig.json';
export default {

  namespace: 'page',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const hash = window.location.hash.split("#/")[1];
        let defaultKey = [];
        let openDefaultKey = [];
        let firstBreadcrumbItem = "";
        let secondBreadcrumbItem = "";
        let dir_1 = hash.split("/")[0];
        switch(dir_1)
        {
          case "login":
            break;
          case "rigister":
            break;
          case "changePSD":
            break;
          default:
            //进入页面时自动选中
            defaultKey = [hash?"#/"+hash:"#/"];
            openDefaultKey = [dir_1?dir_1:"#/"];
            //导航
            menuConfig.map(supMenu => {
              if(supMenu.href === openDefaultKey[0]){
                firstBreadcrumbItem = supMenu.word;
              }
              if(!supMenu.children){
                
              }else{
                supMenu.children.map(subMenu => {
                  if(subMenu.href === defaultKey[0]){
                    secondBreadcrumbItem = subMenu.word;
                  }
                  return null;
                });
              }
              return null;
            });
            break;
        }
        dispatch({
          type: 'changePage',
          openDefaultKey,
          openKeys: openDefaultKey,
          selectedKeys: defaultKey,
          firstBreadcrumbItem,
          secondBreadcrumbItem
        });
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    // 切换选项卡
    changePage(state, obj) {
      let newState = Object.assign({}, state);
      for(let key in obj)
      {
        newState[key] = obj[key];
      }
      console.log("新的model page", newState);
      return newState;
    },
  },

};
