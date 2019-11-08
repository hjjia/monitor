export interface UserInfo {
    name: string
    id: string
    limit: number
}

export const GET_USER_INFO = 'GET_USER_INFO';

interface GetUserInfo {
    type: typeof GET_USER_INFO,
    payload: UserInfo
}

export type UserInfoTypes = GetUserInfo;