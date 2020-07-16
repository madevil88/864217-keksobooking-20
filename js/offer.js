'use strict';

(function () {
  window.offer = {
    ads: [],
  };

  var getRandomArray = function (min, max, count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
      do {
        var index = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      while (arr.indexOf(index) !== -1);
      arr.push(index);
    }

    return arr;
  };

  var getRandomElement = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getAvatars = function () {
    var randomArrayIndexes = getRandomArray(1, window.data.AD_QUANTITY, window.data.AD_QUANTITY);
    for (var i = 0; i < window.data.AD_QUANTITY; i++) {
      var avatar = 'img/avatars/user0' + randomArrayIndexes[i] + '.png';
      var author = {
        'avatar': avatar
      };
      window.offer.ads.push({
        'author': author
      });
    }

    return window.offer.ads;
  };

  var getTitles = function () {
    var randomArrayIndexes = getRandomArray(1, window.data.AD_QUANTITY, window.data.AD_QUANTITY);
    var title = window.data.OFFER_TITLES[randomArrayIndexes[i] - 1];
    var offer = {
      'title': title
    };
    window.offer.ads[i].offer = offer;
    return window.offer.ads;
  };

  var getAddress = function () {
    var addresses = getRandomArray(window.data.MIN_LOCATION_Y, window.data.MAX_LOCATION_Y, window.data.AD_QUANTITY * 2);
    var address = addresses[i] + ', ' + addresses[i + window.data.AD_QUANTITY];
    window.offer.ads[i].offer.address = address;

    return window.offer.ads;
  };

  var getPrices = function () {
    var prices = getRandomArray(1000, 1000000, window.data.AD_QUANTITY);
    var price = prices[i];
    window.offer.ads[i].offer.price = price;

    return window.offer.ads;
  };

  var getTypes = function () {
    var index = getRandomElement(0, window.data.OFFER_TYPES.length - 1);
    var type = window.data.OFFER_TYPES[index];
    window.offer.ads[i].offer.type = type;

    return window.offer.ads;
  };

  var getRoomsQuantity = function () {
    var roomsQuantity = getRandomElement(1, 5);
    window.offer.ads[i].offer.rooms = roomsQuantity;
    return window.offer.ads;
  };

  var getGuestsQuantity = function () {
    var guestsQuantity = getRandomElement(1, 10);
    window.offer.ads[i].offer.guests = guestsQuantity;

    return window.offer.ads;
  };

  var getCheckinsTime = function () {
    var index = getRandomElement(0, window.data.OFFER_CHECKINS.length - 1);
    var checkinTime = window.data.OFFER_CHECKINS[index];
    window.offer.ads[i].offer.checkin = checkinTime;

    return window.offer.ads;
  };

  var getCheckoutsTime = function () {
    var index = getRandomElement(0, window.data.OFFER_CHECKOUTS.length - 1);
    var checkoutTime = window.data.OFFER_CHECKOUTS[index];
    window.offer.ads[i].offer.checkout = checkoutTime;

    return window.offer.ads;
  };

  var getFeatures = function () {
    var count = getRandomElement(1, window.data.OFFER_FEATURES.length);
    var randomArrayIndexes = getRandomArray(0, window.data.OFFER_FEATURES.length - 1, count);
    var features = [];
    for (var j = 0; j < randomArrayIndexes.length; j++) {
      features.push(window.data.OFFER_FEATURES[randomArrayIndexes[j]]);
    }
    window.offer.ads[i].offer.features = features;

    return window.offer.ads;
  };

  var getDescription = function () {
    var randomArrayIndexes = getRandomArray(0, window.data.OFFER_DESCRIPTIONS.length - 1, window.data.OFFER_DESCRIPTIONS.length);
    var description = window.data.OFFER_DESCRIPTIONS[randomArrayIndexes[i]];
    window.offer.ads[i].offer.description = description;

    return window.offer.ads;
  };

  var getPhotos = function () {
    var quantityPhotos = getRandomElement(1, 3);
    var photos = [];
    for (var j = 1; j <= quantityPhotos; j++) {
      var photoSrc = 'http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg';
      photos.push(photoSrc);
    }
    window.offer.ads[i].offer.photos = photos;

    return window.offer.ads;
  };

  var getLocationX = function () {
    var locationX = getRandomElement(1 - window.data.PIN_WIDTH, window.data.MAP_WIDTH - window.data.PIN_WIDTH);
    var location = {
      'x': locationX
    };
    window.offer.ads[i].location = location;

    return window.offer.ads;
  };

  var getLocationY = function () {
    var locationY = getRandomElement(window.data.MIN_LOCATION_Y - window.data.PIN_HEIGHT, window.data.MAX_LOCATION_Y - window.data.PIN_HEIGHT);
    window.offer.ads[i].location.y = locationY;

    return window.offer.ads;
  };

  getAvatars();

  for (var i = 0; i < window.data.AD_QUANTITY; i++) {
    getTitles();
    getAddress();
    getPrices();
    getTypes();
    getRoomsQuantity();
    getGuestsQuantity();
    getCheckinsTime();
    getCheckoutsTime();
    getFeatures();
    getDescription();
    getPhotos();
    getLocationX();
    getLocationY();
  }
})();
