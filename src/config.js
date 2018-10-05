'use strict';
let project = "onshop-dev/admin";
let host = "https://www.yinmudianying.club/" + project;
export default {
	project,
	host,
	defaultId: 14,
    defaultAcc: "zhangjizhe1993728@126.com",
    order_status_match: {
    	'0': '未付款',
        '101': '已取消',
        '102': '已删除',
        '201': '待发货',
        '300': '已发货',
        '301': '已收货',
        '401': '退款申请',
        '402': '退款申请',
        '403': '已退款'
    },
    pay_status_match: {
    	'0': '未支付',
    	'2': '已支付'
    },
    shipping_status_match: {
    	
    }
}