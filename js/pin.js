'use strict';

(function () {

  window.pin = {
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
    renderMapPinsList: function (ads) {
      var mapPinsList = window.pin.mapPins.querySelectorAll('.map__pin');
      for (var i = 1; i < mapPinsList.length; i++) {
        mapPinsList[i].remove();
      }
      var adsCount = window.data.MAX_ADS_COUNT;
      if (adsCount > ads.length) {
        adsCount = ads.length;
      }
      var fragment = document.createDocumentFragment();
      for (var g = 0; g < adsCount; g++) {
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
    if (ad.offer !== 'undefined') {
      mapPinElement.style.left = ad.location.x + window.data.PIN_WIDTH / 2 + 'px';
      mapPinElement.style.top = ad.location.y + window.data.PIN_HEIGHT + 'px';
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
