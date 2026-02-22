import { GeneralUsersStatusRequest, GeneralUsersStatusResponse } from "./auth.unterfaces";
import { GeneralMessageRequest, GeneralMessageResponse } from "./message.interface";
import { GeneralNotificationRequest, GeneralNotificationResponse } from "./notification.interface";
import { GeneralUserRequest, GeneralUserResponse } from "./user.interface";

export type GeneralRequest =
    | GeneralMessageRequest
    | GeneralNotificationRequest
    | GeneralUsersStatusRequest
    | GeneralUserRequest;

    export type GeneralResponse =
        | GeneralUsersStatusResponse
        | GeneralUserResponse
        | GeneralMessageResponse
        | GeneralNotificationResponse;