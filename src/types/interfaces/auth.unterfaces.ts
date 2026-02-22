import { UserAuth } from "@/app/enum/user-auth.enum";


export interface AllActiveUsersRequest {
    id: string;
    type: "USER_ACTIVE";
    payload: null;
}
export interface AllActiveUsersResponse {
    id: string;
    type: "USER_ACTIVE";
    payload: {
        users: [];
    };
}
export interface AllInactiveUsersResponse {
    id: string;
    type: "USER_INACTIVE";
    payload: {
        users: [];
    };
}

export interface AllInactiveUsersRequest {
    id: string;
    type: "USER_INACTIVE";
    payload: null;
}

export interface GeneralUsersStatusRequest{
    id: string,
    type: UserAuth
    payload:{users:[]} | null
}

export type GeneralUsersStatusResponse = AllActiveUsersResponse |AllInactiveUsersResponse