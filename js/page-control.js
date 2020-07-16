'use strict';

(function () {
  window.pageControl = {
    pageActiveHandler: function () {
      window.pin.map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      window.form.inputAdress.value = Math.round(window.form.mapPinMainLocation.x + window.data.MAP_PIN_MAIN_WIDTH / 2) + ', ' + Math.round(window.form.mapPinMainLocation.y + (window.data.MAP_PIN_MAIN_HEIGHT + window.data.TAIL_MAP_PIN_MAIN_HEIGHT));
      window.form.activatedForms();
      window.pin.renderMapPinsList();
    },
  };

  window.form.mapPinMain.addEventListener('mousedown', window.pageControl.pageActiveHandler);

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.pageControl.pageActiveHandler();
    }
  });
})();
