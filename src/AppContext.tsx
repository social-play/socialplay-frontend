import { createContext } from "react";
import { useEffect, useState } from "react";
import {
  IAppContext,
  IAppProvider,
  IGamesPosts,
  IEditGamePost,
  blankNewBook,
} from "./interfaces";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const appTitle: string = "info site";
  const [gamesPosts, setGamesPosts] = useState<IGamesPosts[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGamesPost, setNewGamesPost] = useState<IEditGamePost>(blankNewBook);
  const [password, setPassword] = useState("");
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

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
        const book: IGamesPosts = {
          ...rawNewGamesPost,
          isBeingEdited: false,
          originalEditFields: {
            title: rawNewGamesPost.title,
            description: rawNewGamesPost.description,
            language: rawNewGamesPost.language,
          },
        };
        _newGamesPosts.push(book);
      });

      setGamesPosts(_newGamesPosts);
    })();
  }, []);

  // edit btn
  const handleEditBook = (book: IGamesPosts) => {
    book.isBeingEdited = true;
    setGamesPosts([...gamesPosts]);
  };

  // cancel btn
  const handleCancelEditBook = (book: IGamesPosts) => {
    book.isBeingEdited = false;
    // to reset any values that were changed
    book.originalEditFields = {
      title: book.title,
      description: book.description,
      language: book.language,
    };
    setGamesPosts([...gamesPosts]);
  };

  // save btn
  const handleSaveEditBook = async (book: IGamesPosts) => {
    try {
      // save  in backend
      await axios.patch(
        `${backendUrl}/gamesPost/${book._id}`,
        {
          title: book.originalEditFields.title,
          description: book.originalEditFields.description,
          language: book.originalEditFields.language,
        },
        { withCredentials: true }
      );
      // if saved in backend, update in frontend
      book.title = book.originalEditFields.title;
      book.description = book.originalEditFields.description;
      book.language = book.originalEditFields.language;

      setGamesPosts([...gamesPosts]);
      book.isBeingEdited = false;
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // inputs
  const handleChangeEditBook = (
    fieldIdCode: string,
    book: IGamesPosts,
    value: string
  ) => {
    book.originalEditFields[fieldIdCode as keyof IEditGamePost] = value;
    setGamesPosts([...gamesPosts]);
  };

  // delete BTN

  const handleDeleteBook = async (book: IGamesPosts) => {
    try {
      await axios.delete(`${backendUrl}/gamesPost/${book._id}`, {
        withCredentials: true,
      });
      const _books = gamesPosts.filter((m: IGamesPosts) => m._id !== book._id);
      setGamesPosts(_books);
    } catch (error) {}
  };

  // add BTN new Book
  const handleToggleAddBook = () => {
    setNewGamesPost({ ...blankNewBook });
    setIsAdding(!isAdding);
  };

  // newBook inputs

  const handleAddBookFieldsChange = (
    fieldIdCode: string,
    newGamesPost: IEditGamePost,
    value: string
  ) => {
    newGamesPost[fieldIdCode as keyof IEditGamePost] = value;
    setNewGamesPost({ ...newGamesPost });
  };

  // post a newBook by click

  const handleSaveNewBook = async () => {
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
      setNewGamesPost({ ...blankNewBook });
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
        handleEditBook,
        handleCancelEditBook,
        handleSaveEditBook,
        handleChangeEditBook,
        handleToggleAddBook,
        isAdding,
        newGamesPost,
        handleAddBookFieldsChange,
        handleSaveNewBook,
        handleDeleteBook,
        password,
        loginAsAdmin,
        adminIsLoggedIn,
        setPassword,
        logoutAsAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
