'use strict';

(function () {

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function (evt) {
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
          closePopup();
        });
      }
    }

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var mapCardList = window.pin.map.querySelectorAll('.map__card');
    var mapPinList = window.pin.mapPins.querySelectorAll('.map__pin');
    for (var p = 1; p < mapPinList.length; p++) {
      if (!mapCardList[p - 1].classList.contains('hidden')) {
        mapCardList[p - 1].classList.add('hidden');
      }
    }

    document.removeEventListener('keydown', onPopupEscPress);
  };


  window.pin.mapPins.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.mapPinMain.removeEventListener('mousedown', window.pinMain.pageActiveHandler);
    openPopup(evt);
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('keydown', function () {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        closePopup();
      }
    });
  });

  window.pin.mapPins.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      openPopup(evt);
    }
  });
})();
