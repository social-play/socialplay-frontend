export interface IUser {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  isOver16: boolean;
  captcha: boolean;
  accessGroups: string[];
}

// gamesposts
export interface IAppProvider {
  children: React.ReactNode;
}

export interface IAppContext {
  gamesPosts: IGamesPosts[];
  appTitle: string;
  handleEditBook: (book: IGamesPosts) => void;
  handleCancelEditBook: (book: IGamesPosts) => void;
  handleSaveEditBook: (book: IGamesPosts) => void;
  handleChangeEditBook: (
    fieldIdCode: string,
    book: IGamesPosts,
    value: string
  ) => void;
  handleToggleAddBook: () => void;
  isAdding: boolean;
  newGamesPost: IEditGamePost;
  handleAddBookFieldsChange: (
    fieldIdCode: string,
    newGamesPost: IEditGamePost,
    value: string
  ) => void;
  handleSaveNewBook: () => void;
  handleDeleteBook: (book: IGamesPosts) => void;
  password: string;
  loginAsAdmin: (onSuccess: () => void, onFailure: () => void) => void;
  adminIsLoggedIn: boolean;
  setPassword: (password: string) => void;
  logoutAsAdmin: () => void;
}
export interface IGamesPosts {
  _id: string;
  title: string;
  description: string;
  numberOfPages: number;
  language: string;
  imageUrl: string;
  buyUrl: String;
  languageText: string;
  isBeingEdited: boolean;
  originalEditFields: IEditGamePost;
}

export interface IEditGamePost {
  title: string;
  description: string;
  language: string;
}

export const blankNewBook: IEditGamePost = {
  title: "",
  description: "",
  language: "",
};
