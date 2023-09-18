import "./index.css";
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
  editForm,
  addForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

const popupProfile = new PopupWithForm(popupProfileSelector, () => {
  userInfo.setUserInfo(popupProfile._getInputValues());
  popupProfile.close();
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, () => {
  section.addItem(section.renderer(popupAddCard._getInputValues()));
  popupAddCard.close();
});

editButton.addEventListener("click", () => {
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  formAddCardValidator.disableButton();
  popupAddCard.open();
});

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

const formPersonalDataValidator = new FormValidator(validationConfig, editForm);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, addForm);
formAddCardValidator.enableValidation();
