import * as goodsService from '../services/goods';
import { message } from 'antd';
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
        switch(hash)
        {
          case 'goods/list':
            dispatch({
              type: 'getCategory'
            });
            dispatch({
              type: 'specification/readData',
              pageSize: 999
            });
            break;
          default:
            break;
        }
      });
    }
  },
  effects: {
    //拉取所有分类数据
    *getCategory({ topCategoryFocusId }, { call, put }) {
      const result = yield call(goodsService.category);
      const category = result.data.data;
      let topCategory = [];
      let firstCategory = [];
      //生成顶级、一级分类
      category.forEach((item) => {
        if(item.level === "L1"){
          if(!topCategoryFocusId)
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
    },
    //点击顶级分类后改变一级分类（无需拉取）
    *changeTopCategoryFoucs({ topCategoryFocusId }, { call, put }) {
      yield put({
        type: '_changeTopCategoryFoucs',
        topCategoryFocusId
      });
    },
    //点击一级分类后获取商品列表
    *getGoodsByFirstCategory({ firstCategoryFocusId, clearGoodsFocusId }, { call, put }) {
      // 清空商品焦点
      if(clearGoodsFocusId)
        yield put({
          type: 'changeGoodsFoucs',
          goodsFocusId: null
        });
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
      // 改变当前商品描述
      yield put({
        type: 'changeGoodsDesc'
      });
    },
    //点击商品后改变商品展示图列表以及商品描述
    *getGalleryByGood({ goodsFocusId }, { call, put }) {
      yield put({
        type: 'changeGoodsFoucs',
        goodsFocusId
      });
      const result = yield call(goodsService.getGalleryByGood, { goods_id: goodsFocusId });
      const galleryList = result.data.data.data;
      // 相关规格
      yield put({
        type: 'goods_specification/readData',
        pageSize: 999,
        key: 'goods_id',
        value: goodsFocusId
      });
      // 相关产品
      yield put({
        type: 'product/readData',
        pageSize: 999,
        key: 'goods_id',
        value: goodsFocusId
      });
      // 改变当前展示图列表
      yield put({
        type: 'changeGalleryList',
        galleryList
      });
      // 改变当前商品描述
      yield put({
        type: 'changeGoodsDesc'
      });
    },
    //点击保存后提交一级分类属性
    *postCategoryValues({ values }, { call, put }) {
      yield put({
        type: 'changeCategoryValues',
        values
      });
      const result = yield call(goodsService.postCategoryValues, { values });
      const { errno, data } = result.data;
      if(errno === 0 && data === 1) {
        message.success("修改分类信息成功");
      }else{
        message.error("修改信息失败，请刷新网页");
      }
      console.log("postCategoryValues result ", result);
    },
    //点击保存后提交商品属性
    *postGoodsValues({ values }, { call, put }) {
      yield put({
        type: 'changeGoodsValues',
        values
      });
      const result = yield call(goodsService.postGoodsValues, { values });
      const { errno, data } = result.data;
      if(errno === 0 && data === 1) {
        message.success("修改商品信息成功");
      }else{
        message.error("修改信息失败，请刷新网页");
      }
      console.log("postGoodsValues result ", result);
    },
    //添加顶级分类
    *addTopCategory(param = null, { call, put }) {
      const result = yield call(goodsService.addCategory, {});
      const { errno, data, data: topCategoryObj } = result.data;
      if(errno === 0 && data) {
        message.success("添加分类成功");
      }else{
        message.error("添加分类失败，请刷新网页");
      }
      yield put({
        type: '_addTopCategory',
        topCategoryObj
      });
      console.log("addTopCategory result ", result);
    },
    //添加一级分类
    *addFirstCategory({ topCategoryFocusId }, { call, put }) {
      const result = yield call(goodsService.addCategory, { parent_id: topCategoryFocusId });
      const { errno, data, data: firstCategoryObj } = result.data;
      if(errno === 0 && data){
        message.success("添加分类成功");
      }else{
        message.error("添加分类失败，请刷新网页");
      }
      yield put({
        type: '_addFirstCategory',
        firstCategoryObj
      });
      console.log("firstTopCategory result ", result);
    },
    //添加商品
    *addGoods({ firstCategoryFocusId }, { call, put }) {
      const result = yield call(goodsService.addGoods, { category_id: firstCategoryFocusId });
      const { errno, data, data: goodsObj } = result.data;
      if(errno === 0 && data){
        message.success("添加商品成功");
      }else{
        message.error("添加商品失败，请刷新网页");
      }
      yield put({
        type: '_addGoods',
        goodsObj
      });
      console.log("addGoods result ", result);
    },
    *deleteGallery({ galleryId }, { call, put }) {
      const result = yield call(goodsService.deleteGallery, { galleryId });
      const { errno, data } = result.data;
      if(errno === 0 && data){
        message.success("删除图片成功");
      }else{
        message.error("删除图片失败，请刷新网页");
      }
      console.log("deleteGallery result ", result);
    },
    *deleteGoods({ goodsId }, { call, put }) {
      const result = yield call(goodsService.deleteGoods, { goodsId });
      const { errno, data } = result.data;
      if(errno === 0 && data){
        message.success("删除商品成功");
      }else{
        message.error("删除商品失败，请刷新网页");
      }
      console.log("deleteGoods result ", result);
    },
    *deleteCategory({ categoryId }, { call, put }) {
      const result = yield call(goodsService.deleteCategory, { categoryId });
      const { errno, data } = result.data;
      if(errno === 0 && data){
        message.success("删除分类成功");
      }else{
        message.error("删除分类失败，请刷新网页");
      }
      console.log("deleteCategory result ", result);
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
    _changeTopCategoryFoucs(state, { topCategoryFocusId }) {
      let newState = Object.assign({}, state);
          newState.topCategoryFocusId = topCategoryFocusId;
      console.log("Model _changeTopCategoryFoucs", newState);
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
    },
    changeGoodsDesc(state, { goods_desc }) {
      const { goodsFocusId, goodsList } = state;
      let newState = Object.assign({}, state);
      if(goods_desc){
        //使用传入的商品描述
        newState.goods_desc = goods_desc;
      }else{
        //使用当前选中的商品的描述
        const filterGoodsList = goodsList.filter(item => {
          if(item.id === parseInt(goodsFocusId, 10))
            return true;
          else
            return false;
        });
        if(filterGoodsList.length === 1)
          newState.goods_desc = filterGoodsList[0].goods_desc;
      }
      console.log("Model changeGoodsDesc", newState);
      return newState;
    },
    clearGoodsDesc(state) {
      let newState = Object.assign({}, state);
        newState.goods_desc = null;
      return newState;
    },
    changeCategoryValues(state, { values }) {
      const { id: categoryId } = values; 
      let newState = Object.assign({}, state);
        newState.firstCategory.forEach((item) => {
          if(item.id === categoryId){
            item = Object.assign(item, values);
          }
        });
        newState.topCategory.forEach((item) => {
          if(item.id === categoryId){
            item = Object.assign(item, values);
          }
        });
      return newState;
    },
    changeGoodsValues(state, { values }) {
      const { id: goodsId } = values; 
      let newState = Object.assign({}, state);
        newState.goodsList.forEach((item) => {
          if(item.id === goodsId){
            item = Object.assign(item, values);
          }
        });
      return newState;
    },
    _addTopCategory(state, { topCategoryObj }) {
      let newState = Object.assign({}, state);
        newState.topCategory.push(topCategoryObj);
      return newState;
    },
    _addFirstCategory(state, { firstCategoryObj }) {
      let newState = Object.assign({}, state);
        newState.firstCategory.push(firstCategoryObj);
      return newState;
    },
    _addGoods(state, { goodsObj }) {
      let newState = Object.assign({}, state);
        newState.goodsList.push(goodsObj);
      return newState;
    }
  },

};
