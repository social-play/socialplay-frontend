export interface IUser {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  isOver16: boolean;
  captcha: boolean;
  accessGroups: string[];
  fileName: string;
  email: string;
}

// gamesposts
export interface IAppProvider {
  children: React.ReactNode;
}

export interface IAppContext {
  gamesPosts: IGamesPosts[];
  appTitle: string;
  handleEditGamesPost: (gamesPost: IGamesPosts) => void;
  handleCancelEditGamesPost: (gamesPost: IGamesPosts) => void;
  handleSaveEditBook: (gamesPost: IGamesPosts) => void;
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
  uploadFile: IUploadFile;
  setUploadFile: (file: IUploadFile) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const _initialUploadFile: IUploadFile = {
  preview: "",
  file: null,
};
export interface IUploadFile {
  file: File | null;
  preview: string;
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
