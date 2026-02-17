export interface Message {
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

export interface MessageSendUserRequest {
    id: string;
    type: "MSG_SEND";
    payload: {
        message: {
            to: string;
            text: string;
        };
    };
}
export interface MessageSendUserResponse {
    id: string;
    type: "MSG_SEND";
    payload: {
        message: Message;
    };
}
export interface MessageSendUserResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface MessageFromUserRequest {
    id: null;
    type: "MSG_SEND";
    payload: {
        message: Message;
    };
}
export interface MessageHistoryFromUserRequest {
    id: string;
    type: "MSG_FROM_USER";
    payload: {
        user: {
            login: string;
        };
    };
}

export interface MessageHistoryFromUserResponse {
    id: string;
    type: "MSG_FROM_USER";
    payload: {
        messages: [];
    };
}
export interface MessageHistoryFromUserResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface MessageCountNotReadFromUserRequest {
    id: string;
    type: "MSG_COUNT_NOT_READED_FROM_USER";
    payload: {
        user: {
            login: string;
        };
    };
}
export interface MessageCountNotReadFromUserResponse {
    id: string;
    type: "MSG_COUNT_NOT_READED_FROM_USER";
    payload: {
        count: number;
    };
}
export interface MessageCountNotReadFromUserResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}

export interface MessageDeleteRequest {
    id: string;
    type: "MSG_DELETE";
    payload: {
        message: {
            id: string;
        };
    };
}
export interface MessageDeleteResponse {
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
export interface MessageDeleteResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface MessageChangeResponseRequest {
    id: string;
    type: "MSG_EDIT";
    payload: {
        message: {
            id: string;
            text: string;
        };
    };
}
export interface MessageChangeResponseResponse {
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
export interface MessageChangeResponseResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
