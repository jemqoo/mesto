const initialCards = [
  {
    placeName: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    placeName: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    placeName: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    placeName: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    placeName: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    placeName: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

const popupProfileSelector = ".popup_edit";
const popupAddCardSelector = ".popup_add";
const cardTemplateSelector = ".card-template";
const popupImageSelector = ".popup_image";
const listsElementSelector = ".cards";

const configInfo = {
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
};

const validationConfig = {
  form: "popup__form",
  formInput: "popup__input",
  formInputInvalid: "popup__input_invalid",
  formSubmit: "popup__submit",
  formSubmitDisabled: "popup__submit_disabled",
  formErrorActive: "popup__error_active",
};

export {
  initialCards,
  addButton,
  editButton,
  popupProfileSelector,
  popupAddCardSelector,
  cardTemplateSelector,
  popupImageSelector,
  listsElementSelector,
  configInfo,
  validationConfig,
};
