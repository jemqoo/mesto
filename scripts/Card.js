export default class Card {
    constructor(cardData, selectorTemplate, openImagePopup){
      this._cardData=cardData;
      this._link=cardData.link;
      this._name=cardData.name;
      this._selectorTemplate=selectorTemplate;
      this._openImagePopup=openImagePopup;
    }
  
    _getTemplateClone(){
      return document.querySelector(this._selectorTemplate).content.querySelector('.card').cloneNode(true);
    }
  
    _handleLike = () => {
      this._likeIconElement.classList.toggle('card__like-button_active')
    }
  
    _handleDeleteElement = () => {
      this._cloneElement.remove();
    }
  
    _handleOpenImagePopup = () => {
      this._openImagePopup(this._cardData)
    }
  
    _setEventListener(){
      this._likeIconElement.addEventListener('click',this._handleLike);
      this._trashElement.addEventListener('click',this._handleDeleteElement);
      this._imageElement.addEventListener('click',this._handleOpenImagePopup);
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
      this._setEventListener();
      return this._cloneElement;
    }

    
  }