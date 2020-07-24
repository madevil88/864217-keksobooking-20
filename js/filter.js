'use strict';

(function () {
  var filterTypeSelect;

  window.filter = {
    'updateAds': function () {
      var filterTypeСhoice = window.backend.ads.filter(function (it) {
        return it.offer.type === filterTypeSelect;
      });
      window.pin.renderMapPinsList(filterTypeСhoice);
      window.card.renderCardsList(filterTypeСhoice);
      window.popup.closePopup();
    },
  };
  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');

  filterType.addEventListener('change', function () {
    filterTypeSelect = filterType.value;
    window.filter.updateAds();

  });

})();
