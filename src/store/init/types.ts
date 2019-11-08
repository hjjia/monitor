export interface AppType {
    appName: string;
    appId: string;
}

export interface InitState {
    appList?: AppType[];
    currentAppId?: string;
    [key: string]: any;
}

export const UPDATE_INIT_PARAMS = 'update/init/params';

interface UpdateInitParams {
    type: typeof UPDATE_INIT_PARAMS;
    payload: InitState;
}

export type InitTypes = UpdateInitParams;