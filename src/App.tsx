import "./styles/App.scss";
import "./tailwindGlobal.css";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Page404 } from "./pages/Page404";
import { PageWelcome } from "./pages/PageWelcome";
import { PageRegister } from "./pages/PageRegister";
import { PageLogin } from "./pages/PageLogin";
import { PageConfirmRegistration } from "./pages/PageConfirmRegistration";
import { PageMembers } from "./pages/PageMembers";
import { FaSpinner } from "react-icons/fa";
import { PageLogout } from "./pages/PageLogout";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";
import { PageTeams } from "./pages/PageTeams";
import { PagePlayers } from "./pages/PagePlayers";
import { PageProfile } from "./pages/PageProfile";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { MdCardMembership } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const {
    handleLogoutButton,
    currentUser,
    setCurrentUser,
    imageSrc,
    isOpen,
    setIsOpen,
    setIsConsoleOpen,
    isConsoleOpen,
  } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const pageIsLoaded = () => {
    return currentUser.userName !== "";
  };

  return (
    <div
      className="App"
      onClick={() => {
        isOpen && setIsOpen(false);
        isMenuOpen && setIsMenuOpen(false);
        isConsoleOpen && setIsConsoleOpen(false);
      }}>
      <div className="burgerMenu" onClick={handleMenuOpen}>
        {!isMenuOpen ? (
          <AiOutlineMenu className="menuIcon" />
        ) : (
          <BsXLg className="menuIcon" />
        )}
      </div>
      <nav className={`menu ${isMenuOpen ? "menuOpen" : ""}`}>
        <div className="navRow">
          <NavLink to="/">
            <img src="images/logo.png" />
          </NavLink>
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
            <NavLink to="/members">
              <MdCardMembership className="member" />
            </NavLink>
          )}
          <div className="profileImage">
            {(currentUser.accessGroups.includes("members") ||
              currentUser.accessGroups.includes("unconfirmedMembers")) && (
              <>
                <img src={imageSrc} className="userImage" />
                <NavLink to="/profile">{currentUser.userName}</NavLink>
              </>
            )}
          </div>

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
        <Route path="/" element={<PageWelcome currentUser={currentUser} />} />
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
        <Route path="/register" element={<PageRegister baseUrl={baseUrl} />} />
        <Route path="/login" element={<PageLogin baseUrl={baseUrl} />} />
        {currentUser.accessGroups.includes("loggedInUsers") && (
          <Route path="/logout" element={<PageLogout baseUrl={baseUrl} />} />
        )}
        <Route
          path="/confirm-registration/:confirmationCode"
          element={<PageConfirmRegistration baseUrl={baseUrl} />}
        />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
