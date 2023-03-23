import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import "../styles/pageWelcome.scss";

export const PageWelcome = () => {
  const {
    appTitle,
    gamesPosts,
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
  } = useContext(AppContext);

  return (
    <div className="pageWelcome">
      <Helmet>
        <title>{appTitle} - Welcome</title>
      </Helmet>
      <h2>{gamesPosts.length} TEAMS IN SEARCH OF PLAYERS</h2>

      {!isAdding ? (
        <button className="addBtn" type="button" onClick={handleToggleAddBook}>
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
                handleAddBookFieldsChange("title", newGamesPost, e.target.value)
              }
            />
          </div>
          <div className="column">
            <label>Description:</label>
            <textarea
              value={newGamesPost.description}
              name="description"
              onChange={(e) =>
                handleAddBookFieldsChange(
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
                handleAddBookFieldsChange(
                  "numberOfPage",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label> Language: </label>
            <input
              value={newGamesPost.language}
              type="text"
              name="language"
              onChange={(e) =>
                handleAddBookFieldsChange(
                  "language",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label> Image URL: </label>
            <input
              type="text"
              name="imageUrl"
              onChange={(e) =>
                handleAddBookFieldsChange(
                  "imageUrl",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label> Buy URL: </label>
            <input
              type="text"
              name="buyUrl"
              onChange={(e) =>
                handleAddBookFieldsChange(
                  "buyUrl",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
          <div className="buttons">
            <button type="button" onClick={handleToggleAddBook}>
              Cancel
            </button>
            <button type="button" onClick={handleSaveNewBook}>
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
                      onClick={() => handleDeleteBook(gamesPost)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditBook(gamesPost)}
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
                        handleChangeEditBook("title", gamesPost, e.target.value)
                      }
                    />
                  </div>
                  <div className="row">
                    <label> description: </label>
                    <textarea
                      value={gamesPost.originalEditFields.description}
                      name="description"
                      onChange={(e) =>
                        handleChangeEditBook(
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
                        handleChangeEditBook(
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
                      onClick={() => handleCancelEditBook(gamesPost)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEditBook(gamesPost)}
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
