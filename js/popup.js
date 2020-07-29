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
      for (var i = 0; i < mapPins.length; i++) {
        if (mapPins[i].classList.contains('map__pin--active')) {
          mapPins[i].classList.remove('map__pin--active');
        }
      }

      document.removeEventListener('keydown', escPressHandler);
    },
    'openPopup': function (evt) {
      evt.preventDefault();
      var mapCards = window.pin.map.querySelectorAll('.map__card');
      var mapPins = window.pin.mapPinsBlock.querySelectorAll('.map__pin');

      addClassHidden(mapCards);
      for (var j = 1; j < mapPins.length; j++) {
        mapPins[j].classList.remove('map__pin--active');
        if (mapPins[j] === evt.target.parentElement || mapPins[j] === evt.target) {
          mapPins[j].classList.add('map__pin--active');
          mapCards[j - 1].classList.remove('hidden');
          var closeButton = mapCards[j - 1].querySelector('.popup__close');
        }
      }

      closeButton.addEventListener('click', closeButtonHandler);
      closeButton.addEventListener('keydown', closePopupEnterHandler);
      document.addEventListener('keydown', escPressHandler);

    },
  };
})();
