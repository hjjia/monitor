import { routerConfig } from './router';
export interface itemType {
    key: string | number;
    label: string | number;
    icon?: string;
    children?: any[];
    router?: string;
}

let index = 0;
export const integralSider: itemType[] = [{
    key: `${index++}`,
    label: '首页',
    router: routerConfig.appHome,
    icon: ''
}, {
    key: `${index++}`,
    label: '订单管理',
    icon: '',
    children: [{
        key: `${index++}`,
        label: '订单审核',
        router: routerConfig.orderReview,
        icon: '',
    }, {
        key: `${index++}`,
        label: '订单列表',
        router: routerConfig.orderList,
        icon: '',
    }]
}, {
    key: `${index++}`,
    label: '提现订单管理',
    icon: '',
    children: [{
        key: `${index++}`,
        label: '订单审核',
        router: routerConfig.withdrawOrderAudit,
        icon: '',
    }, {
        key: `${index++}`,
        label: '订单列表',
        router: routerConfig.withdrawOrderList,
        icon: '',
    }]
}]