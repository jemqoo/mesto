export default class Card {
  constructor(
    cardData,
    selectorTemplate,
    openImagePopup,
    opendeletePopup,
    changeLike
  ) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._opendeletePopup = opendeletePopup;
    this._myId = cardData.myid;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._changeLike = changeLike;
    this._cardId = cardData._id;
  }

  _getTemplateClone() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLike = () => {
    this._changeLike(this._likeIconElement, this._cardId);
  };

  _handleDeleteElement = () => {
    this._opendeletePopup({ card: this, cardId: this._cardId });
  };

  _handleOpenImagePopup = () => {
    this._openImagePopup(this._cardData);
  };

  _setEventListeners() {
    this._likeIconElement.addEventListener("click", this._handleLike);
    this._trashElement.addEventListener("click", this._handleDeleteElement);
    this._imageElement.addEventListener("click", this._handleOpenImagePopup);
  }

  _changeVisibleForTrashButton() {
    this._myId === this._ownerId
      ? (this._trashElement.style.display = "block")
      : (this._trashElement.style.display = "none");
  }

  _checkLikeStatus() {
    this._likes.forEach((item) => {
      if (item._id === this._myId) {
        this._likeIconElement.classList.toggle("card__like-button_active");
        return;
      }
    });
    this._counter.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._likeIconElement.classList.toggle("card__like-button_active");
    this._counter.textContent = likes.length;
  }

  removeCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  createCard() {
    this._cloneElement = this._getTemplateClone();
    this._imageElement = this._cloneElement.querySelector(".card__image");
    this._likeIconElement =
      this._cloneElement.querySelector(".card__like-button");
    this._trashElement = this._cloneElement.querySelector(
      ".card__delete-button"
    );
    this._subTitle = this._cloneElement.querySelector(".card__title");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._subTitle.textContent = this._name;
    this._counter = this._cloneElement.querySelector(".card__counter");
    this._checkLikeStatus();
    this._changeVisibleForTrashButton();
    this._setEventListeners();
    return this._cloneElement;
  }
}
