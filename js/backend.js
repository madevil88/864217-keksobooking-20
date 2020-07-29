'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;

  var choiceMessage = function (message) {
    if (document.querySelector('main').contains(message)) {
      document.querySelector('main').removeChild(message);
    }
  };

  var closeMessage = function () {
    var errorMessage = document.querySelector('.error');
    var successMessage = document.querySelector('.success');

    choiceMessage(errorMessage);
    choiceMessage(successMessage);

    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', errorMessageHandler);
  };

  var escPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var errorMessageHandler = function (evt) {
    evt.preventDefault();
    closeMessage();
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    document.querySelector('main').insertAdjacentElement('afterbegin', successMessage);

    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', errorMessageHandler);
  };

  var saveError = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);

    document.querySelector('main').insertAdjacentElement('afterbegin', errorMessage);

    var errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', errorMessageHandler);

    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', errorMessageHandler);
  };

  var loadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 20px auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.style.color = 'yellow';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    'ads': [],
    'load': function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_CODE_OK) {
          onLoad(xhr.response);
          window.filter.activatedFilters();
        } else {
          loadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        loadError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        loadError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },
    'save': function (data, onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_CODE_OK) {
          onLoad(xhr.response);
          onSuccess();
        } else {
          saveError();
        }
      });
      xhr.addEventListener('error', function () {
        saveError();
      });
      xhr.addEventListener('timeout', function () {
        saveError();
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    },
    'successHandler': function (data) {
      window.backend.ads = data;
      window.pin.renderMapPins(window.backend.ads);
      window.card.renderCards(window.backend.ads);
    }
  };
})();
