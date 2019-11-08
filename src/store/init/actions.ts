import {
    InitState,
    InitTypes,
    UPDATE_INIT_PARAMS,
} from './types';

import { http } from '../../common/http/http';
import { ApiUrls } from '../../common/http/ApiUrls';


export function updateInitParams(newInfo: InitState): InitTypes {
    return {
        type: UPDATE_INIT_PARAMS,
        payload: newInfo
    }
}

export function getAppList() {
    return (dispatch: any, getState: any) => {
        return new Promise(() => {
            http.post(ApiUrls.appList).then((res: any) => {
                const { errorCode, errorMessage, data } = res;
                if (!errorCode && data) {
                    dispatch(updateInitParams({
                        appList: data.gameAppInfo
                    }))
                } else if (errorCode) {

                }
            })
        })
    }
}