import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import "../styles/pages/pageWelcome.scss";
import * as gamesLists from "../components/gamesLists";
import { popUp } from "../components/popUp";
import { IUser } from "../interfaces";
import { GoMail } from "react-icons/go";

interface IPageMembersProps {
  currentUser: IUser;
}

export const PageWelcome = (props: IPageMembersProps) => {
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

  return (
    <div className="pageWelcome">
      <Helmet>
        <title>{appTitle} - Welcome</title>
      </Helmet>
      <h2>{gamesPosts.length} TEAMS IN SEARCH OF PLAYERS</h2>

      {!isAdding ? (
        <button
          className="addBtn"
          type="button"
          onClick={handleToggleAddGamesPost}
        >
          Create
        </button>
      ) : (
        <form className="addedArea">
          <div className="column">
            <label>Title:</label>
            <input
              value={newGamesPost.title}
              type="text"
              name="title"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "title",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label>We search:</label>
            <textarea
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
            <label>Contact:</label>
            <textarea
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
              className="text-black bg-gray-200 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center w-full hover:border-blue-500 border-2 mt-2"
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
                className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg hover:border-blue-500 block p-2.5 dark:focus:ring-blue-200 w-full"
                onChange={(e) =>
                  handleAddGamesPostFieldsChange(
                    "language",
                    newGamesPost,
                    e.target.value
                  )
                }
              >
                <option value="">Select Language...</option>
                <option value="arabic">🇸🇦️ - ARABIC</option>
                <option value="english">🇺🇸️️ - ENGLISH</option>
                <option value="french">🇫🇷️ - FRENCH</option>
                <option value="german">🇩🇪️ - GERMAN</option>
                <option value="japanese">🇯🇵️️ - JAPANESE</option>
                <option value="persian">🇮🇷️ - PERSIAN</option>
                <option value="portuguese">🇵🇹️️ - PORTUGUESE</option>
                <option value="russian">🇷🇺️️️ - RUSSIAN</option>
                <option value="spanish">🇪🇸️ - SPANISH</option>
                <option value="turkish">🇹🇷️ - TURKISH</option>
              </select>
            </div>
          </div>

          <section className="mt-2">
            <label>Game:</label>
            <div
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-black bg-gray-200 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center w-full hover:border-blue-500 border-2 mt-2"
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
                <span>
                  <GoMail />
                </span>
              </div>
              <div className="image">
                <img src={gamesPost.imageUrl} />
              </div>
              {!gamesPost.isBeingEdited ? (
                <div className="showData">
                  <div className="displayGameImage">
                    <img
                      className={gamesPost.game}
                      src={`icons/${gamesPost.game}.png`}
                    />
                  </div>
                  <h2>{currentUser.userName}</h2>
                  <div>
                    <button
                      onClick={() => popUp(gamesPost, currentUser)}
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
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditGamesPost(gamesPost)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <form className="editArea">
                  <div className="row">
                    <label>title:</label>
                    <input
                      type="text"
                      value={gamesPost.originalEditFields.title}
                      name="title"
                      onChange={(e) =>
                        handleChangeEditGamesPost(
                          "title",
                          gamesPost,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="row">
                    <label> WeSearch: </label>
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
                    <label> language: </label>
                    <input
                      type="text"
                      value={gamesPost.originalEditFields.language}
                      name="language"
                      onChange={(e) =>
                        handleChangeEditGamesPost(
                          "language",
                          gamesPost,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => handleCancelEditGamesPost(gamesPost)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEditGamesPost(gamesPost)}
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
