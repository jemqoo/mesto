import initialCards from './constants.js'
import Card from './Card.js'

const popupList = document.querySelectorAll('.popup');
/*imagePopup*/
const imagePopup = document.querySelector('.popup_image')
const imagePopupTitle = imagePopup.querySelector('.popup__title_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close_image');
/*editForm*/
const formPersonalDataElement = document.querySelector('.popup__form');
const editPopup = document.querySelector('.popup_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form_edit');
const editFormSubmit = editForm.querySelector('.popup__submit');
const popupCloseEdit = editPopup.querySelector('.popup__close_edit');
const username = editPopup.querySelector('.popup__input_user_name');
const userInfo = editPopup.querySelector('.popup__input_user_info');
const defaultUserName = document.querySelector('.profile__title');
const defaultUserInfo = document.querySelector('.profile__subtitle');
/*addForm*/
const addPopup = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form_add');
const addFormSubmit = addForm.querySelector('.popup__submit');
const popupCloseAdd = addPopup.querySelector('.popup__close_add');
const placeName = addPopup.querySelector('.popup__input_place_name');
const placeImage = addPopup.querySelector('.popup__input_place_image');
const cardTemplate = document.querySelector('.card-template');
const cardTemplateContent = cardTemplate.content;
const card = cardTemplateContent.querySelector('.card');
const cardsContainer = document.querySelector('.cards');

const selectorTemplate = '.card-template';

function openImagePopup(cardData){
  imagePopupTitle.textContent = cardData.name;
  imagePopupPicture.src = cardData.link;
  imagePopupPicture.alt = cardData.name;
  openPopup(imagePopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  addFormSubmit.classList.add('popup__submit_disabled');
  addFormSubmit.setAttribute('disabled', 'disabled');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

function openProfilePopup(popup) {
  username.value = defaultUserName.textContent; 
  userInfo.value = defaultUserInfo.textContent;
  editFormSubmit.classList.remove('popup__submit_disabled');
  editFormSubmit.removeAttribute('disabled', 'disabled');
  
  openPopup(popup);
};

function changeProfileInfo(form) {
  form.preventDefault();
  defaultUserName.textContent = username.value;
  defaultUserInfo.textContent = userInfo.value;
  closePopup(editPopup);
};

function createNewCard(item){
  const newCard = new Card(item, selectorTemplate, openImagePopup);
  const cardElement = newCard.createCard();
  return cardElement;
}

function addCard(form) {
  form.preventDefault();
  const cardDataNameUrl = {name:  placeName.value, link: placeImage.value}
  cardsContainer.prepend(createNewCard(cardDataNameUrl));
  
  closePopup(addPopup);
  addForm.reset();
  addFormSubmit.classList.add('popup__submit_disabled');
  addFormSubmit.setAttribute('disabled', 'disabled');

};

function closePopupByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

popupList.forEach(popup => {
  popup.addEventListener('mousedown', event => { /*closePopupClickOnOverlay*/
    if (event.target === popup) {
      closePopup(popup)
    }
  });
});

initialCards.forEach(function(item) {
   cardsContainer.prepend(createNewCard(item));
});

const validationConfig = {
  form: 'popup__form',
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};

class FormValidator {
  constructor(config, form){
    console.log()
    this._formInput = config.formInput;
    this._formSubmit = config.formSubmit;
    this._formInputInvalid = config.formInputInvalid;
    this._formSubmitDisabled = config.formSubmitDisabled;
    this._formErrorActive = config.formErrorActive;
    this._form = form;
    this._button = this._form.querySelector(`.${this._formSubmit}`);
    this._inputList =  Array.from(this._form.querySelectorAll(`.${this._formInput}`));
  }
  _showInputError(errorTextElement, input){
    input.classList.add(this._formErrorActive);
    errorTextElement.textContent = input.validationMessage;
  }
  _hideInputError(errorTextElement, input){
    input.classList.remove(this._formErrorActive);
    errorTextElement.textContent = '';
  }
  _checkInputValidity(input){
    const errorTextElement = this._form.querySelector(`.${input.id}-error`);
    input.validity.vaild ? this._hideInputError(errorTextElement, input) : this._showInputError(errorTextElement, input);
  }

  _setEventListener(){
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        // this._toggleButtonState();
      })
    })
  }
  
  enableValidation(){
    // console.log(this._inputList)
    // console.log(this._button)
    this._setEventListener();
  }

}

const formPersonalDataValidator = new FormValidator(validationConfig, editForm);
console.log(formPersonalDataValidator)
formPersonalDataValidator.enableValidation()



editButton.addEventListener('click', () => openProfilePopup(editPopup));

popupCloseEdit.addEventListener('click', () => closePopup(editPopup));

addButton.addEventListener('click', () => openPopup(addPopup));

popupCloseAdd.addEventListener('click', () => closePopup(addPopup));

imagePopupClose.addEventListener('click', () => closePopup(imagePopup));

editForm.addEventListener('submit', changeProfileInfo);

addForm.addEventListener('submit', addCard);