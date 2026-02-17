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
