import getModalDesc from './curd';

//命名空间
const namespace = "topic";
//全局提示
const alertMessage = "您可以在这里设置专题";
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
               id: ["ID", true, 'varchar required', true, {width: 80, fixed: 'left'}, "varchar", true],
            title: ["标题", true, 'varchar', true, {width: 120}, "varchar", true],
          content: ["内容", false, 'textArea', true, {width: 120}, "varchar", true],
           avatar: ["图标", true, 'image', true, {width: 120}, "image", true],
     item_pic_url: ["item_pic_url", true, 'image', true, {width: 120}, "image", true],
         subtitle: ["头部信息", true, 'varchar', true, {width: 400}, "varchar", true],
topic_category_id: ["所属分类", true, 'varchar', true, {width: 120}, "varchar", true],
       price_info: ["价格信息", true, 'varchar', true, {width: 120}, "varchar", true],
       read_count: ["read_count", true, 'varchar', true, {width: 120}, "varchar", true],
    scene_pic_url: ["scene_pic_url", true, 'image', true, {width: 120}, "image", true],
topic_template_id: ["topic_template_id", true, 'varchar', true, {width: 120}, "varchar", true],
     topic_tag_id: ["topic_tag_id", true, 'varchar', true, {width: 120}, "varchar", true],
       sort_order: ["排序", true, 'varchar', true, {width: 120}, "sort_order", true],
          is_show: ["显示", true, 'varchar', true, {width: 120}, "switch", true],
         add_time: ["添加时间", false, 'varchar', true, {width: 180}, "date_time", true],
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
          if(hash === 'shop/topic'){
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
