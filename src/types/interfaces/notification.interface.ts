import { NotifyType } from "@/app/enum/notification.enum";

export interface NotificationMessageDeleteRequest {
    id: null;
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
export interface NotificationMessageReadDeliverRequest {
    id: null;
    type: "MSG_READ";
    payload: {
        message: {
            id: string;
            status: {
                isReaded: boolean;
            };
        };
    };
}
export interface NotificationMessageReadResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface NotificationMessageReadResponse {
    id: string;
    type: "MSG_READ";
    payload: {
        message: {
            id: string;
            status: {
                isReaded: boolean;
            };
        };
    };
}
export interface NotificationMessageDeliverRequest {
    id: null;
    type: "MSG_DELIVER";
    payload: {
        message: {
            id: string;
            status: {
                isDelivered: boolean;
            };
        };
    };
}
export interface NotificationMessageReadRequest {
    id: string;
    type: "MSG_READ";
    payload: {
        message: {
            id: string;
        };
    };
}
export interface NotificationMessageChangeRequest {
    id: null;
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

export interface GeneralNotificationRequest {
    id: string;
    type: NotifyType;
    payload: {
        message: {
            id: string;
            status?: {
                isDeleted?: boolean;
                isEdited?: boolean;
                isDelivered?: boolean;
                isReaded?:boolean
            };
        };
    };
}
export type GeneralNotificationResponse = NotificationMessageReadResponseError | NotificationMessageReadResponse