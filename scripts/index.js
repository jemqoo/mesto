import initialCards from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupList = document.querySelectorAll(".popup");
/*imagePopup*/
const imagePopup = document.querySelector(".popup_image");
const imagePopupTitle = imagePopup.querySelector(".popup__title_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupClose = imagePopup.querySelector(".popup__close_image");
/*editForm*/
const editPopup = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const editForm = editPopup.querySelector(".popup__form_edit");
const editFormSubmit = editForm.querySelector(".popup__submit");
const popupCloseEdit = editPopup.querySelector(".popup__close_edit");
const usernameInput = editPopup.querySelector(".popup__input_user_name");
const userInfoInput = editPopup.querySelector(".popup__input_user_info");
const username = document.querySelector(".profile__title");
const userInfo = document.querySelector(".profile__subtitle");
/*addForm*/
const addPopup = document.querySelector(".popup_add");
const addButton = document.querySelector(".profile__add-button");
const addForm = addPopup.querySelector(".popup__form_add");
const addFormSubmit = addForm.querySelector(".popup__submit");
const popupCloseAdd = addPopup.querySelector(".popup__close_add");
const placeName = addPopup.querySelector(".popup__input_place_name");
const placeImage = addPopup.querySelector(".popup__input_place_image");
const cardsContainer = document.querySelector(".cards");

const cardTemplateSelector = ".card-template";

function openImagePopup(cardData) {
  imagePopupTitle.textContent = cardData.name;
  imagePopupPicture.src = cardData.link;
  imagePopupPicture.alt = cardData.name;
  openPopup(imagePopup);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function openProfilePopup(popup) {
  usernameInput.value = username.textContent;
  userInfoInput.value = userInfo.textContent;
  formPersonalDataValidator.enableButton();
  openPopup(popup);
}

function changeProfileInfo(form) {
  form.preventDefault();
  username.textContent = usernameInput.value;
  userInfo.textContent = userInfoInput.value;
  closePopup(editPopup);
}

function createNewCard(item) {
  const newCard = new Card(item, cardTemplateSelector, openImagePopup);
  const cardElement = newCard.createCard();
  return cardElement;
}

function addCard(form) {
  form.preventDefault();
  const cardDataNameUrl = { name: placeName.value, link: placeImage.value };
  cardsContainer.prepend(createNewCard(cardDataNameUrl));

  closePopup(addPopup);
  addForm.reset();

  formAddCardValidator.disableButton();
}

function closePopupByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    /*closePopupClickOnOverlay*/
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

initialCards.forEach(function (item) {
  cardsContainer.prepend(createNewCard(item));
});

const validationConfig = {
  form: "popup__form",
  formInput: "popup__input",
  formInputInvalid: "popup__input_invalid",
  formSubmit: "popup__submit",
  formSubmitDisabled: "popup__submit_disabled",
  formErrorActive: "popup__error_active",
};

const formPersonalDataValidator = new FormValidator(validationConfig, editForm);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, addForm);
formAddCardValidator.enableValidation();

editButton.addEventListener("click", () => openProfilePopup(editPopup));

popupCloseEdit.addEventListener("click", () => closePopup(editPopup));

addButton.addEventListener("click", () => openPopup(addPopup));

popupCloseAdd.addEventListener("click", () => closePopup(addPopup));

imagePopupClose.addEventListener("click", () => closePopup(imagePopup));

editForm.addEventListener("submit", changeProfileInfo);

addForm.addEventListener("submit", addCard);
