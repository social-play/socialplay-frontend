export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  isOver16: boolean;
  captcha: boolean;
  accessGroups: string[];
}
