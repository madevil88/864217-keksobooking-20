'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var priceSelectOption = {
    'HIGH': 'high',
    'MIDDLE': 'middle',
    'LOW': 'low'
  };
  var priceSelectValue = {
    'HIGH': '50000',
    'LOW': '10000'
  };
  var selectFilters = [{
    'filterType': 'any',
    'filterPrice': 'any',
    'filterRooms': 'any',
    'filterGuests': 'any'
  },
  []
  ];
  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');
  var filterPrice = mapFilters.querySelector('#housing-price');
  var filterRooms = mapFilters.querySelector('#housing-rooms');
  var filterGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  filterType.addEventListener('change', function (evt) {
    selectFilters[0].filterType = evt.target.value;
    window.debounce(window.filter.updateAds);
  });

  filterPrice.addEventListener('change', function (evt) {
    selectFilters[0].filterPrice = evt.target.value;
    window.debounce(window.filter.updateAds);
  });

  filterRooms.addEventListener('change', function (evt) {
    selectFilters[0].filterRooms = evt.target.value;
    window.debounce(window.filter.updateAds);
  });

  filterGuests.addEventListener('change', function (evt) {
    selectFilters[0].filterGuests = evt.target.value;
    window.debounce(window.filter.updateAds);
  });

  housingFeatures.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      if (selectFilters[1].indexOf(evt.target.value) === -1) {
        selectFilters[1].push(evt.target.value);
      }
    } else {
      var index = selectFilters[1].indexOf(evt.target.value);
      selectFilters[1].splice(index, 1);
    }
    window.debounce(window.filter.updateAds);
  });

  var getSelectedFeatures = function (card) {
    for (var featureIndex = 0; featureIndex < selectFilters[1].length; featureIndex++) {
      if (card.offer.features.indexOf(selectFilters[1][featureIndex]) === -1 && selectFilters[1].length !== 0) {
        return false;
      }
    }
    return true;
  };

  window.filter = {
    'activatedFilters': function () {
      for (var index = 0; index < window.form.mapFilters.children.length; index++) {
        window.form.mapFilters.children[index].removeAttribute('disabled');
      }
    },
    'updateAds': function () {
      var filterAds = window.backend.ads.filter(function (ad) {

        if (ad.offer.type === selectFilters[0].filterType || selectFilters[0].filterType === DEFAULT_FILTER_VALUE) {
          if (ad.offer.rooms.toString() === selectFilters[0].filterRooms || selectFilters[0].filterRooms === DEFAULT_FILTER_VALUE) {
            if (ad.offer.guests.toString() === selectFilters[0].filterGuests || selectFilters[0].filterGuests === DEFAULT_FILTER_VALUE) {
              if ((selectFilters[0].filterPrice === priceSelectOption.MIDDLE && (ad.offer.price >= priceSelectValue.LOW && ad.offer.price <= priceSelectValue.HIGH)) || selectFilters[0].filterPrice === DEFAULT_FILTER_VALUE) {
                return getSelectedFeatures(ad);
              }
            } else if ((selectFilters[0].filterPrice === priceSelectOption.HIGH && ad.offer.price > priceSelectValue.HIGH) || selectFilters[0].filterPrice === DEFAULT_FILTER_VALUE) {
              return getSelectedFeatures(ad);
            } else if ((selectFilters[0].filterPrice === priceSelectOption.LOW && ad.offer.price < priceSelectValue.LOW) || selectFilters[0].filterPrice === DEFAULT_FILTER_VALUE) {
              return getSelectedFeatures(ad);
            }
          }
        }

        return false;
      });

      window.pin.renderMapPins(filterAds);
      window.card.renderCards(filterAds);
      window.popup.closePopup();
    },
  };
})();
