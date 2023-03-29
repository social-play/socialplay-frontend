import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import "../styles/pages/pageWelcome.scss";

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
          <div className="column">
            <label> Language: </label>
            <input
              value={newGamesPost.language}
              type="text"
              name="language"
              onChange={(e) =>
                handleAddGamesPostFieldsChange(
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
                handleAddGamesPostFieldsChange(
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
                handleAddGamesPostFieldsChange(
                  "buyUrl",
                  newGamesPost,
                  e.target.value
                )
              }
            />
          </div>
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
