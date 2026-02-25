import { UserType } from "../enum/user.enum";

export function checkingUserWithLS(): string | null {
  const id = localStorage.getItem(UserType.LOGGED_USER);
  return id;
}
