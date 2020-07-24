'use strict';

(function () {
  window.card = {
    'renderCardsList': function (ads) {
      var mapCardsList = window.pin.map.querySelectorAll('.map__card');
      for (var i = 0; i < mapCardsList.length; i++) {
        mapCardsList[i].remove();
      }
      var adsCount = window.data.MAX_ADS_COUNT;
      if (adsCount > ads.length) {
        adsCount = ads.length;
      }
      var fragment = document.createDocumentFragment();
      for (var w = 0; w < adsCount; w++) {
        fragment.appendChild(getCard(ads[w]));
      }
      window.pin.map.insertBefore(fragment, window.pin.map.querySelector('.map__filters-container'));
    },
  };
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var addCheckedField = function (field, value) {
    if (value.includes('undefined')) {
      field.remove();
    } else if (field.localName === 'img') {
      field.src = value;
    }
    field.textContent = value;
  };

  var getFeaturesList = function (elements, features) {
    elements.forEach(function (element) {
      features.forEach(function (feature) {
        if (element.classList[1] === 'popup__feature--' + feature) {
          element.textContent = feature;
        }
      });
      if (element.textContent === '') {
        element.remove();
      }
    });
  };

  var renderPhotosList = function (fieldList, value) {
    fieldList.children[0].src = value[0];
    for (var g = 1; g < value.length; g++) {
      var photo = fieldList.children[0].cloneNode(true);
      photo.src = value[g];
      fieldList.appendChild(photo);
    }
  };

  var getCard = function (ad) {
    var mapCardElement = cardTemplate.cloneNode(true);

    mapCardElement.classList.add('hidden');
    addCheckedField(mapCardElement.querySelector('.popup__title'), ad.offer.title);
    addCheckedField(mapCardElement.querySelector('.popup__text--address'), ad.offer.address);
    addCheckedField(mapCardElement.querySelector('.popup__text--price'), ad.offer.price + '₽/ночь');
    addCheckedField(mapCardElement.querySelector('.popup__type'), window.data.TYPE_MAP[ad.offer.type]);
    addCheckedField(mapCardElement.querySelector('.popup__text--capacity'), ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
    addCheckedField(mapCardElement.querySelector('.popup__text--time'), 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);

    var featuresList = mapCardElement.querySelectorAll('.popup__feature');
    getFeaturesList(featuresList, ad.offer.features);
    addCheckedField(mapCardElement.querySelector('.popup__description'), ad.offer.description);
    renderPhotosList(mapCardElement.querySelector('.popup__photos'), ad.offer.photos);
    addCheckedField(mapCardElement.querySelector('.popup__avatar'), ad.author.avatar);

    return mapCardElement;
  };
})();
