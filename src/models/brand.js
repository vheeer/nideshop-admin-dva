import getModalDesc from './curd';

//命名空间
const namespace = "brand";
//全局提示
const alertMessage = "您可以在这里设置品牌";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 108;
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
                     id: ["ID", false, 'varchar required', true, {width: 120, fixed: 'left'}, "varchar", true],
                   name: ["名称", true, 'varchar', true, {width: 150, fixed: 'left'}, "varchar", true],
           list_pic_url: ["list_pic_url", true, 'image', true, {width: 150}, "image", true],
            simple_desc: ["简短描述", true, 'textArea', true, {width: 450}, "varchar", true],
               add_time: ["添加时间", true, 'varchar', false, {width: 180}, "date_time", false],
                pic_url: ["pic_url", true, 'image', true, {width: 150}, "image", true],
             sort_order: ["排序", true, 'varchar', true, {width: 150}, "varchar", true],
                is_show: ["是否显示", true, 'varchar', true, {width: 150}, "switch", true],
            floor_price: ["floor_price", true, 'varchar', true, {width: 150}, "varchar", true],
       app_list_pic_url: ["app_list_pic_url", true, 'image', true, {width: 150}, "image", true],
                 is_new: ["新品", true, 'varchar', true, {width: 150}, "switch", true],
            new_pic_url: ["new_pic_url", true, 'image', true, {width: 150}, "image", true],
         new_sort_order: ["new_sort_order", true, 'number', true, {width: 150}, "varchar", true],
    };
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][4]["width"]:0);
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
    loading: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let fun = location => {
        if(typeof fun["executed"] === "undefined"){
          const hash = window.location.hash.split("#/")[1];
          if(hash === 'shop/brand'){
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
