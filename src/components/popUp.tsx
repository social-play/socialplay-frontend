import Swal from "sweetalert2";
import "../styles/pages/popup.scss";

export const popUp = (gamesPost: any) => {
  Swal.fire({
    title: `
    <div class="popupContainer">
      <div class="popupImage">
      <img src=${gamesPost.imageUrl}/>
      </div>
      <div class="gameImagePopup">
      <img  src=${`icons/${gamesPost.game}.png`} class="gameImage"/>
      </div>
      <p>Hello</p>
    </div>
      `,
    html: `<p>Description: ${gamesPost.description}</p>
      <p>Language: ${gamesPost.languageText}</p>
     `,
    background: "rgba(34,34,34,0.8)",
    confirmButtonText: "close",

    customClass: {
      title: "popupTitle",
      popup: "myPopup",
      confirmButton: "closeButton",
    },
  });
};
