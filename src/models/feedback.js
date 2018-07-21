import getModalDesc from './curd';
import menuConfig from '../menuConfig';

//命名空间
const namespace = "feedback";
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
      parent_id: ["parent_id", true, 'varchar', true, "varchar", {width: 150}, true],
        user_id: ["用户ID", true, 'varchar', true, "varchar", {width: 150}, true],
      user_name: ["用户名", true, 'varchar', true, "varchar", {width: 150}, true],
     user_email: ["用户邮箱", true, 'varchar', true, "varchar", {width: 150}, true],
      msg_title: ["标题", true, 'varchar', true, "varchar", {width: 150}, true],
       msg_type: ["msg_type", true, 'varchar', true, "varchar", {width: 150}, true],
     msg_status: ["msg_status", true, 'varchar', true, "varchar", {width: 150}, true],
    msg_content: ["内容", true, 'varchar', true, "varchar", {width: 150}, true],
       msg_time: ["时间", true, 'varchar', true, "varchar", {width: 150}, true],
    message_img: ["图片", true, 'image', true, "image", {width: 150}, true],
       order_id: ["单号", true, 'varchar', true, "varchar", {width: 150}, true],
       msg_area: ["msg_area", true, 'varchar', true, "varchar", {width: 150}, true],
       add_time: ["添加时间", true, 'date_time', true, "varchar", {width: 250}, true],
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
