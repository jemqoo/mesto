//для попапа профиля
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.popup__edit-close-button');

const popupEdit = document.querySelector('.popup_edit-profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__about');

const formElement = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__input_description_name');
const aboutInput = document.querySelector('.popup__input_description_about');

//для попапа с добавлением и открытия фотографии
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__add-close-button');
const addButton = document.querySelector('popup__create-button');

const fullPopup = document.querySelector('.popup_card');
const fullImage = document.querySelector('.popup__image');
const fullTitle = document.querySelector('.popup__title_card');
const closeFullButton = document.querySelector('.popup__close-button_card');

const popupAdd = document.querySelector('.popup_add-place');
const formAddElement = document.querySelector('.popup__add-form');
const placeInput = document.querySelector('.popup__input_description_place');
const linkInput = document.querySelector('.popup__input_description_link');

//для карточек 
const photoTemplate = document.getElementById('photo-template').content;
const placesContainer = document.querySelector('.places');

//открытие и закрытие попапов
const switchPopup = (popup) => {
  popup.classList.toggle('popup_open');
};

const handleInfo = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileJob.textContent;
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  const item = {
    name: placeInput.value,
    link: linkInput.value,
  };

  placesContainer.prepend(createPhotoElement(item))
  switchPopup(popupAdd);
}

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = aboutInput.value;

  switchPopup(popupEdit);
};

// ф-ция для карточек
const createPhotoElement = (photoData) => {
  const photoElement = photoTemplate.querySelector('.element').cloneNode(true);

  const photoImage = photoElement.querySelector('.element__img');
  const photoTitle = photoElement.querySelector('.element__title');
  const placeLike = photoElement.querySelector('.element__button');
  const photoTrash = photoElement.querySelector('.element__trash');

  photoTitle.textContent = photoData.name;
  photoImage.src = photoData.link;
  photoImage.alt = photoData.name;
  // лайк
  const likePhoto = () => {
    placeLike.classList.toggle('element__button_active');
  }
  placeLike.addEventListener('click', likePhoto);
  // удаление
  const deletePlace = () => {
    photoElement.remove();
  };
  photoTrash.addEventListener('click', deletePlace);

  photoImage.addEventListener('click', () => {
    fullImage.src = photoData.link;
    fullImage.alt = photoData.name;
    fullTitle.textContent = photoData.name;
    switchPopup(fullPopup);

  });

  return photoElement;
};

initialCards.forEach((photo) => {
  const element = createPhotoElement(photo);
  placesContainer.prepend(element);
});

// Слушатели: профиль
openEditButton.addEventListener('click', () => {
  switchPopup(popupEdit);
  handleInfo();
});
closeEditButton.addEventListener('click', () => switchPopup(popupEdit));
formElement.addEventListener('submit', handleEditFormSubmit);

// Слушатели: карточки мест, добавление места, открытие фотографии
openAddButton.addEventListener('click', () => switchPopup(popupAdd));
closeAddButton.addEventListener('click', () => switchPopup(popupAdd));
popupAdd.addEventListener('submit', handleAddFormSubmit);

closeFullButton.addEventListener('click', () => switchPopup(fullPopup));