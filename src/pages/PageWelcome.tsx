import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import "../styles/pages/pageWelcome.scss";
import * as gamesLists from "../components/gamesLists";
import { popUp } from "../components/popUp";
import { IUser } from "../interfaces";
import { GoMail } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import Chat from "../components/Chat";
import { BsChatDots } from "react-icons/bs";

interface IPageMembersProps {
  currentUser: IUser;
}
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const socket: Socket = io(`${baseUrl}`);

export const PageWelcome = (props: IPageMembersProps) => {
  // socket.io
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [gamePostUserName, setGamePostUserName] = useState<string>("");

  const { currentUser } = props;
  const {
    appTitle,
    gamesPosts,
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
    toggleDropDown,
    toggleDropDownConsole,
    isOpen,
    isConsoleOpen,
    dropDownText,
    dropDownTextConsole,
  } = useContext(AppContext);

  const openChat = (gamesPost: string, roomId: string) => {
    if (roomId !== "") {
      socket.emit("join_room", roomId);
      setRoom(roomId);
    }

    setShowChat(true);
    setIsChatOpen(!isChatOpen);
    setGamePostUserName(gamesPost);
  };
  return (
    <div className="pageWelcome">
      <Helmet>
        <title>{appTitle} - Welcome</title>
      </Helmet>

      <h2>{gamesPosts.length} REQUESTS IN SEARCH FOR PLAYERS OR TEAMS</h2>
      {!isAdding ? (
        <button
          className="text-xl text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-5"
          type="button"
          onClick={handleToggleAddGamesPost}
        >
          Create Post!
        </button>
      ) : (
        <form className="addedArea">
          <div className="column">
            <label>Room ID:</label>
            <input
              placeholder="Room ID for chatting..."
              value={newGamesPost.roomId}
              type="text"
              name="roomId"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "roomId",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label>We search:</label>
            <textarea
              placeholder="for example your challenge..."
              className="rounded-lg"
              value={newGamesPost.WeSearch}
              name="WeSearch"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "WeSearch",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label>We offer:</label>
            <textarea
              placeholder="your offer for playing..."
              className="rounded-lg"
              value={newGamesPost.weOffer}
              name="weOffer"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "weOffer",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label>Join Us:</label>
            <textarea
              placeholder="for example Discord, Steam, Twitch etc..."
              className="rounded-lg"
              value={newGamesPost.contact}
              name="contact"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "contact",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>

          <div className="column">
            <label> Number Of Players: </label>
            <input
              placeholder="if you are searching for a player, how many?..."
              type="number"
              name="numberOfPlayers"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "numberOfPlayers",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>

          <section className="mt-2">
            <label>Console:</label>
            <div
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-xl text-black bg-gray-200 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center w-full hover:border-blue-500 border-2 mt-2"
              onClick={toggleDropDownConsole}
            >
              <>{dropDownTextConsole}</>
              <svg
                className="w-5 h-4 ml-auto"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M25 9l-7 7-7-7"
                ></path>
              </svg>
            </div>

            {isConsoleOpen && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full relative"
              >
                <ul
                  className="bg-white rounded-lg text-sm px-4 py-2.5 text-center items-center mt-1 absolute inline-flex w-full"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {gamesLists.consoleLists.map((consoleList, i) => {
                    return (
                      <li
                        className="gamesList hover:bg-gray-200"
                        key={i}
                        onClick={() => {
                          handleAddGamesPostFieldsChange(
                            "console",
                            newGamesPost,
                            consoleList.value
                          );
                        }}
                      >
                        <img src={`${consoleList.image}`} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          <div className="column">
            <label>Language:</label>
            <div>
              <select
                className="text-xl bg-gray-50 border-2 text-gray-900 text-sm rounded-lg hover:border-blue-500 block p-2.5 dark:focus:ring-blue-200 w-full"
                onChange={(e) =>
                  handleAddGamesPostFieldsChange(
                    "language",
                    newGamesPost,
                    e.target.value
                  )
                }
              >
                <option value="">Select Language...</option>
                <option value="🇸🇦 arabic">🇸🇦️ - العربية</option>
                <option value="🇩🇪 german">🇩🇪️ - DEUTSCH</option>
                <option value="🇺🇸️ english">🇺🇸️️ - ENGLISH</option>
                <option value="🇪🇸 spanish">🇪🇸️ - ESPAÑOL</option>
                <option value="🇫🇷 french">🇫🇷️ - FRANÇAIS</option>
                <option value="🇮🇹️ Italian">🇮🇹️ - ITALIANO</option>
                <option value="🇯🇵️ japanese">🇯🇵️️ - 日本語</option>
                <option value="🇮🇷 persian">🇮🇷️ - فارسی</option>
                <option value="🇵🇹️ portuguese">🇵🇹️️ - PORTUGUÊS</option>
                <option value="🇷🇺 russian">🇷🇺️️️ - РУССКИЙ</option>
                <option value="🇹🇷 turkish">🇹🇷️ - TÜRKÇE</option>
              </select>
            </div>
          </div>

          <section className="mt-2">
            <label>Game:</label>
            <div
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-xl text-black bg-gray-200 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center w-full hover:border-blue-500 border-2 mt-2"
              onClick={toggleDropDown}
            >
              <>{dropDownText}</>
              <svg
                className="w-5 h-4 ml-auto"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M25 9l-7 7-7-7"
                ></path>
              </svg>
            </div>

            {isOpen && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full relative"
              >
                <ul
                  className="bg-white rounded-lg text-sm px-4 py-2.5 text-center items-center mt-1 absolute inline-flex w-full"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {gamesLists.gamesLists.map((gameList, i) => {
                    return (
                      <li
                        className="gamesList hover:bg-gray-200"
                        key={i}
                        onClick={() => {
                          handleAddGamesPostFieldsChange(
                            "game",
                            newGamesPost,
                            gameList.value
                          );
                        }}
                      >
                        <img src={`${gameList.image}`} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          <div className="buttons">
            <button
              type="button"
              onClick={handleToggleAddGamesPost}
              className="text-xl text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveNewGamesPost}
              className="text-xl text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="gamesPosts">
        {gamesPosts.map((gamesPost) => {
          return (
            <div className="gamesPost" key={gamesPost._id}>
              <div className="gameAndMail">
                <img
                  className={gamesPost.console}
                  title={gamesPost.console}
                  src={`icons/${gamesPost.console}.png`}
                />
                <button
                  onClick={() =>
                    openChat(currentUser.userName, gamesPost.roomId)
                  }
                >
                  <GoMail />
                </button>
              </div>
              <div className="image">
                <img src={gamesPost.imageUrl} />
                <span>{gamesPost.language.substring(0, 4)}</span>
              </div>
              {!gamesPost.isBeingEdited ? (
                <div className="showData">
                  <div className="displayGameImage">
                    <img
                      className={gamesPost.game}
                      src={`icons/${gamesPost.game}.png`}
                    />
                  </div>
                  <h2>{gamesPost.author}</h2>
                  <div>
                    <button
                      onClick={() => popUp(gamesPost)}
                      className="text-xl text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      SHOW
                    </button>
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => handleDeleteGamesPost(gamesPost)}
                    >
                      <span className="delete">
                        <MdDelete />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditGamesPost(gamesPost)}
                    >
                      <span className="edit">
                        <BiEdit />
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <form className="editArea">
                  <div className="row">
                    <label>WE SEARCH:</label>
                    <textarea
                      value={gamesPost.originalEditFields.WeSearch}
                      name="WeSearch"
                      onChange={(e) =>
                        handleChangeEditGamesPost(
                          "WeSearch",
                          gamesPost,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="row">
                    <label>WE OFFER:</label>
                    <input
                      type="text"
                      value={gamesPost.originalEditFields.weOffer}
                      name="weOffer"
                      onChange={(e) =>
                        handleChangeEditGamesPost(
                          "weOffer",
                          gamesPost,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="row">
                    <label>JOIN US:</label>
                    <div>
                      <input
                        type="text"
                        value={gamesPost.originalEditFields.contact}
                        name="contact"
                        onChange={(e) =>
                          handleChangeEditGamesPost(
                            "contact",
                            gamesPost,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handleCancelEditGamesPost(gamesPost)}
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="save"
                      type="button"
                      onClick={() => handleSaveEditGamesPost(gamesPost)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
      {!isChatOpen ? (
        <div className="openChat">
          <BsChatDots />
        </div>
      ) : (
        <div className="chat">
          {showChat && (
            <Chat
              socket={socket}
              gamePostUserName={gamePostUserName}
              room={room}
              setIsChatOpen={setIsChatOpen}
            />
          )}
        </div>
      )}
    </div>
  );
};
