import { IMassage } from "@/types/interfaces";

export const mockMsg: IMassage = {
    from: "Jon Doe",
    to: "Jack Danialse",
    id: "1234568789218",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eligendi aut fuga, nulla nihil rerum molestias similique adipisci illo rem assumenda amet voluptatibus quas, praesentium doloribus iste eos dolorum ipsa.",
    datetime: 111220026,
    status: {
        isDelivered: true,
        isEdited: false,
        isReaded: true,
    },
};
export const mockMessages = [mockMsg];
