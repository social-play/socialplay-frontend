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
  handleSaveEditGamesPost: (gamesPost: IGamesPosts) => void;
  handleChangeEditGamesPost: (
    fieldIdCode: string,
    gamesPost: IGamesPosts,
    value: string
  ) => void;
  handleToggleAddGamesPost: () => void;
  isAdding: boolean;
  newGamesPost: IEditGamePost;
  handleAddGamesPostFieldsChange: (
    fieldIdCode: string,
    newGamesPost: IEditGamePost,
    value: string
  ) => void;
  handleSaveNewGamesPost: () => void;
  handleDeleteGamesPost: (gamesPost: IGamesPosts) => void;
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

export const blankNewGamesPost: IEditGamePost = {
  title: "",
  description: "",
  language: "",
};
