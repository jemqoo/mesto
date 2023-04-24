const openPopupBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".popup__but-close");
const formElement = document.querySelector(".popup__inputs");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

function openPopup() {
  popup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove("popup_open");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
