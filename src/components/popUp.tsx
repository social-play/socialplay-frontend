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
      <h2>${currentUser.userName}</h2>
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
    <h2>CONTACT:</h2>
    <p>${gamesPost.contact}</p>
    </div>
    </section>
    </div>
      `,

    background: "rgba(34,34,34,0.8)",
    confirmButtonText: "close",
    padding: "0",
    customClass: {
      title: "popupTitle",
      popup: "myPopup",
      confirmButton: "closeButton",
    },
  });
};
