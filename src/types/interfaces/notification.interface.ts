export interface NotificationMsgDeleteRequest{
  id: null,
  type: "MSG_DELETE"
  payload: {
    message: {
      id: string,
      status: {
        isDeleted: boolean,
      }
    }
  }
}
export interface NotificationMsgReadDeliverRequest {
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
export interface NotificationMsgReadResponseError {
    id: string;
    type: "ERROR";
    payload: {
        error: string;
    };
}
export interface NotificationMsgReadResponse {
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
export interface NotificationMsgDeliverRequest {
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
export interface NotificationMsgReadRequest {
    id: string;
    type: "MSG_READ";
    payload: {
        message: {
            id: string;
        };
    };
}
export interface NotificationMsgChangeRequest{
  id: null,
  type: "MSG_EDIT"
  payload: {
    message: {
      id: string,
      text: string,
      status: {
        isEdited: boolean,
      }
    }
  }
}
