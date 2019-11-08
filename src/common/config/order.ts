interface OrderTypes {
    [key: string]: any;
}

export type OrderTypeValues = 0 | 1 | 2 | 3 | '0' | '1' | '2' | '3' | string | number;
export const orderTypesObj: OrderTypes = {
    0: '所有类型',
    1: '微信提现',
    2: '话费充值',
    3: '商品兑换',
}