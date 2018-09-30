import getModalDesc from './curd';
import menuConfig from '../menuConfig';

//命名空间
const namespace = "post";
//全局提示
const alertMessage = "您可以在这里查看发帖";
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
                  id: ["ID", true, 'varchar', true, "varchar required", {width: 120}, true],
             user_id: ["用户ID", true, 'varchar', true, "varchar", {width: 120}, true],
              status: ["状态，1审核2通过", true, 'varchar', true, "varchar", {width: 150}, true],
               title: ["标题", true, 'varchar', true, "varchar", {width: 150}, true],
             content: ["内容", false, 'varchar', true, "varchar", {width: 150}, true],
          shop_title: ["店名", false, 'varchar', true, "varchar", {width: 150}, true],
           introduce: ["介绍", false, 'varchar', true, "varchar", {width: 150}, true],
         description: ["描述", true, 'pop', true, "varchar", {width: 150}, true],
        out_trade_no: ["订单号", false, 'varchar', true, "varchar", {width: 150}, true],
            position: ["位置坐标", true, 'varchar', true, "varchar", {width: 150}, true],
position_description: ["位置描述", true, 'varchar', true, "varchar", {width: 150}, true],
            contacts: ["联系人", true, 'varchar', true, "varchar", {width: 150}, true],
              mobile: ["联系方式", true, 'varchar', true, "varchar", {width: 150}, true],
       is_decoration: ["是否精装", true, 'varchar', true, "varchar", {width: 150}, true],
           is_rating: ["是否评级", true, 'varchar', true, "varchar", {width: 150}, true],
              is_top: ["是否置顶", true, 'varchar', true, "varchar", {width: 150}, true],
           top_level: ["置顶级别", true, 'varchar', true, "varchar", {width: 150}, true],
               level: ["等级", false, 'varchar', true, "varchar", {width: 150}, true],
     primary_img_url: ["主图", true, 'image', true, "image", {width: 150}, true],
              rating: ["评分", true, 'varchar', true, "varchar", {width: 150}, true],
                  up: ["赞数", true, 'varchar', true, "varchar", {width: 150}, true],
                view: ["浏览量", true, 'varchar', true, "varchar", {width: 150}, true],
              result: ["result", false, 'varchar', true, "varchar", {width: 150}, true],
              attach: ["attach", false, 'varchar', true, "varchar", {width: 150}, true],
          post_price: ["实际价格", true, 'varchar', true, "varchar", {width: 150}, true],
             referee: ["推荐人", true, 'varchar', true, "varchar", {width: 150}, true],
            add_time: ["添加时间", true, 'varchar', true, "varchar", {width: 150}, true],
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
            const { children } = firstPath;
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
