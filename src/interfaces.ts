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
  // loginAsAdmin: (onSuccess: () => void, onFailure: () => void) => void;
  // logoutAsAdmin: () => void;
  adminIsLoggedIn: boolean;
  setAdminIsLoggedIn :(adminIsLoggedIn:boolean)=>void;
  setPassword: (password: string) => void;
  uploadFile: IUploadFile;
  setUploadFile: (file: IUploadFile) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentUser: IUser;
  setCurrentUser: (currentUser: IUser) => void;
  handleLogoutButton: () => void;
  imageSrc: string;
  refreshImage: () => void;
  toggleDropDown: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsConsoleOpen: (isConsoleOpen: boolean) => void;
  isConsoleOpen: boolean;
  toggleDropDownConsole: () => void;
  dropDownText: string;
  dropDownTextConsole: string;
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
  roomId: string;
  WeSearch: string;
  weOffer: string;
  contact: string;
  numberOfPlayers: string;
  language: string;
  imageUrl: string;
  console: string;
  languageText: string;
  isBeingEdited: boolean;
  originalEditFields: IEditGamePost;
  game: string;
  author: string;


}

export interface IGamesPostsEdit extends IGamesPosts {
  isAdminLogin:boolean
}

export interface IEditGamePost {
  roomId: string;
  WeSearch: string;
  weOffer: string;
  contact: string;
  language: string;
  game: string;
  console: string;
  numberOfPlayers: string;
  author: string;

}

export const blankNewGamesPost: IEditGamePost = {
  roomId: "",
  WeSearch: "",
  language: "",
  game: "",
  console: "",
  numberOfPlayers: "",
  weOffer: "",
  contact: "",
  author: "",

};
