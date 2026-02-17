export interface User {
    login: string;
    password?: string;
    isLogined?: boolean;
}

export interface UserAuthRequest {
    id: string;
    type: "USER_LOGIN";
    payload: {
        user: {
            login: string;
            password: string;
        };
    };
}
export interface UserAuthResponse {
    id: string;
    type: "USER_LOGIN";
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}
export interface UserAuthResponseErrors {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface UserLogoutRequest {
    id: string;
    type: "USER_LOGOUT";
    payload: {
        user: {
            login: string;
            password: string;
        };
    };
}
export interface UserLogoutResponse {
    id: string;
    type: "USER_LOGOUT";
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}
export interface UserLogoutResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: "there is no user with this login";
    };
}
export interface UserExternalLoginRequest {
    id: null;
    type: "USER_EXTERNAL_LOGIN";
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}
export interface UserExternalLogoutRequest {
    id: null;
    type: "USER_EXTERNAL_LOGOUT";
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}
