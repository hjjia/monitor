import { Dispatch } from 'redux';
import { message } from 'antd';
import { http } from '../../common/http/http';
import { ApiUrls } from '../../common/http/ApiUrls';

import {
    UPDATE_ORDER_PARAMS,
    OrderTypes,
    Orders,
} from './types';

export function updateOrderParams(orderObj: Orders): OrderTypes {
    return {
        type: UPDATE_ORDER_PARAMS,
        payload: orderObj
    }
}

/**
 * 获取待审核订单
 */
export function getOrderAuditsList() {
    
    return (dispatch: Dispatch, getState: any) => {
        const { init, order } =  getState();
        const { aduitSelectOptions } = order;
        const appId = init.currentAppId;
        const orderType = aduitSelectOptions.orderType;
        dispatch(updateOrderParams({
            isAuditSubmit: true,
            audit: [],
        }));
        return new Promise(() => {
            http.post(ApiUrls.orderAuditList, {
                appId,
                orderType,
            }).then((res: any) => {
                dispatch(updateOrderParams({
                    isAuditSubmit: false,
                }));
                const { errorCode, errorMessage, data } = res;
                if (!errorCode && data) {
                    dispatch(updateOrderParams({
                        audit: data.withdrawRecordArray,
                    }))
                } else if (errorCode && !data) {
                }
                
            })
        })
    }
}

/**
 * 审核订单
 */
export function auditSubmit(obj: { orderId: string, auditStatus: number | string}) {
    return (dispatch: Dispatch, getState: any) => {
        const { init, order } =  getState();
        const appId = init.currentAppId;

        const { orderId, auditStatus } = obj;

        return new Promise(() => {
            dispatch(updateOrderParams({
                isAuditSubmit: true,
            }));
            http.post(ApiUrls.orderAudit, {
                appId,
                orderId,
                auditStatus,
            }).then((res: any) => {
                console.log(res, 'res')
                const { errorCode, errorMessage, data } = res;
                if (!errorCode) {
                    const { audit } = order;
                    for (let i = 0, len = audit.length; i < len; i++) {
                        if (audit[i].orderId === orderId) {
                            audit.splice(i,1);
                            break;
                        }
                    }
                    dispatch(updateOrderParams({
                        audit,
                        isAuditSubmit: false,
                    }));
                    message.success('操作成功')
                } else if (errorCode && !data) {
                    dispatch(updateOrderParams({
                        isAuditSubmit: false,
                    }));
                    message.error(errorMessage);
                }
            })
        })
    }
}