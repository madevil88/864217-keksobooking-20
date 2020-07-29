'use strict';

(function () {
  window.card = {
    'TYPE_MAP': {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    'renderCards': function (ads) {
      var mapCards = window.pin.map.querySelectorAll('.map__card');
      mapCards.forEach(function (it) {
        it.remove();
      });
      var adsCount = window.pin.MAX_ADS_COUNT;
      if (adsCount > ads.length) {
        adsCount = ads.length;
      }
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adsCount; i++) {
        fragment.appendChild(getCard(ads[i]));
      }
      window.pin.map.insertBefore(fragment, window.pin.map.querySelector('.map__filters-container'));
    },
  };
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var addCheckedFields = function (field, value) {
    if (value.includes('undefined')) {
      field.remove();
    } else if (field.localName === 'img') {
      field.src = value;
    }
    field.textContent = value;
  };

  var getFeatures = function (elementsBlock, features) {
    var elements = elementsBlock.children;
    var elementClasses = features.map(function (feature) {
      return 'popup__feature--' + feature;
    });
    for (var j = 0; j < elements.length; j++) {
      if (elementClasses.indexOf(elements[j].classList[1]) !== -1) {
        var feature = elements[j].classList[1].replace('.popup__feature--', '');
        elements[j].textContent = feature;
      } else {
        elements[j].classList.add('hidden');
      }
    }
  };

  var renderPhotos = function (fieldList, value) {
    fieldList.children[0].src = value[0];
    if (value.length === 0) {
      fieldList.remove();
    }
    for (var k = 1; k < value.length; k++) {
      var photo = fieldList.children[0].cloneNode(true);
      photo.src = value[k];
      fieldList.appendChild(photo);
    }
  };

  var getCard = function (ad) {
    var mapCardElement = cardTemplate.cloneNode(true);

    mapCardElement.classList.add('hidden');
    addCheckedFields(mapCardElement.querySelector('.popup__title'), ad.offer.title);
    addCheckedFields(mapCardElement.querySelector('.popup__text--address'), ad.offer.address);
    addCheckedFields(mapCardElement.querySelector('.popup__text--price'), ad.offer.price + '₽/ночь');
    addCheckedFields(mapCardElement.querySelector('.popup__type'), window.card.TYPE_MAP[ad.offer.type]);
    addCheckedFields(mapCardElement.querySelector('.popup__text--capacity'), ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
    if (ad.offer.rooms === 0) {
      mapCardElement.querySelector('.popup__text--capacity').remove();
    }
    addCheckedFields(mapCardElement.querySelector('.popup__text--time'), 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
    if (ad.offer.checkin === '0:00') {
      mapCardElement.querySelector('.popup__text--time').remove();
    }
    getFeatures(mapCardElement.querySelector('.popup__features'), ad.offer.features);
    if (ad.offer.features.length === 0) {
      mapCardElement.querySelector('.popup__features').remove();
    }
    addCheckedFields(mapCardElement.querySelector('.popup__description'), ad.offer.description);
    renderPhotos(mapCardElement.querySelector('.popup__photos'), ad.offer.photos);
    addCheckedFields(mapCardElement.querySelector('.popup__avatar'), ad.author.avatar);

    return mapCardElement;
  };
})();
