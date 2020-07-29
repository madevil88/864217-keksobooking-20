'use strict';

(function () {
  var addClassHidden = function (elements) {
    elements.forEach(function (it) {
      if (!it.classList.contains('hidden')) {
        it.classList.add('hidden');
        it.querySelector('.popup__close').removeEventListener('click', closeButtonHandler);
        it.querySelector('.popup__close').removeEventListener('keydown', closePopupEnterHandler);
      }
    });
  };

  var escPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.popup.closePopup();
    }
  };

  var closeButtonHandler = function () {
    window.popup.closePopup();
  };

  var closePopupEnterHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.popup.closePopup();
    }
  };

  window.popup = {
    'closePopup': function () {
      var mapCards = window.pin.map.querySelectorAll('.map__card');
      var mapPins = window.pin.mapPinsBlock.querySelectorAll('.map__pin');
      addClassHidden(mapCards);
      for (var mapPinIndex = 0; mapPinIndex < mapPins.length; mapPinIndex++) {
        if (mapPins[mapPinIndex].classList.contains('map__pin--active')) {
          mapPins[mapPinIndex].classList.remove('map__pin--active');
        }
      }

      document.removeEventListener('keydown', escPressHandler);
    },
    'openPopup': function (evt) {
      evt.preventDefault();
      var mapCards = window.pin.map.querySelectorAll('.map__card');
      var mapPins = window.pin.mapPinsBlock.querySelectorAll('.map__pin');

      addClassHidden(mapCards);
      for (var index = 1; index < mapPins.length; index++) {
        mapPins[index].classList.remove('map__pin--active');
        if (mapPins[index] === evt.target.parentElement || mapPins[index] === evt.target) {
          mapPins[index].classList.add('map__pin--active');
          mapCards[index - 1].classList.remove('hidden');
          var closeButton = mapCards[index - 1].querySelector('.popup__close');
        }
      }

      closeButton.addEventListener('click', closeButtonHandler);
      closeButton.addEventListener('keydown', closePopupEnterHandler);
      document.addEventListener('keydown', escPressHandler);

    },
  };
})();
