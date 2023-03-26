import "./styles/App.scss";
import "./tailwindGlobal.css";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Page404 } from "./pages/Page404";
import { PageWelcome } from "./pages/PageWelcome";
import { PageRegister } from "./pages/PageRegister";
import { PageLogin } from "./pages/PageLogin";
import { IUser } from "./interfaces";
import { useState, useEffect } from "react";
import axios from "axios";
import { PageConfirmRegistration } from "./pages/PageConfirmRegistration";
import { PageMembers } from "./pages/PageMembers";
import { FaSpinner } from "react-icons/fa";
import { PageLogout } from "./pages/PageLogout";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";
import { PageTeams } from "./pages/PageTeams";
import { PagePlayers } from "./pages/PagePlayers";
import { PageProfile } from "./pages/PageProfile";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [currentUser, setCurrentUser] = useState<IUser>({
    _id: "",
    userName: "",
    firstName: "",
    lastName: "",
    isOver16: false,
    captcha: false,
    accessGroups: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = (
        await axios.get(`${baseUrl}/current-user`, {
          withCredentials: true,
        })
      ).data;
      const _currentUser = data.currentUser;
      setCurrentUser(_currentUser);
    })();
  }, []);

  const handleLogoutButton = () => {
    (async () => {
      const data = (
        await axios.get(`${baseUrl}/logout`, {
          withCredentials: true,
        })
      ).data;
      const _currentUser = data.currentUser;
      if (_currentUser.userName === "anonymousUser") {
        setCurrentUser(_currentUser);
        navigate("/");
      } else {
        throw new Error("ERROR: no anonymous user");
      }
    })();
  };
  const pageIsLoaded = () => {
    return currentUser.userName !== "";
  };

  return (
    <div className="App">
      {/*   <h1 className="text-5xl font-bold text-blue-600">SocialPlay</h1> */}

      {/* {pageIsLoaded() && currentUser.userName !== "anonymousUser" && (
        <div className="userFullName">
          <span>
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </div>
      )} */}
      <nav>
        <div className="navRow">
          <NavLink to="/welcome">Welcome</NavLink>
          <NavLink to="/teamSearch">TEAMS</NavLink>
          <NavLink to="/playerSearch">PLAYERS</NavLink>
        </div>
        {!pageIsLoaded() && (
          <span className="navCommand">
            <span className="spinner">
              <FaSpinner />
            </span>
          </span>
        )}
        <div className="navRow">
          {(currentUser.accessGroups.includes("members") ||
            currentUser.accessGroups.includes("unconfirmedMembers")) && (
            <NavLink to="/members">Members</NavLink>
          )}
          {(currentUser.accessGroups.includes("members") ||
            currentUser.accessGroups.includes("unconfirmedMembers")) && (
            <NavLink to="/profile">Profile</NavLink>
          )}

          {currentUser.accessGroups.includes("loggedOutUsers") && (
            <NavLink to="/login">
              <span className="iconRow">
                <FiLogIn />
                Sign in
              </span>
            </NavLink>
          )}
          {currentUser.accessGroups.includes("loggedOutUsers") && (
            <NavLink to="/register">
              <span className="iconRow">
                <FiUserPlus />
                Sign up
              </span>
            </NavLink>
          )}
          {currentUser.accessGroups.includes("loggedInUsers") && (
            <span className="navCommand" onClick={handleLogoutButton}>
              <span className="iconRow">
                <HiOutlineLogin />
                Sign out
              </span>
            </span>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/welcome" element={<PageWelcome />} />
        <Route path="/teamSearch" element={<PageTeams />} />
        <Route path="/playerSearch" element={<PagePlayers />} />
        {(currentUser.accessGroups.includes("members") ||
          currentUser.accessGroups.includes("unconfirmedMembers")) && (
          <Route
            path="/members"
            element={<PageMembers currentUser={currentUser} />}
          />
        )}
        {(currentUser.accessGroups.includes("members") ||
          currentUser.accessGroups.includes("unconfirmedMembers")) && (
          <Route
            path="/profile"
            element={<PageProfile currentUser={currentUser} />}
          />
        )}
        <Route
          path="/register"
          element={
            <PageRegister baseUrl={baseUrl} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/login"
          element={
            <PageLogin baseUrl={baseUrl} setCurrentUser={setCurrentUser} />
          }
        />
        {currentUser.accessGroups.includes("loggedInUsers") && (
          <Route
            path="/logout"
            element={
              <PageLogout baseUrl={baseUrl} setCurrentUser={setCurrentUser} />
            }
          />
        )}
        <Route
          path="/confirm-registration/:confirmationCode"
          element={
            <PageConfirmRegistration
              baseUrl={baseUrl}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </div>
  );
}

export default App;
