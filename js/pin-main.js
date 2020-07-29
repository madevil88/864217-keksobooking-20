'use strict';

(function () {
  window.pinMain = {
    'pageActiveHandler': function () {
      if (window.pin.map.classList.contains('map--faded')) {
        window.pin.map.classList.remove('map--faded');
        window.form.formAd.classList.remove('ad-form--disabled');
        window.form.enterAdress();
        window.form.activateForm();
        window.backend.load(window.backend.successHandler);
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
      x: window.pin.MIN_LOCATION_X - (window.pin.MAP_PIN_MAIN_WIDTH / 2),
      y: window.pin.MIN_LOCATION_Y - window.pin.MAP_PIN_MAIN_HEIGHT - window.pin.TAIL_MAP_PIN_MAIN_HEIGHT
    };

    var maxLocation = {
      x: window.pin.MAX_LOCATION_X - (window.pin.MAP_PIN_MAIN_WIDTH / 2),
      y: window.pin.MAX_LOCATION_Y - window.pin.MAP_PIN_MAIN_HEIGHT - window.pin.TAIL_MAP_PIN_MAIN_HEIGHT
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
      window.form.enterAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.enterAdress();

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
