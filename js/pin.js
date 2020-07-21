'use strict';

(function () {
  window.pin = {
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
    renderMapPinsList: function (ads) {
      var fragment = document.createDocumentFragment();
      for (var g = 0; g < ads.length; g++) {
        fragment.appendChild(renderMapPin(ads[g]));
      }
      window.pin.mapPins.appendChild(fragment);
    },
  };

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderMapPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ad.location.x + window.data.PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y + window.data.PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;
    mapPinElement.classList.add('hidden');

    return mapPinElement;
  };

  window.backend.load(window.pin.renderMapPinsList);
})();
