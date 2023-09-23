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
// const editAvatar = document.querySelector(".profile__edit-button");

const popupProfileSelector = ".popup_edit";
const popupAddCardSelector = ".popup_add";
const cardTemplateSelector = ".card-template";
const popupImageSelector = ".popup_image";
const listsElementSelector = ".cards";

const editPopup = document.querySelector(".popup_edit");
const editForm = editPopup.querySelector(".popup__form_edit");
const addPopup = document.querySelector(".popup_add");
const addForm = addPopup.querySelector(".popup__form_add");
const editAvatarPopup = document.querySelector(".edit-avatar-popup");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form_add");

const configInfo = {
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
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
  editForm,
  addForm,
  editAvatarForm,
};
