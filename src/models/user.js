import getModalDesc from './curd';

//命名空间
const namespace = "user";
//全局提示
const alertMessage = "您可以在这里查看访客";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 108;
//默认添加形式
const defaultCreateDesc = {
  model: namespace
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
         avatar: ["头像", true, 'image', true, "image", {width: 60}, true],
       username: ["用户名", true, 'varchar', true, "varchar", {width: 150}, true],
         gender: ["性别", true, 'varchar', true, "varchar", {width: 150}, true],
       birthday: ["生日", true, 'date_time', true, "varchar", {width: 180}, true],
  register_time: ["注册时间", true, 'date_time', true, "varchar", {width: 180}, true],
last_login_time: ["上次登录时间", true, 'date_time', true, "varchar", {width: 180}, true],
  last_login_ip: ["上次登陆ip", true, 'varchar', true, "varchar", {width: 150}, true],
  user_level_id: ["用户等级id", true, 'varchar', true, "varchar", {width: 150}, true],
       nickname: ["昵称", true, 'varchar', true, "varchar", {width: 150}, true],
         mobile: ["手机", true, 'varchar', true, "varchar", {width: 150}, true],
    register_ip: ["注册ip", true, 'varchar', true, "varchar", {width: 150}, true]

//     id: 43
//        username: 微信用户092b2bbe-1dea-40dd-848e-e10716a7db05
//        password: oGe284j8jvfzAGAS_N-0mWSQVtl4
//          gender: 1
//        birthday: 0
//   register_time: 1526059411
// last_login_time: 1526246109
//   last_login_ip: 
//   user_level_id: 0
//        nickname: 风猫
//          mobile: 
//     register_ip: 
//          avatar: https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLsKiag370r0iaGBzXR4ZPLxkxSRDc0r4pBBErFJWpI1Aib6hdMzpvpDwXnB7z9RI0ebcKiaXBOrJyCUA/132
//   weixin_openid: oGe284j8jvfzAGAS_N-0mWSQVtl4
//        add_time: 0
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
          if(hash === 'vip/list'){
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
