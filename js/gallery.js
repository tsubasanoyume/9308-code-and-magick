/* global Gallery: true */

(function() {

  var key = {
    'LEFT' : 37,
    'RIGHT' : 39,
    'ESC' : 27
  };

  var galleryContainer = document.querySelector('.photogallery');

  var Gallery = function() {
    this._element = document.querySelector('.overlay-gallery');
    this._closeButton = document.querySelector('.overlay-gallery-close');
    this._leftButton = document.querySelector('.overlay-gallery-control-left');
    this._rightButton = document.querySelector('.overlay-gallery-control-right');
    this._pictureElement = this._element.querySelector('.overlay-gallery-preview');

    this._photos = [];
    this._currentPhoto = 0;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onLeftArrowClick = this._onLeftArrowClick.bind(this);
    this._onRightArrowClick = this._onRightArrowClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  };

  Gallery.prototype.show = function() {
    this._element.classList.remove('invisible');
    this._closeButton.addEventListener('click', this._onCloseButtonClick);
    this._leftButton.addEventListener('click', this._onLeftArrowClick);
    this._rightButton.addEventListener('click', this._onRightArrowClick);
    document.body.addEventListener('keydown', this._onDocumentKeyDown);

    this.setCurrentPhoto();
  };

  Gallery.prototype.hide = function () {
    this._element.classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseButtonClick);
    this._leftButton.removeEventListener('click', this._onLeftArrowClick);
    this._rightButton.removeEventListener('click', this._onRightArrowClick);
    document.body.removeEventListener('keyDown', this._onDocumentKeyDown);

    this._photos = [];
    this._currentPhoto = 0;
  };

  Gallery.prototype.setPhotos = function() {
    var images = document.querySelectorAll('.photogallery-image img');

    for (var i = 0; i < images.length; i++) {
      this._photos.push(images[i].src);
    }
  };

  Gallery.prototype._onCloseButtonClick = function(evt) {
    evt.preventDefault();
    this.hide();
  };

  Gallery.prototype._onLeftArrowClick = function(evt) {
    evt.preventDefault();
    this.setCurrentPhoto(this._currentPhoto - 1);
  };

  Gallery.prototype._onRightArrowClick = function(evt) {
    evt.preventDefault();
    this.setCurrentPhoto(this._currentPhoto + 1);
  };

  Gallery.prototype._onDocumentKeyDown = function(evt) {
    switch (evt.keyCode) {
      case key.LEFT :
        this.setCurrentPhoto(this._currentPhoto - 1);
        break;
      case key.RIGHT :
        this.setCurrentPhoto(this._currentPhoto + 1);
        break;
      case key.ESC :
        this.hide();
        break;
    }
  };

  Gallery.prototype.setCurrentPhoto = function(index) {

    var imageElement = new Image();
    imageElement.src = this._photos[this._currentPhoto];
    imageElement.onload = function() {
      this._pictureElement.appendChild(imageElement);
    }.bind(this);

    this._currentPhoto = index;

    this._pictureElement.innerHTML = '';
  };

  galleryContainer.addEventListener('click', function(evt) {
    if (evt.target.parentNode.classList.contains('photogallery-image')) {
      var gallery = new Gallery();
      gallery.setPhotos();
      gallery.show();
    }
  });

  window.Gallery = Gallery;

})();
