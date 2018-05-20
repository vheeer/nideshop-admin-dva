import getModalDesc from './curd';
import menuConfig from '../menuConfig';

//命名空间
const namespace = "others";
//全局提示
const alertMessage = "您可以在这里查看用户的反馈";
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
                      id: ["ID", true, 'varchar', true, "varchar required", {width: 120, fixed: 'left'}, true],
                    name: ["名称", true, 'varchar', true, "varchar", {width: 150}, true],
                 freight: ["运费", true, 'varchar', true, "money", {width: 150}, true],
             brand_title: ["制造商标题", true, 'varchar', true, "varchar", {width: 150}, true],
               new_title: ["新品标题", true, 'varchar', true, "varchar", {width: 150}, true],
               hot_title: ["热卖标题", true, 'varchar', true, "varchar", {width: 150}, true],
             topic_title: ["专题标题", true, 'varchar', true, "varchar", {width: 150}, true], 
                add_time: ["添加时间", true, 'date_time', true, "varchar", {width: 250}, true],
        service_policy_1: ["服务1", true, 'varchar', true, "varchar", {width: 170}, true],
        service_policy_2: ["服务2", true, 'varchar', true, "varchar", {width: 170}, true],
        service_policy_3: ["服务3", true, 'varchar', true, "varchar", {width: 170}, true],
         hot_goods_title: ["热品标题", true, 'varchar', true, "varchar", {width: 170}, true],
    hot_goods_bannar_url: ["热品大图", true, 'image', true, "image", {width: 170}, true],
         new_goods_title: ["新品标题", true, 'varchar', true, "varchar", {width: 170}, true],
    new_goods_bannar_url: ["新品大图", true, 'image', true, "image", {width: 170}, true],
};
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][5]["width"]:0);
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

          // 对应的路径
          let target_hash = "";
          menuConfig.forEach(firstPath => {
            const { href: href_1, children } = firstPath;
            if(children)
              children.forEach(secondPath => {
                const { href: href_2, model } = secondPath;
                if(model === namespace){
                  target_hash = href_2.split("#/")[1];
                }
              });
          });

          if(hash === target_hash){
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
