import {
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
} from "./scripts/utils/constants.js";
import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";

const editPopup = document.querySelector(".popup_edit");
const editForm = editPopup.querySelector(".popup__form_edit");
const addPopup = document.querySelector(".popup_add");
const addForm = addPopup.querySelector(".popup__form_add");

const userInfo = new UserInfo(configInfo);

const popupImage = new PopupWithImage(popupImageSelector);

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, cardTemplateSelector, popupImage.open);
      return newCard.createCard();
    },
  },
  listsElementSelector
);

section.addCardFromArray();

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValue());
  popupProfile.close();
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValue()));
  popupAddCard.close();
});

editButton.addEventListener("click", () => {
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

addButton.addEventListener("click", () => popupAddCard.open());

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

const formPersonalDataValidator = new FormValidator(validationConfig, editForm);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, addForm);
formAddCardValidator.enableValidation();
