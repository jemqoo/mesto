export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close");
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  _handleCloseButton = () => {
    this.close();
  };

  _handleVlickByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this._handleCloseButton);
    this._popup.addEventListener("click", this._handleVlickByOverlay);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
