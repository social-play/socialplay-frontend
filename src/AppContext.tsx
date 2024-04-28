import { createContext } from "react";
import { useEffect, useState } from "react";
import {
  IAppContext,
  IAppProvider,
  IGamesPosts,
  IEditGamePost,
  blankNewGamesPost,
  IUploadFile,
  _initialUploadFile,
  IUser,
} from "./interfaces";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrlOnline = import.meta.env.VITE_BACKEND_URL_ONLINE;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const appTitle: string = "Social Play";
  const [gamesPosts, setGamesPosts] = useState<IGamesPosts[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGamesPost, setNewGamesPost] =
    useState<IEditGamePost>(blankNewGamesPost);
  const [password, setPassword] = useState("");
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

  // upload file MULTER
  const [uploadFile, setUploadFile] = useState<IUploadFile>({
    ..._initialUploadFile,
  });
  // const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<IUser>({
    _id: "",
    userName: "",
    firstName: "",
    lastName: "",
    isOver16: false,
    captcha: false,
    accessGroups: [],
    fileName: "",
    email: "",
  });

  //local wegen bilder wird den link überschrieben
  // const [imageSrc, setImageSrc] = useState(
  //   `${backendUrl}/images/${currentUser.userName}.png`
  // );

  const [imageSrc, setImageSrc] = useState(
    `${backendUrlOnline}/images/${currentUser.userName}.png`
  );

  // dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [dropDownText, setDropDownText] = useState("Select Game...");
  const [dropDownTextConsole, setDropDownTextConsole] =
    useState("Select Console...");

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropDownConsole = () => {
    setIsConsoleOpen(!isConsoleOpen);
  };

  const refreshImage = () => {
    // let extension;
    // if (imageSrc.endsWith(".png")) {
    //   extension = ".png";
    // } else if (imageSrc.endsWith(".jpg")) {
    //   extension = ".jpg";
    // }
    if (currentUser.userName === "") {
      setImageSrc(
        `${backendUrlOnline}/images/anonymousUser.png?${Math.random()}`
      );
    } else {
      setImageSrc(
        `${backendUrlOnline}/images/${
          currentUser.userName
        }.png?${Math.random()}`
      );
    }
  };

  useEffect(() => {
    (async () => {
      const data = (
        await axios.get(`${backendUrl}/current-user`, {
          withCredentials: true,
        })
      ).data;
      const _currentUser = data.currentUser;
      setCurrentUser(_currentUser);
    })();
  }, []);

  useEffect(() => {
    refreshImage();
  }, [currentUser]);

  const handleLogoutButton = () => {
    (async () => {
      const data = (
        await axios.get(`${backendUrl}/logout`, {
          withCredentials: true,
        })
      ).data;
      const _currentUser = data.currentUser;
      if (_currentUser.userName === "anonymousUser") {
        setCurrentUser(_currentUser);
      } else {
        throw new Error("ERROR: no anonymous user");
      }
    })();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: string
  ) => {
    e.preventDefault();
    if (uploadFile.file) {
      let formData = new FormData();
      formData.append("file", uploadFile.file);
      formData.append("fileName", uploadFile.file.name);
      formData.append("userName", currentUser.userName);

      await axios.post(
        `${backendUrl}/uploadFile/${currentUser.userName}`,
        formData,
        {
          withCredentials: true,
        }
      );

      setUploadFile({ ..._initialUploadFile });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const _uploadFile = {
        file,
        preview: URL.createObjectURL(file),
      };
      setUploadFile(_uploadFile);
    } else {
      console.log("ERROR: files is null");
    }
  };

  // load newGamesPosts after adding newGamesPosts

  const loadGamesPosts = async () => {
    (async () => {
      const _newGamesPosts: IGamesPosts[] = [];
      const _rawNewGamesPosts = (await axios.get(`${backendUrl}/gamesPosts`))
        .data;
      _rawNewGamesPosts.forEach((rawNewGamesPost: any) => {
        const _newGamesPost: IGamesPosts = {
          ...rawNewGamesPost,
          isBeingEdited: false,
          originalEditFields: {
            roomId: rawNewGamesPost.roomId,
            WeSearch: rawNewGamesPost.WeSearch,
            weOffer: rawNewGamesPost.weOffer,
            contact: rawNewGamesPost.contact,
            language: rawNewGamesPost.language,
            game: rawNewGamesPost.game,
            console: rawNewGamesPost.console,
            numberOfPlayers: rawNewGamesPost.numberOfPlayers,
            author: rawNewGamesPost.author,
          },
        };
        _newGamesPosts.push(_newGamesPost);
      });
      setGamesPosts(_newGamesPosts);
    })();
  };

  useEffect(() => {
    loadGamesPosts();
  }, []);

  // data from backend with some adds
  useEffect(() => {
    (async () => {
      const _rawNewGamesPosts = (await axios.get(`${backendUrl}/gamesPosts`))
        .data;
      const _newGamesPosts: IGamesPosts[] = [];
      _rawNewGamesPosts.forEach((rawNewGamesPost: any) => {
        const gamesPost: IGamesPosts = {
          ...rawNewGamesPost,
          isBeingEdited: false,
          originalEditFields: {
            roomId: rawNewGamesPost.roomId,
            WeSearch: rawNewGamesPost.WeSearch,
            weOffer: rawNewGamesPost.weOffer,
            contact: rawNewGamesPost.contact,
            language: rawNewGamesPost.language,
            game: rawNewGamesPost.game,
            console: rawNewGamesPost.console,
            numberOfPlayers: rawNewGamesPost.numberOfPlayers,
          },
        };
        _newGamesPosts.push(gamesPost);
      });

      setGamesPosts(_newGamesPosts);
    })();
  }, []);

  // edit btn
  const handleEditGamesPost = (gamesPost: IGamesPosts) => {
    gamesPost.isBeingEdited = true;
    setGamesPosts([...gamesPosts]);
  };

  // cancel btn
  const handleCancelEditGamesPost = (gamesPost: IGamesPosts) => {
    gamesPost.isBeingEdited = false;
    // to reset any values that were changed
    gamesPost.originalEditFields = {
      roomId: gamesPost.roomId,
      WeSearch: gamesPost.WeSearch,
      weOffer: gamesPost.weOffer,
      contact: gamesPost.contact,
      language: gamesPost.language,
      game: gamesPost.game,
      console: gamesPost.console,
      author: gamesPost.author,
      numberOfPlayers: gamesPost.numberOfPlayers,
    };
    setGamesPosts([...gamesPosts]);
  };

  // save btn
  const handleSaveEditGamesPost = async (gamesPost: IGamesPosts) => {
    try {
      // save  in backend
      await axios.patch(
        `${backendUrl}/gamesPost/${gamesPost._id}`,
        {
          roomId: gamesPost.originalEditFields.roomId,
          WeSearch: gamesPost.originalEditFields.WeSearch,
          weOffer: gamesPost.originalEditFields.weOffer,
          contact: gamesPost.originalEditFields.contact,
          language: gamesPost.originalEditFields.language,
          game: gamesPost.originalEditFields.game,
          console: gamesPost.originalEditFields.console,
          numberOfPlayers: gamesPost.originalEditFields.numberOfPlayers,
          author: gamesPost.originalEditFields.author,
        },
        { withCredentials: true }
      );

      // if saved in backend, update in frontend
      gamesPost.roomId = gamesPost.originalEditFields.roomId;
      gamesPost.WeSearch = gamesPost.originalEditFields.WeSearch;
      gamesPost.weOffer = gamesPost.originalEditFields.weOffer;
      gamesPost.contact = gamesPost.originalEditFields.contact;
      gamesPost.language = gamesPost.originalEditFields.language;
      gamesPost.game = gamesPost.originalEditFields.game;
      gamesPost.console = gamesPost.originalEditFields.console;
      gamesPost.numberOfPlayers = gamesPost.originalEditFields.numberOfPlayers;
      gamesPost.author = gamesPost.originalEditFields.author;

      setGamesPosts([...gamesPosts]);
      gamesPost.isBeingEdited = false;
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // inputs
  const handleChangeEditGamesPost = (
    fieldIdCode: string,
    gamesPost: IGamesPosts,
    value: string
  ) => {
    gamesPost.originalEditFields[fieldIdCode as keyof IEditGamePost] = value;
    setGamesPosts([...gamesPosts]);
  };

  // delete BTN

  const handleDeleteGamesPost = async (gamesPost: IGamesPosts) => {
    try {
      await axios.delete(`${backendUrl}/gamesPost/${gamesPost._id}`, {
        withCredentials: true,
      });
      //filter undeleted gamePosts
      const _gamesPosts = gamesPosts.filter(
        (m: IGamesPosts) => m._id !== gamesPost._id
      );
      setGamesPosts(_gamesPosts);
    } catch (error) {}
  };

  // add BTN new GamesPost
  const handleToggleAddGamesPost = () => {
    setNewGamesPost({ ...blankNewGamesPost });
    setIsAdding(!isAdding);
    setDropDownText("Select Game...");
    setDropDownTextConsole("Select Console...");
  };

  // newGamesPost inputs

  const handleAddGamesPostFieldsChange = (
    fieldIdCode: string,
    newGamesPost: IEditGamePost,
    value: string
  ) => {
    newGamesPost[fieldIdCode as keyof IEditGamePost] = value;
    setNewGamesPost({ ...newGamesPost });
    setIsOpen(false);
    setIsConsoleOpen(false);
    if (newGamesPost.game.length > 0) {
      setDropDownText(newGamesPost.game);
    }
    if (newGamesPost.console.length > 0) {
      setDropDownTextConsole(newGamesPost.console);
    }
  };

  // post a newGamesPost by click

  const handleSaveNewGamesPost = async () => {
    if (
      !newGamesPost.roomId ||
      !newGamesPost.WeSearch ||
      !newGamesPost.weOffer ||
      !newGamesPost.contact ||
      !newGamesPost.language ||
      !newGamesPost.numberOfPlayers ||
      !newGamesPost.game ||
      !newGamesPost.console
    ) {
      alert("Please fill all required fields");
      return;
    }

    // TODO Check if roomId already exists
    //

    try {
      await axios.post(
        `${backendUrl}/gamesPost`,
        {
          roomId: newGamesPost.roomId,
          WeSearch: newGamesPost.WeSearch,
          weOffer: newGamesPost.weOffer,
          contact: newGamesPost.contact,
          language: newGamesPost.language,
          numberOfPlayers: newGamesPost.numberOfPlayers,
          imageUrl: imageSrc,
          game: newGamesPost.game,
          console: newGamesPost.console,
          author: currentUser.userName,
        },
        { withCredentials: true }
      );

      loadGamesPosts();
      setIsAdding(false);
      setNewGamesPost({ ...blankNewGamesPost });
      setDropDownText("Select Game...");
      setDropDownTextConsole("Select Console...");
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // const loginAsAdmin = async (onSuccess: () => void, onFailure: () => void) => {
  //   try {
  //     await axios.post(
  //       `${backendUrl}/login`,
  //       {
  //         password,
  //         //safeOriginCode: import.meta.env.VITE_SAFE_ORIGIN_CODE,
  //       },
  //       { withCredentials: true }
  //     );
  //     setAdminIsLoggedIn(true);

  //     onSuccess();
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case "ERR_BAD_REQUEST":
  //         onFailure();

  //         break;
  //       default:
  //         break;
  //     }
  //     setAdminIsLoggedIn(false);
  //   }
  //   setPassword("");
  // };

  // const logoutAsAdmin = () => {
  //   (async () => {
  //     try {
  //       await axios.get(`${backendUrl}/logout`, { withCredentials: true });
  //       setAdminIsLoggedIn(false);
  //     } catch (error) {
  //       console.log("GENERAL ERROR");
  //     }
  //   })();
  // };

  return (
    <AppContext.Provider
      value={{
        gamesPosts,
        appTitle,
        handleEditGamesPost,
        handleCancelEditGamesPost,
        handleSaveEditGamesPost,
        handleChangeEditGamesPost,
        handleToggleAddGamesPost,
        isAdding,
        newGamesPost,
        handleAddGamesPostFieldsChange,
        handleSaveNewGamesPost,
        handleDeleteGamesPost,
        password,
        // loginAsAdmin,
        // logoutAsAdmin,
        adminIsLoggedIn,
        setAdminIsLoggedIn,
        setPassword,
        uploadFile,
        setUploadFile,
        handleSubmit,
        handleFileChange,
        currentUser,
        setCurrentUser,
        handleLogoutButton,
        imageSrc,
        refreshImage,
        toggleDropDown,
        toggleDropDownConsole,
        isOpen,
        isConsoleOpen,
        setIsOpen,
        dropDownText,
        dropDownTextConsole,
        setIsConsoleOpen,
      }}>
      {children}
    </AppContext.Provider>
  );
};
