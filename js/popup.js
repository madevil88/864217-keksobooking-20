'use strict';

(function () {
  window.popup = {
    'closePopup': function () {
      var mapCardList = window.pin.map.querySelectorAll('.map__card');
      for (var p = 0; p < mapCardList.length; p++) {
        if (!mapCardList[p].classList.contains('hidden')) {
          mapCardList[p].classList.add('hidden');
        }
      }

      document.removeEventListener('keydown', onPopupEscPress);
    },
    'openPopup': function (evt) {
      evt.preventDefault();
      var mapCardList = window.pin.map.querySelectorAll('.map__card');
      var mapPinList = window.pin.mapPins.querySelectorAll('.map__pin');
      for (var p = 1; p < mapPinList.length; p++) {
        if (mapPinList[p] === evt.target.parentElement || mapPinList[p] === evt.target) {
          for (var i = 0; i < mapCardList.length; i++) {
            if (!mapCardList[i].classList.contains('hidden')) {
              mapCardList[i].classList.add('hidden');
            }
          }
          mapCardList[p - 1].classList.remove('hidden');
          var closeButton = mapCardList[p - 1].querySelector('.popup__close');
          closeButton.addEventListener('click', function () {
            window.popup.closePopup();
          });
        }
      }

      document.addEventListener('keydown', onPopupEscPress);

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('keydown', function () {
        evt.preventDefault();
        if (evt.key === 'Enter') {
          window.popup.closePopup();
        }
      });
    },
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.popup.closePopup();
    }
  };

  window.pin.mapPins.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.popup.openPopup(evt);
    }
  });
})();
