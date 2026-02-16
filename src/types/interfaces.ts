
interface Profile{

}
export interface IMassage {

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

