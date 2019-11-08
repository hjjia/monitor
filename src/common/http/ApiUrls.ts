interface ApiUrlTypes {
    orderAuditList: string;
    appList: string;
    orderAudit: string;
    [key: string]: any;
}
export const ApiUrls: ApiUrlTypes = {
    appList: '/shop/getGameAppInfoList', // appList
    orderAuditList: '/domestic/getOrderList', // 待审核订单
    orderAudit: '/domestic/orderAudit', // 订单审核
    withdrawOrderAudit: `/domestic/withdraw/withdrawOrderAudit`, // 提现订单审核
    withdrawList: `/domestic/withdraw/getWithdrawList`, // 提现订单列表
}