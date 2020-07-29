'use strict';

(function () {
  window.form = {
    'MIN_TITLE_LENGTH': 30,
    'MAX_TITLE_LENGTH': 100,
    'PRICE_MAP': {
      'bungalo': '0',
      'flat': '1000',
      'house': '5000',
      'palace': '10000'
    },
    'mapPinMain': window.pin.map.querySelector('.map__pin--main'),
    'mapFilters': window.pin.map.querySelector('.map__filters'),
    'formAd': document.querySelector('.ad-form'),
    'enterAdress': function () {
      var adress = document.querySelector('#address');
      adress.value = Math.round(window.form.mapPinMain.offsetLeft + window.pin.MAP_PIN_MAIN_WIDTH / 2) + ', ' + Math.round(window.form.mapPinMain.offsetTop + (window.pin.MAP_PIN_MAIN_HEIGHT + window.pin.TAIL_MAP_PIN_MAIN_HEIGHT));
      if (window.pin.map.classList.contains('map--faded')) {
        adress.value = Math.round(window.form.mapPinMain.offsetLeft + (window.pin.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(window.form.mapPinMain.offsetTop + (window.pin.MAP_PIN_MAIN_HEIGHT / 2));
      }

      return adress.value;
    },
    'activateForm': function () {
      for (var index1 = 0; index1 < window.form.formAd.children.length; index1++) {
        window.form.formAd.children[index1].removeAttribute('disabled');
      }
    },
  };

  var disableForms = function () {
    for (var index2 = 0; index2 < window.form.formAd.children.length; index2++) {
      window.form.formAd.children[index2].setAttribute('disabled', '');
    }

    for (var index3 = 0; index3 < window.form.mapFilters.children.length; index3++) {
      window.form.mapFilters.children[index3].setAttribute('disabled', '');
    }
  };

  disableForms();

  window.form.enterAdress();

  var titleInput = document.querySelector('#title');

  var titleInputValidation = function () {
    var valueLength = titleInput.value.length;
    titleInput.setCustomValidity('');
    if (valueLength < window.form.MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (window.form.MIN_TITLE_LENGTH - valueLength) + ' симв., минимум 30 симв.');
    } else if (valueLength > window.form.MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - window.form.MAX_TITLE_LENGTH) + ' симв., максимум 100 симв.');
    }
  };

  titleInput.addEventListener('input', function () {
    titleInputValidation();
  });

  var typeInput = window.form.formAd.querySelector('#type');
  var priceInput = window.form.formAd.querySelector('#price');

  var priceInputValidation = function () {
    priceInput.setAttribute('placeholder', window.form.PRICE_MAP[typeInput.value]);
    priceInput.setAttribute('min', window.form.PRICE_MAP[typeInput.value]);
  };

  typeInput.addEventListener('input', function () {
    priceInputValidation();
  });

  var timeIn = window.form.formAd.querySelector('#timein');
  var timeOut = window.form.formAd.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var rooomNumber = window.form.formAd.querySelector('#room_number');
  var capacity = window.form.formAd.querySelector('#capacity');

  var capacitySetAttributeDisabled = function (index) {
    capacity.children[index].setAttribute('disabled', '');
  };
  var capacityRemoveAttributeDisabled = function (startIndex, finishIndex) {
    for (var index5 = startIndex; index5 <= finishIndex; index5++) {
      capacity.children[index5].removeAttribute('disabled');
    }
  };
  var capacityOptionsDisabled = function () {
    for (var index6 = 0; index6 < capacity.children.length; index6++) {
      capacitySetAttributeDisabled(index6);
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

  var pageDeactivatHandler = function () {
    window.pin.map.classList.add('map--faded');
    var pinMain = window.pin.mapPinsBlock.querySelector('.map__pin--main');
    pinMain.style.left = 570 + 'px';
    pinMain.style.top = 375 + 'px';
    window.form.formAd.classList.add('ad-form--disabled');
    window.form.formAd.reset();
    priceInputValidation();
    window.form.enterAdress();
    disableForms();
    window.popup.closePopup();
    var mapFiltersList = document.querySelectorAll('.map__filter');
    mapFiltersList.forEach(function (it) {
      it.value = 'any';
    });
    var mapPins = window.pin.mapPinsBlock.querySelectorAll('.map__pin');
    for (var index6 = 1; index6 < mapPins.length; index6++) {
      mapPins[index6].remove();
    }
    var avatarPreview = window.form.formAd.querySelector('.ad-form-header__preview').querySelector('img');
    avatarPreview.src = 'img/muffin-grey.svg';
    var photoPreviews = window.form.formAd.querySelector('.ad-form__photo').querySelectorAll('img');
    photoPreviews.forEach(function (it) {
      it.remove();
    });
  };

  window.form.formAd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.formAd), function () {
      pageDeactivatHandler();
    });
  });

  var formReset = window.form.formAd.querySelector('.ad-form__reset');

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    pageDeactivatHandler();
  });
})();
