import { User } from "@/types/interfaces/user.interface";

export const loginValidator = (payload: User): boolean => {
  let isValid = false;

  const { login, password } = payload;

  if (typeof login === "string" && typeof password === "string") {
    isValid = true;
    return isValid;
  }

  return isValid;
};
