import {
    GET_USER_INFO,
    UserInfo,
    UserInfoTypes
} from './types';

const initialState: UserInfo = {
    name: '',
    id: '',
    limit: 0,
}

export function userReducer(
    state=initialState,
    action: UserInfoTypes
): UserInfo {
    switch (action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}