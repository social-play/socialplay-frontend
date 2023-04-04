import Swal from "sweetalert2";
import { IGamesPosts, IUser } from "../interfaces";
import "../styles/pages/popup.scss";

export const popUp = (gamesPost: IGamesPosts, currentUser: IUser) => {
  Swal.fire({
    title: `
    <div class="popupContainer">
    <h1>${gamesPost.title}</h1>
      <div class="popupImage">
      <img src=${gamesPost.imageUrl}/>
      </div>
      <h2>${gamesPost.author}</h2>
      <div class="gameImagePopup">
      <img  src=${`icons/${gamesPost.console}.png`} class="consoleImage" title=${
      gamesPost.console
    } />
      <img  src=${`icons/${gamesPost.game}.png`} class="gameImage"/>
      </div>
      <section>
    <div class="popupRow">
    <h2>WE SEARCH:</h2>
    <p>${gamesPost.WeSearch}</p>
    </div>
    <div class="popupRow">
    <h2>WE OFFER:</h2>
    <p>${gamesPost.weOffer}</p>
    </div>
    <div class="popupRow">
    <h2>JOIN US:</h2>
    <p>${gamesPost.contact}</p>
    </div>
    </section>
    </div>
      `,

    background: "rgba(0,0,50,0.9)",
    confirmButtonText: "close",
    padding: "0",
    customClass: {
      title: "popupTitle",
      popup: "myPopup",
      confirmButton: "closeButton",
    },
  });
};
