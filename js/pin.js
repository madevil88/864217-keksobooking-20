'use strict';

(function () {

  window.pin = {
    'MIN_LOCATION_Y': 130,
    'MAX_LOCATION_Y': 630,
    'MIN_LOCATION_X': 0,
    'MAX_LOCATION_X': 1200,
    'PIN_WIDTH': 50,
    'PIN_HEIGHT': 70,
    'MAP_PIN_MAIN_WIDTH': 65,
    'MAP_PIN_MAIN_HEIGHT': 65,
    'TAIL_MAP_PIN_MAIN_HEIGHT': 15,
    'MAX_ADS_COUNT': 5,
    'map': document.querySelector('.map'),
    'mapPinsBlock': document.querySelector('.map__pins'),
    'renderMapPins': function (ads) {
      var mapPins = window.pin.mapPinsBlock.querySelectorAll('.map__pin');
      for (var i = 1; i < mapPins.length; i++) {
        mapPins[i].remove();
      }
      var adsCount = window.pin.MAX_ADS_COUNT;
      if (adsCount > ads.length) {
        adsCount = ads.length;
      }
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < adsCount; j++) {
        fragment.appendChild(renderMapPin(ads[j]));
      }
      window.pin.mapPinsBlock.appendChild(fragment);
    },
  };

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderMapPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    if (ad.offer !== 'undefined') {
      mapPinElement.style.left = ad.location.x - window.pin.PIN_WIDTH / 2 + 'px';
      mapPinElement.style.top = ad.location.y - window.pin.PIN_HEIGHT + 'px';
      mapPinElement.querySelector('img').src = ad.author.avatar;
      mapPinElement.querySelector('img').alt = ad.offer.title;
      mapPinElement.addEventListener('click', window.popup.openPopup);
      mapPinElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          window.popup.openPopup(evt);
        }
      });
    }

    return mapPinElement;
  };

})();
