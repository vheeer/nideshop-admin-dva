import menuConfig from '../menuConfig.json';
import * as goodsService from '../services/goods';
export default {

  namespace: 'goods',

  state: {
    topCategory: [],
    firstCategory: [],
    goodsList: [],
    galleryList: [],
    topCategoryFocusId: null,
    firstCategoryFocusId: null,
    goodsFocusId: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const hash = window.location.hash.split("#/")[1];
        const dir_1 = hash.split("/")[0];
        switch(hash)
        {
          case 'goods/list':
            dispatch({
              type: 'getCategory'
            });
            break;
        }
      });
    }
  },
  effects: {
    //点击商品后获取展示图列表
    *getGalleryByGood({ GoodsFocusId }, { call, put }) {
      yield put({
        type: 'changeGoodsFoucs',
        GoodsFocusId
      });
      const result = yield call(goodsService.getGalleryByGood, { goods_id: GoodsFocusId });
      const galleryList = result.data.data.data;
      yield put({
        type: 'changeGalleryList',
        galleryList
      });
    },
    //点击一级分类后获取商品列表
    *getGoodsByFirstCategory({ firstCategoryFocusId }, { call, put }) {
      yield put({
        type: 'changeFirstCategoryFoucs',
        firstCategoryFocusId
      });
      const result = yield call(goodsService.getGoodsByFirstCategory, { category_id: firstCategoryFocusId });
      const goodsList = result.data.data.data;
      yield put({
        type: 'changeGoodsList',
        goodsList
      });
    },
    //拉取所有分类数据
    *getCategory(data, { call, put }) {
      const result = yield call(goodsService.category);
      const category = result.data.data;
      let topCategory = [];
      let firstCategory = [];
      let topCategoryFocusId = null;
      //生成顶级、一级分类
      category.map((item) => {
        if(item.level === "L1"){
          if(topCategoryFocusId === null)
            topCategoryFocusId = item.id;
          topCategory.push(item);
        }else if(item.level === "L2"){
          firstCategory.push(item);
        }
      });
      yield put({
        type: 'init', 
        topCategory, 
        firstCategory, 
        topCategoryFocusId
      });
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
    },
    changeTopCategoryFoucs(state, { topCategoryFocusId }) {
      let newState = Object.assign({}, state);
          newState.topCategoryFocusId = topCategoryFocusId;
      console.log("Model changeTopCategoryFoucs", newState);
      return newState;
    },
    changeFirstCategoryFoucs(state, { firstCategoryFocusId }) {
      let newState = Object.assign({}, state);
          newState.firstCategoryFocusId = firstCategoryFocusId;
      console.log("Model changeFirstCategoryFoucs", newState);
      return newState;
    },
    changeGoodsFoucs(state, { goodsFocusId }) {
      let newState = Object.assign({}, state);
          newState.goodsFocusId = goodsFocusId;
      console.log("Model changeGoodsFoucs", newState);
      return newState;
    },
    changeGoodsList(state, { goodsList }) {
      let newState = Object.assign({}, state);
          newState.goodsList = goodsList;
      console.log("Model changeGoodsList", newState);
      return newState;
    },
    changeGalleryList(state, { galleryList }) {
      let newState = Object.assign({}, state);
          newState.galleryList = galleryList;
      console.log("Model changeGalleryList", newState);
      return newState;
    }
  },

};
