'use strict';

(function () {
  window.form = {
    mapPinMain: window.pin.map.querySelector('.map__pin--main'),
    mapPinMainLocation: {
      x: window.pin.map.querySelector('.map__pin--main').offsetLeft,
      y: window.pin.map.querySelector('.map__pin--main').offsetTop
    },
    form: document.querySelector('.ad-form'),
    inputAdress: document.querySelector('#address'),
    activatedForms: function () {
      for (var z = 0; z < window.form.form.children.length; z++) {
        window.form.form.children[z].removeAttribute('disabled', '');
      }

      for (var o = 0; o < mapFilters.children.length; o++) {
        mapFilters.children[o].removeAttribute('disabled', '');
      }
    },
  };

  var mapFilters = window.pin.map.querySelector('.map__filters');

  var disabledForms = function () {
    for (var e = 0; e < window.form.form.children.length; e++) {
      window.form.form.children[e].setAttribute('disabled', '');
    }

    for (var q = 0; q < mapFilters.children.length; q++) {
      mapFilters.children[q].setAttribute('disabled', '');
    }
  };

  disabledForms();

  window.form.inputAdress.value = Math.round(window.form.mapPinMainLocation.x + (window.data.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(window.form.mapPinMainLocation.y + (window.data.MAP_PIN_MAIN_HEIGHT / 2));

  var titleInput = document.querySelector('#title');

  var titleInputValidation = function () {
    var valueLength = titleInput.value.length;
    titleInput.setCustomValidity('');
    if (valueLength < window.data.MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (window.data.MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.data.MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - window.data.MAX_TITLE_LENGTH) + ' симв.');
    }
  };

  titleInput.addEventListener('input', function () {
    titleInputValidation();
  });

  var typeInput = window.form.form.querySelector('#type');
  var priceInput = window.form.form.querySelector('#price');

  var priceInputValidation = function () {
    priceInput.setAttribute('placeholder', window.data.PRICE_MAP[typeInput.value]);
    priceInput.setAttribute('min', window.data.PRICE_MAP[typeInput.value]);
  };

  typeInput.addEventListener('input', function () {
    priceInputValidation();
  });

  var timeIn = window.form.form.querySelector('#timein');
  var timeOut = window.form.form.querySelector('#timeout');

  var timeInOutValidation = function (changeElement, setElement) {
    for (var y = 0; y < changeElement.children.length; y++) {
      setElement.children[y].removeAttribute('selected', '');
      changeElement.children[y].removeAttribute('selected', '');
      if (changeElement.children[y].selected) {
        setElement.children[y].setAttribute('selected', '');
        changeElement.children[y].setAttribute('selected', '');
      }
    }
  };

  timeIn.addEventListener('change', function () {
    timeInOutValidation(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    timeInOutValidation(timeOut, timeIn);
  });

  var rooomNumber = window.form.form.querySelector('#room_number');
  var capacity = window.form.form.querySelector('#capacity');

  var capacitySetAttributeDisabled = function (a) {
    capacity.children[a].setAttribute('disabled', '');
  };
  var capacityRemoveAttributeDisabled = function (startIndex, finishIndex) {
    for (var u = startIndex; u <= finishIndex; u++) {
      capacity.children[u].removeAttribute('disabled', '');
    }
  };
  var capacityOptionsDisabled = function () {
    for (var a = 0; a < capacity.children.length; a++) {
      capacitySetAttributeDisabled(a);
      if (rooomNumber.value === '1') {
        capacityRemoveAttributeDisabled(2, 2);
      } else if (rooomNumber.value === '2') {
        capacityRemoveAttributeDisabled(1, 2);
      } else if (rooomNumber.value === '3') {
        capacityRemoveAttributeDisabled(0, 2);
      } else if (rooomNumber.value === '100') {
        capacityRemoveAttributeDisabled(3, 3);
      }
    }
  };
  var capacitySetCustomValidity = function () {
    capacity.setCustomValidity('');
    if (rooomNumber.value === '1' && capacity.value !== '1') {
      capacity.setCustomValidity('Только для 1-го гостя');
    } else if (rooomNumber.value === '2' && (capacity.value > '2' || capacity.value === '0')) {
      capacity.setCustomValidity('Не более 2-х гостей');
    } else if (rooomNumber.value === '3' && (capacity.value > '3' || capacity.value === '0')) {
      capacity.setCustomValidity('Не более 3-х гостей');
    } else if (rooomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей');
    }
  };

  capacityOptionsDisabled();
  capacitySetCustomValidity();

  rooomNumber.addEventListener('change', function () {
    capacityOptionsDisabled();
    capacitySetCustomValidity();
  });

  capacity.addEventListener('change', function () {
    capacitySetCustomValidity();
  });
})();
