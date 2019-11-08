import { OrderTypeValues } from '../../common/config/order';
// 每笔订单的字段
export interface OrderType {
      onceWithdrawedCoin?: number | string;   // 单次提现趣币金额
      onceWithdrawedRmb?: number | string;  // 单次提现rmb金额,单位分
      orderId: string;   // // 订单号
      createTime?: number | string;   //提现日期时间戳，单位毫秒
      orderStatus?: number;  // 订单状态
      userId?: string;  
      goodsName?: string;  
      nickname?: string;  
      currentRmb?: number;   // 当前rmb，单位分
      currentCoin?: number;  // 当前趣币
      totalExchangeRmb?: number;  // 在商城已兑换的总值，包括已通过和未审核
      stageNum?: number;  // 游戏当前关卡数
      registerDate?: number;  // 注册时间，单位毫秒
      exchangeType?: number;  // 兑换类型，1微信提现，2话费， 3商品
      exchangeDetail?: string;  // 兑换详情
}

export interface AduitSelectOptionsType {
    orderType?: OrderTypeValues;
    AppId?: string;
}

export interface OrderAuditTypes {
    audit?: OrderType[];
    aduitSelectOptions?: AduitSelectOptionsType;
    isAuditSubmit?: boolean;
}

export interface Orders {
    audit?: OrderType[];
    aduitSelectOptions?: AduitSelectOptionsType;
    isAuditSubmit?: boolean;
}

export const UPDATE_ORDER_PARAMS = 'update/order/params';

interface UpdateOrderParams {
    type: typeof UPDATE_ORDER_PARAMS;
    payload: Orders;
}

export type OrderTypes = UpdateOrderParams;