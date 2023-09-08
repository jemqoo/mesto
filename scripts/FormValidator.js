export default class FormValidator {
  constructor(config, form) {
    this._formInputClass = config.formInput;
    this._formSubmitClass = config.formSubmit;
    this._formInputInvalidClass = config.formInputInvalid;
    this._formSubmitDisabledClass = config.formSubmitDisabled;
    this._formErrorActiveClass = config.formErrorActive;
    this._form = form;
    this._button = this._form.querySelector(`.${this._formSubmitClass}`);
    this._inputList = Array.from(
      this._form.querySelectorAll(`.${this._formInputClass}`)
    );
  }
  _showInputError(errorTextElement, input) {
    input.classList.add(this._formInputInvalidClass);
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(this._formErrorActiveClass);
  }
  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._formInputInvalidClass);
    errorTextElement.classList.remove(this._formErrorActiveClass);
    errorTextElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(errorTextElement, input);
    } else {
      this._hideInputError(errorTextElement, input);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  disableButton() {
    this._button.classList.add(this._formSubmitDisabledClass);
    this._button.disabled = true;
  }

  enableButton() {
    this._button.classList.remove(this._formSubmitDisabledClass);
    this._button.disabled = false;
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }
}
