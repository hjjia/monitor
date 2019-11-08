import {
    UPDATE_ORDER_PARAMS,
    Orders,
    OrderTypes,
    OrderAuditTypes
} from './types';

export const initialAuditObj: OrderAuditTypes = {
    audit: [],
    aduitSelectOptions: {
        orderType: 0,
    },
    isAuditSubmit: false,
}
const initialState: Orders = {
    ...initialAuditObj,
}

export function orderReducer(
    state=initialState,
    action: OrderTypes
): Orders {
    switch (action.type) {
        case UPDATE_ORDER_PARAMS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}