export interface Msg {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
    };
}

export interface MsgSendUserRequest {
    id: string;
    type: "MSG_SEND";
    payload: {
        message: {
            to: string;
            text: string;
        };
    };
}
export interface MsgSendUserResponse {
    id: string;
    type: "MSG_SEND";
    payload: {
        message: Msg;
    };
}
export interface MsgSendUserResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface MsgFromUserRequest {
    id: null;
    type: "MSG_SEND";
    payload: {
        message: Msg;
    };
}
export interface MsgHistoryFromUserRequest {
    id: string;
    type: "MSG_FROM_USER";
    payload: {
        user: {
            login: string;
        };
    };
}

export interface MsgHistoryFromUserResponse {
    id: string;
    type: "MSG_FROM_USER";
    payload: {
        messages: [];
    };
}
export interface MsgHistoryFromUserResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface MsgCountNotReadFromUserRequest {
    id: string;
    type: "MSG_COUNT_NOT_READED_FROM_USER";
    payload: {
        user: {
            login: string;
        };
    };
}
export interface MsgCountNotReadFromUserResponse {
    id: string;
    type: "MSG_COUNT_NOT_READED_FROM_USER";
    payload: {
        count: number;
    };
}
export interface MsgCountNotReadFromUserResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}

export interface MsgDeleteRequest {
    id: string;
    type: "MSG_DELETE";
    payload: {
        message: {
            id: string;
        };
    };
}
export interface MsgDeleteResponse {
    id: string;
    type: "MSG_DELETE";
    payload: {
        message: {
            id: string;
            status: {
                isDeleted: boolean;
            };
        };
    };
}
export interface MsgDeleteResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface MsgChangeResponseRequest {
    id: string;
    type: "MSG_EDIT";
    payload: {
        message: {
            id: string;
            text: string;
        };
    };
}
export interface MsgChangeResponseResponse {
    id: string;
    type: "MSG_EDIT";
    payload: {
        message: {
            id: string;
            text: string;
            status: {
                isEdited: boolean;
            };
        };
    };
}
export interface MsgChangeResponseResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
