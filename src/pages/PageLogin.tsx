import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AppContext } from "../AppContext";

interface IPageLoginProps {
  baseUrl: string;
}

export const PageLogin = (props: IPageLoginProps) => {
  const { baseUrl } = props;
  const { appTitle, setCurrentUser } = useContext(AppContext);
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
            className="py-2 px-4 text-xl font-bold text-blue-200 bg-blue-800 rounded-lg hover:bg-blue-500 hover:text-blue-800">
            Login
          </button>
          <div className="orLine pt-3">
            <span>OR</span>
          </div>
          <button
            type="button"
            onClick={handleGoToRegister}
            className="py-2 px-4 text-xl font-bold text-green-200 bg-green-800 rounded-lg hover:bg-green-400 hover:text-green-800">
            Create new account
          </button>
        </div>

        <div className="errorArea">{formMessage}</div>
      </form>
    </div>
  );
};
