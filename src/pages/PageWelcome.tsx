import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import "../styles/pages/pageWelcome.scss";

import * as gamesLists from "../gamesLists/gamesLists";

export const PageWelcome = () => {
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
    isOpen,
    dropDownText,
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
            <label>Description:</label>
            <textarea
              className="rounded-lg"
              value={newGamesPost.description}
              name="description"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "description",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label> NumberOfPage: </label>
            <input
              type="text"
              name="numberOfPage"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "numberOfPage",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>

          {/* <div className="column">
            <label> Image URL: </label>
            <input
              disabled
              type="text"
              name="imageUrl"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "imageUrl",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div> */}
          <div className="column">
            <label>Console:</label>

            <select
              className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg hover:border-blue-500 block p-2.5 dark:focus:ring-blue-200"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
                  "console",
                  newGamesPost,
                  e.target.value
                )
              }
            >
              <option value="">Select Console...</option>
              <option value="xbox">XBOX</option>
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
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
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
                          console.log(gameList.image);

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
            <button type="button" onClick={handleToggleAddGamesPost}>
              Cancel
            </button>
            <button type="button" onClick={handleSaveNewGamesPost}>
              Save
            </button>
          </div>
        </form>
      )}

      <div className="gamesPosts">
        {gamesPosts.map((gamesPost) => {
          return (
            <div className="gamesPost" key={gamesPost._id}>
              <div className="image">
                <img src={gamesPost.imageUrl} />
              </div>
              {!gamesPost.isBeingEdited ? (
                <div className="showData">
                  <div className="title">{gamesPost.title}</div>
                  <p className="description">{gamesPost.description}</p>
                  <span>{gamesPost.languageText}</span>

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
                  <div className="displayGameImage">
                    <img src={`icons/${gamesPost.game}.png`} />
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
                    <label> description: </label>
                    <textarea
                      value={gamesPost.originalEditFields.description}
                      name="description"
                      onChange={(e) =>
                        handleChangeEditGamesPost(
                          "description",
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
