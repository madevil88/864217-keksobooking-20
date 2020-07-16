'use strict';

(function () {
  var popup = document.querySelector('.popup');
  var popupClose = popup.querySelector('.popup__close');
  var mapCardList = window.pin.map.querySelectorAll('.map__card');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function (evt) {
    var mapPinList = window.pin.mapPins.querySelectorAll('.map__pin');
    for (var p = 1; p < mapPinList.length; p++) {
      if (mapPinList[p] === evt.target.parentElement || mapPinList[p] === evt.target) {
        if (!mapCardList[p - 1].classList.contains('hidden')) {
          mapCardList[p - 1].classList.add('hidden');
        }
        mapCardList[p - 1].classList.remove('hidden');
        var closeButton = mapCardList[p - 1].querySelector('.popup__close');

        closeButton.addEventListener('click', function () {
          closePopup();
        });
      }
    }

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var mapPinList = window.pin.mapPins.querySelectorAll('.map__pin');
    for (var p = 1; p < mapPinList.length; p++) {
      if (!mapCardList[p - 1].classList.contains('hidden')) {
        mapCardList[p - 1].classList.add('hidden');
      }
    }

    document.removeEventListener('keydown', onPopupEscPress);
  };

  popupClose.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      closePopup();
    }
  });

  window.pin.mapPins.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.mapPinMain.removeEventListener('mousedown', window.pageControl.pageActiveHandler);
    openPopup(evt);
  });

  window.pin.mapPins.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      openPopup(evt);
    }
  });
})();
