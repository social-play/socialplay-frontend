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
} from "./interfaces";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const appTitle: string = "info site";
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: string
  ) => {
    e.preventDefault();
    if (uploadFile.file) {
      let formData = new FormData();
      formData.append("file", uploadFile.file);
      formData.append("fileName", uploadFile.file.name);
      formData.append("id", userId);

      await axios.post(`${backendUrl}/uploadFile/${userId}`, formData, {
        withCredentials: true,
      });

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
            title: rawNewGamesPost.title,
            description: rawNewGamesPost.description,
            language: rawNewGamesPost.language,
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
            title: rawNewGamesPost.title,
            description: rawNewGamesPost.description,
            language: rawNewGamesPost.language,
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
      title: gamesPost.title,
      description: gamesPost.description,
      language: gamesPost.language,
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
          title: gamesPost.originalEditFields.title,
          description: gamesPost.originalEditFields.description,
          language: gamesPost.originalEditFields.language,
        },
        { withCredentials: true }
      );
      // if saved in backend, update in frontend
      gamesPost.title = gamesPost.originalEditFields.title;
      gamesPost.description = gamesPost.originalEditFields.description;
      gamesPost.language = gamesPost.originalEditFields.language;

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
  };

  // newGamesPost inputs

  const handleAddGamesPostFieldsChange = (
    fieldIdCode: string,
    newGamesPost: IEditGamePost,
    value: string
  ) => {
    newGamesPost[fieldIdCode as keyof IEditGamePost] = value;
    setNewGamesPost({ ...newGamesPost });
  };

  // post a newGamesPost by click

  const handleSaveNewGamesPost = async () => {
    try {
      await axios.post(
        `${backendUrl}/gamesPost`,
        {
          title: newGamesPost.title,
          description: newGamesPost.description,
          language: newGamesPost.language,
          numberOfPages: 0,
          imageUrl:
            "https://edwardtanguay.vercel.app/share/images/books/no-image.jpg",
          buyUrl: "",
        },
        { withCredentials: true }
      );
      loadGamesPosts();
      setIsAdding(false);
      setNewGamesPost({ ...blankNewGamesPost });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const loginAsAdmin = async (onSuccess: () => void, onFailure: () => void) => {
    try {
      await axios.post(
        `${backendUrl}/login`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAdminIsLoggedIn(true);
      onSuccess();
    } catch (error: any) {
      switch (error.code) {
        case "ERR_BAD_REQUEST":
          onFailure();
          break;
        default:
          break;
      }
      setAdminIsLoggedIn(false);
    }
    setPassword("");
  };

  const logoutAsAdmin = () => {
    (async () => {
      try {
        setAdminIsLoggedIn(false);
        await axios.get(`${backendUrl}/logout`, { withCredentials: true });
      } catch (error) {
        console.log("GENERAL ERROR");
      }
    })();
  };

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
        loginAsAdmin,
        adminIsLoggedIn,
        setPassword,
        logoutAsAdmin,
        uploadFile,
        setUploadFile,
        handleSubmit,
        handleFileChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
