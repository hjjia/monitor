import { Dispatch } from 'redux';
import { http } from '../../common/http/http';
import { ApiUrls } from '../../common/http/ApiUrls';

import {
    GET_USER_INFO,
    UserInfoTypes,
    UserInfo
} from './types';

export function getUserInfo(userInfo: UserInfo): UserInfoTypes {
    return {
        type: GET_USER_INFO,
        payload: userInfo
    }
}

export function getUserInfoSuccess() {
    console.log('nihao')
    return (dispacth: Dispatch, getState: any) => {
        console.log(getState(), 'getState')
        return new Promise(() => {
            http.post(ApiUrls.userReport, {
            }).then((res) => {
                console.log(res, 'res')
            })
        })
    }
}