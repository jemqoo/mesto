import initialCards from './constants.js'

const popupList = document.querySelectorAll('.popup');
/*imagePopup*/
const imagePopup = document.querySelector('.popup_image')
const imagePopupTitle = imagePopup.querySelector('.popup__title_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close_image');
/*editForm*/
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

const cardCont = document.querySelector('.card');

const selectorTemplate = '#card-template';

class Card{
  constructor(cardData, selectorTemplate){
    this._cardData=cardData;
    this._link=cardData.link;
    this._name=cardData.name;
    this._selectorTemplate=selectorTemplate;
    // this._openImagePopup=openImagePopup;
  }

  _getTemplateClone(){
    return document.querySelector(this._selectorTemplate).content.querySelector('.card').cloneNode(true);
  }

  createCard(){
    this._cloneElement = this._getTemplateClone();
    this._imageElement = this._cloneElement.querySelector('.card__image');
    this._likeIconElement = this._cloneElement.querySelector('.card__like-button');
    this._trashElement = this._cloneElement.querySelector('.card__delete-button');
    this._subTitle = this._cloneElement.querySelector('.card__title');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._subTitle.textContent =  this._name;

    return this._cloneElement;
  }
}

// function createCard(name, link) {
//   const newCard = card.cloneNode(true); /*cloneCardTemplate*/

//   const newCardImage = newCard.querySelector('.card__image'); 
//   newCardImage.src = link;
//   newCardImage.alt = name;
//   const newCardTitle = newCard.querySelector('.card__title');
//   newCardTitle.textContent = name;

//   const deleteButton = newCard.querySelector('.card__delete-button'); /*deleteButton*/
//   deleteButton.addEventListener('click', function() {
//     deleteButton.closest('.card').remove();
//   })
  
//   const cardLike = newCard.querySelector('.card__like-button'); /*likeButton*/
//   cardLike.addEventListener('click', function() {
//     cardLike.classList.toggle('card__like-button_active');
//   });

//   const cardImage = newCard.querySelector('.card__image'); /*popupImageOpened*/
//   cardImage.addEventListener('click', function() {
//     imagePopupTitle.textContent = newCardTitle.textContent;
//     imagePopupPicture.src = newCardImage.src;
//     imagePopupPicture.alt = newCardTitle.textContent;
//     openPopup(imagePopup);
//   })

//   return newCard
// };

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

function createNewCard(form) {

  form.preventDefault();
  const placeNameValue = placeName.value;
  const placeImageValue = placeImage.value;
  const newCard = createCard(placeNameValue, placeImageValue);
  cardsContainer.prepend(newCard);
  
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

 function addCard(container, newCard){
 container.prepend(newCard);
}

initialCards.forEach(function(item) {
   const newCard = new Card(item, selectorTemplate);
   console.log(newCard);

   addCard(cardsContainer, newCard.createCard()); //вывод карточек
});

editButton.addEventListener('click', () => openProfilePopup(editPopup));

popupCloseEdit.addEventListener('click', () => closePopup(editPopup));

addButton.addEventListener('click', () => openPopup(addPopup));

popupCloseAdd.addEventListener('click', () => closePopup(addPopup));

imagePopupClose.addEventListener('click', () => closePopup(imagePopup));

editForm.addEventListener('submit', changeProfileInfo);

addForm.addEventListener('submit', createNewCard);