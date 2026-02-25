// Ответы сервера в случае ошибок запроса
export interface ErrorServer {
  id: string | null;
  type: "ERROR";
  payload: {
    error: string;
  };
}

export interface ErrorIncorrectStructureRequest extends ErrorServer {
  payload: {
    error: "incorrect request structure";
  };
}
