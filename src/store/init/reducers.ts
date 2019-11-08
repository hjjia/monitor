import {
    InitState,
    InitTypes,
    UPDATE_INIT_PARAMS,
} from './types';

const initState: InitState = {
    appList: [{
        appName: '萌宠趣消消',
        appId: '111'
    },{
        appName: '成语大接龙',
        appId: '2222'
    },],
    currentAppId: 'ios',
};

export function initReducer(
    state = initState, action: InitTypes
): InitState {
    switch (action.type) {
        case UPDATE_INIT_PARAMS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}