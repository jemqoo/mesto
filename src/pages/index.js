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
  editAvatarForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Api from "../components/Api.js";

const popupAvatarSelector = ".edit-avatar-popup";
const popupDeleteSelector = ".delete-popup";

const userInfo = new UserInfo(configInfo);

const popupImage = new PopupWithImage(popupImageSelector);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "52fa0298-6d41-4d85-b650-c0ec7f2f1b2d",
    "Content-Type": "application/json",
  },
});

const deletePopupCard = new PopupDeleteCard(
  popupDeleteSelector,
  ({ card, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deletePopupCard.close();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => deletePopupCard.setupDefaultText());
  }
);

function createNewCard(item) {
  const newCard = new Card(
    item,
    cardTemplateSelector,
    popupImage.open,
    deletePopupCard.open,
    (likeElement, cardId) => {
      if (likeElement.classList.contains("card__like-button_active")) {
        api
          .deleteLike(cardId)
          .then((res) => {
            console.log(res);
            newCard.toggleLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при добавлении лайка ${error}`)
          );
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            console.log(res);
            newCard.toggleLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при добавлении лайка ${error}`)
          );
      }
    }
  );
  return newCard.createCard();
}

const section = new Section((element) => {
  section.addItemAppend(createNewCard(element));
}, listsElementSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, (inputValues) => {
  api
    .setUserInfo(inputValues)
    .then((res) => {
      userInfo.setUserInfo({
        username: res.name,
        userInfo: res.about,
        avatar: res.avatar,
      });
      popupProfile.close();
    })
    .catch((error) =>
      console.error(`Ошибка при редактировании профиля ${error}`)
    )
    .finally(() => popupProfile.setupDefaultText());
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      section.addItemPrepend(createNewCard(dataCard));
      popupAddCard.close();
    })
    .catch((error) =>
      console.error(`Ошибка при создании новой карточки ${error}`)
    )
    .finally(() => popupAddCard.setupDefaultText());
});

const popupEditAvatar = new PopupWithForm(
  popupAvatarSelector,
  (inputValues) => {
    api
      .setNewAvatar(inputValues)
      .then((res) => {
        userInfo.setUserInfo({
          username: res.name,
          userInfo: res.about,
          avatar: res.avatar,
        });
        popupEditAvatar.close();
      })
      .catch((error) =>
        console.error(`Ошибка при редактировании аватара ${error}`)
      )
      .finally(() => popupEditAvatar.setupDefaultText());
  }
);

editButton.addEventListener("click", () => {
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  formAddCardValidator.disableButton();
  popupAddCard.open();
});

document
  .querySelector(".profile__avatar-overlay")
  .addEventListener("click", () => {
    editAvatrValidator.disableButton();
    popupEditAvatar.open();
  });

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
deletePopupCard.setEventListeners();

const formPersonalDataValidator = new FormValidator(validationConfig, editForm);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, addForm);
formAddCardValidator.enableValidation();

const editAvatrValidator = new FormValidator(validationConfig, editAvatarForm);
editAvatrValidator.enableValidation();

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myid = dataUser._id));
    userInfo.setUserInfo({
      username: dataUser.name,
      userInfo: dataUser.about,
      avatar: dataUser.avatar,
    });
    section.addCardFromArray(dataCard);
  })
  .catch((error) =>
    console.error(`Ошибка при редактировании профиля ${error}`)
  );
