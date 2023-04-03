import { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AppContext } from "../AppContext";

interface IPageLoginProps {
  baseUrl: string;
}

export const PageLogin = (props: IPageLoginProps) => {
  const { appTitle, setCurrentUser } = useContext(AppContext);
  const { baseUrl } = props;
  const [formMessage, setFormMessage] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (async () => {
      const data = (
        await axios.post(
          `${baseUrl}/login`,
          {
            userName,
            password,
            //safeOriginCode: import.meta.env.VITE_SAFE_ORIGIN_CODE,
          },
          { withCredentials: true }
        )
      ).data;
      const _currentUser = data.currentUser;
      if (_currentUser.userName === "anonymousUser") {
        setFormMessage("username or Password incorrect");
      } else {
        setCurrentUser(_currentUser);
        setFormMessage("");
        setUsername("");
        setPassword("");
        navigate("/members");
      }
    })();
  };

  useEffect(() => {
    setFormMessage("");
  }, [userName, password]);

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="pageLogin">
      <Helmet>
        <title>{appTitle} - Login</title>
      </Helmet>
      <form>
        <div className="row">
          <label>Username:</label>

          <input
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Password:</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="buttonRow">
          <button
            onClick={(e) => handleLoginButton(e)}
            className="py-2 px-4 text-xl font-bold text-blue-200 active:outline-none bg-blue-900 rounded-lg    hover:bg-blue-400 hover:text-blue-700 active:z-10 active:ring-4 active:ring-blue-500 dark:active:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Login
          </button>
          <div className="orLine pt-3">
            <span>OR</span>
          </div>
          <button
            type="button"
            onClick={handleGoToRegister}
            className="py-2 px-4 text-xl font-bold text-green-200 active:outline-none bg-green-900 rounded-lg hover:bg-green-400 hover:text-green-700 active:z-10 active:ring-4 active:ring-green-500 dark:active:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Create new account
          </button>
        </div>

        <div className="errorArea">{formMessage}</div>
      </form>
    </div>
  );
};
