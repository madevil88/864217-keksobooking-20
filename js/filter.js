'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');
  var filterTypeSelect = 'any';

  filterType.addEventListener('change', function () {
    filterTypeSelect = filterType.value;
    window.debounce(window.filter.updateAds);
  });

  var filterPrice = mapFilters.querySelector('#housing-price');
  var filterPriceSelect = 'any';

  filterPrice.addEventListener('change', function () {
    filterPriceSelect = filterPrice.value;
    window.debounce(window.filter.updateAds);
  });

  var filterRooms = mapFilters.querySelector('#housing-rooms');
  var filterRoomSelect = 'any';

  filterRooms.addEventListener('change', function () {
    filterRoomSelect = filterRooms.value;
    window.debounce(window.filter.updateAds);
  });

  var filterGuests = mapFilters.querySelector('#housing-guests');
  var filterGuestSelect = 'any';

  filterGuests.addEventListener('change', function () {
    filterGuestSelect = filterGuests.value;
    window.debounce(window.filter.updateAds);
  });

  var housingFeatures = mapFilters.querySelector('#housing-features');
  var checkedHousingFeatures = [];

  housingFeatures.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      if (checkedHousingFeatures.indexOf(evt.target.value) === -1) {
        checkedHousingFeatures.push(evt.target.value);
      }
    } else {
      var index = checkedHousingFeatures.indexOf(evt.target.value);
      checkedHousingFeatures.splice(index, 1);
    }
    window.debounce(window.filter.updateAds);
  });

  window.filter = {
    'updateAds': function () {
      var selectedTypeHousing = window.backend.ads.filter(function (it) {
        if (filterTypeSelect === 'any') {
          return it;
        } else {
          return it.offer.type === filterTypeSelect;
        }
      });

      var selectedPriceHousing = selectedTypeHousing.filter(function (it) {
        var price;
        if (filterPriceSelect === 'high') {
          price = it.offer.price > 50000;
        } else if (filterPriceSelect === 'middle') {
          price = it.offer.price >= 10000 && it.offer.price <= 50000;
        } else if (filterPriceSelect === 'low') {
          price = it.offer.price < 10000;
        } else {
          price = it;
        }
        return price;
      });

      var selectedRoomHousing = selectedPriceHousing.filter(function (it) {
        if (filterRoomSelect === 'any') {
          return it;
        } else {
          return it.offer.rooms.toString() === filterRoomSelect;
        }
      });

      var selectedGuestHousing = selectedRoomHousing.filter(function (it) {
        if (filterGuestSelect === 'any') {
          return it;
        } else {
          return it.offer.guests.toString() === filterGuestSelect;
        }
      });

      var selectedHousingFeatures = selectedGuestHousing.filter(function (it) {
        if (checkedHousingFeatures[0]) {
          return it.offer.features.includes(checkedHousingFeatures[0]);
        } else {
          return it;
        }
      }).filter(function (it) {
        if (checkedHousingFeatures[1]) {
          return it.offer.features.includes(checkedHousingFeatures[1]);
        } else {
          return it;
        }
      }).filter(function (it) {
        if (checkedHousingFeatures[2]) {
          return it.offer.features.includes(checkedHousingFeatures[2]);
        } else {
          return it;
        }
      }).filter(function (it) {
        if (checkedHousingFeatures[3]) {
          return it.offer.features.includes(checkedHousingFeatures[3]);
        } else {
          return it;
        }
      }).filter(function (it) {
        if (checkedHousingFeatures[4]) {
          return it.offer.features.includes(checkedHousingFeatures[4]);
        } else {
          return it;
        }
      }).filter(function (it) {
        if (checkedHousingFeatures[5]) {
          return it.offer.features.includes(checkedHousingFeatures[5]);
        } else {
          return it;
        }
      });

      window.pin.renderMapPinsList(selectedHousingFeatures);
      window.card.renderCardsList(selectedHousingFeatures);
      window.popup.closePopup();
    },
  };
})();
