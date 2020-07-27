'use strict';

(function () {
  window.pinMain = {
    pageActiveHandler: function () {
      window.pin.map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      window.form.inputAdress();
      window.form.activatedForms();
      var mapPinList = window.pin.mapPins.querySelectorAll('.map__pin');
      if (mapPinList.length === 1) {
        window.filter.updateAds();
      }
    },
  };

  var getMainPinLimitation = function (currentLocation, minLocation, maxLocation) {
    var stylePosition = currentLocation;
    if (currentLocation < minLocation) {
      stylePosition = minLocation;
    } else if (currentLocation > maxLocation) {
      stylePosition = maxLocation;
    }

    return stylePosition;
  };

  var getMainPinLocation = function (shiftX, shiftY) {
    var currentLocation = {
      x: window.form.mapPinMain.offsetLeft - shiftX,
      y: window.form.mapPinMain.offsetTop - shiftY
    };

    var minLocation = {
      x: 0 - (window.data.MAP_PIN_MAIN_WIDTH / 2),
      y: window.data.MIN_LOCATION_Y - window.data.MAP_PIN_MAIN_HEIGHT - window.data.TAIL_MAP_PIN_MAIN_HEIGHT
    };

    var maxLocation = {
      x: 1200 - (window.data.MAP_PIN_MAIN_WIDTH / 2),
      y: window.data.MAX_LOCATION_Y - window.data.MAP_PIN_MAIN_HEIGHT - window.data.TAIL_MAP_PIN_MAIN_HEIGHT
    };

    window.form.mapPinMain.style.top = getMainPinLimitation(currentLocation.y, minLocation.y, maxLocation.y) + 'px';
    window.form.mapPinMain.style.left = getMainPinLimitation(currentLocation.x, minLocation.x, maxLocation.x) + 'px';
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();
    window.pinMain.pageActiveHandler();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      getMainPinLocation(shift.x, shift.y);
      window.form.inputAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.inputAdress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  };

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.pinMain.pageActiveHandler();
    }
  });

  window.form.mapPinMain.addEventListener('mousedown', onMouseDown);
})();
