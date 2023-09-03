export default class FormValidator {
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
      input.classList.add(this._formInputInvalid);
      errorTextElement.textContent = input.validationMessage;
      errorTextElement.classList.add(`${this._formErrorActive}`);
    }
    _hideInputError(errorTextElement, input){
      input.classList.remove(this._formInputInvalid);
      errorTextElement.classList.remove(`${this._formErrorActive}`);
      errorTextElement.textContent = '';
    }

    _hasInvalidInput(){
      return this._inputList.some(inputElement => {
        return !inputElement.validity.valid;
      });
    }
    _toggleButtonState(){
      if (this._hasInvalidInput()) {
        this._button.classList.add(`${this._formSubmitDisabled}`);
        this._button.setAttribute('disabled', 'disabled');
      } else {
        this._button.classList.remove(`${this._formSubmitDisabled}`);
        this._button.removeAttribute('disabled', 'disabled');
      };
    }
  
    _checkInputValidity(input){
      const errorTextElement = this._form.querySelector(`.${input.id}-error`);
      input.validity.vaild ? this._hideInputError(errorTextElement, input) : this._showInputError(errorTextElement, input);
    }
  
    _setEventListener(){
      this._inputList.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        })
      })
    }
    
    enableValidation(){
      this._setEventListener();
    }
  
  }