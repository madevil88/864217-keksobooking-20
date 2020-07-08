'use strict';

var OFFER_TITLES = [
  'Аренда недорого',
  'Аренда дорого',
  'Аренда в самом центре',
  'Аренда удобного жилья',
  'Аренда просторного жилья',
  'Аренда жилья в тихом районе',
  'Аренда жилья с современным дизайном',
  'Аренда уютного жилья'
];
var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var OFFER_CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var OFFER_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var OFFER_DESCRIPTIONS = [
  'Южная сторона',
  'Приятные соседи',
  'Вид на сад',
  'Тихий двор',
  'Удобная парковка',
  'Новая детская площадка',
  'Скоростной лифт',
  'Возможно заселение с домашними животными'
];

var AD_QUANTITY = 8;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_WIDTH = 1200;
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65;
var TAIL_MAP_PIN_MAIN_HEIGHT = 15;
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
// var TYPE_MAP = {
//   'palace': 'Дворец',
//   'flat': 'Квартира',
//   'house': 'Дом',
//   'bungalo': 'Бунгало'
// };
var PRICE_MAP = {
  'bungalo': '0',
  'flat': '1000',
  'house': '5000',
  'palace': '10000'
};

var ads = [];

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
  var randomArrayIndexes = getRandomArray(1, AD_QUANTITY, AD_QUANTITY);
  for (var i = 0; i < AD_QUANTITY; i++) {
    var avatar = 'img/avatars/user0' + randomArrayIndexes[i] + '.png';
    var author = {
      'avatar': avatar
    };
    ads.push({
      'author': author
    });
  }

  return ads;
};

var getTitles = function () {
  var randomArrayIndexes = getRandomArray(1, AD_QUANTITY, AD_QUANTITY);
  var title = OFFER_TITLES[randomArrayIndexes[i] - 1];
  var offer = {
    'title': title
  };
  ads[i].offer = offer;
  return ads;
};

var getAddress = function () {
  var addresses = getRandomArray(MIN_LOCATION_Y, MAX_LOCATION_Y, AD_QUANTITY * 2);
  var address = addresses[i] + ', ' + addresses[i + AD_QUANTITY];
  ads[i].offer.address = address;

  return ads;
};

var getPrices = function () {
  var prices = getRandomArray(1000, 1000000, AD_QUANTITY);
  var price = prices[i];
  ads[i].offer.price = price;

  return ads;
};

var getTypes = function () {
  var index = getRandomElement(0, OFFER_TYPES.length - 1);
  var type = OFFER_TYPES[index];
  ads[i].offer.type = type;

  return ads;
};

var getRoomsQuantity = function () {
  var roomsQuantity = getRandomElement(1, 5);
  ads[i].offer.rooms = roomsQuantity;
  return ads;
};

var getGuestsQuantity = function () {
  var guestsQuantity = getRandomElement(1, 10);
  ads[i].offer.guests = guestsQuantity;

  return ads;
};

var getCheckinsTime = function () {
  var index = getRandomElement(0, OFFER_CHECKINS.length - 1);
  var checkinTime = OFFER_CHECKINS[index];
  ads[i].offer.checkin = checkinTime;

  return ads;
};

var getCheckoutsTime = function () {
  var index = getRandomElement(0, OFFER_CHECKOUTS.length - 1);
  var checkoutTime = OFFER_CHECKOUTS[index];
  ads[i].offer.checkout = checkoutTime;

  return ads;
};

var getFeatures = function () {
  var count = getRandomElement(1, OFFER_FEATURES.length);
  var randomArrayIndexes = getRandomArray(0, OFFER_FEATURES.length - 1, count);
  var features = [];
  for (var j = 0; j < randomArrayIndexes.length; j++) {
    features.push(OFFER_FEATURES[randomArrayIndexes[j]]);
  }
  ads[i].offer.features = features;

  return ads;
};

var getDescription = function () {
  var randomArrayIndexes = getRandomArray(0, OFFER_DESCRIPTIONS.length - 1, OFFER_DESCRIPTIONS.length);
  var description = OFFER_DESCRIPTIONS[randomArrayIndexes[i]];
  ads[i].offer.description = description;

  return ads;
};

var getPhotos = function () {
  var quantityPhotos = getRandomElement(1, 3);
  var photos = [];
  for (var j = 1; j <= quantityPhotos; j++) {
    var photoSrc = 'http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg';
    photos.push(photoSrc);
  }
  ads[i].offer.photos = photos;

  return ads;
};

var getLocationX = function () {
  var locationX = getRandomElement(1 - PIN_WIDTH, MAP_WIDTH - PIN_WIDTH);
  var location = {
    'x': locationX
  };
  ads[i].location = location;

  return ads;
};

var getLocationY = function () {
  var locationY = getRandomElement(MIN_LOCATION_Y - PIN_HEIGHT, MAX_LOCATION_Y - PIN_HEIGHT);
  ads[i].location.y = locationY;

  return ads;
};

getAvatars();

for (var i = 0; i < AD_QUANTITY; i++) {
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

var map = document.querySelector('.map');
// var mapPins = map.querySelector('.map__pins');
// var mapPinTemplate = document.querySelector('#pin')
//   .content
//   .querySelector('.map__pin');

// var renderMapPin = function (ad) {
//   var mapPinElement = mapPinTemplate.cloneNode(true);

//   mapPinElement.style.left = ad.location.x + PIN_WIDTH / 2 + 'px';
//   mapPinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
//   mapPinElement.querySelector('img').src = ad.author.avatar;
//   mapPinElement.querySelector('img').alt = ad.offer.title;

//   return mapPinElement;
// };

// var renderMapPinsList = function () {
//   var fragment = document.createDocumentFragment();
//   for (var g = 0; g < ads.length; g++) {
//     fragment.appendChild(renderMapPin(ads[g]));
//   }
//   mapPins.appendChild(fragment);
// };
// renderMapPinsList();

// var cardTemplate = document.querySelector('#card')
//   .content
//   .querySelector('.map__card');

// var addCheckedField = function (field, value) {
//   if (value.includes('undefined')) {
//     field.remove();
//   } else if (field.localName === 'img') {
//     field.src = value;
//   }
//   field.textContent = value;
// };

// var getFeaturesList = function (elements, features) {
//   elements.forEach(function (element) {
//     features.forEach(function (feature) {
//       if (element.classList[1] === 'popup__feature--' + feature) {
//         element.textContent = feature;
//       }
//     });
//     if (element.textContent === '') {
//       element.remove();
//     }
//   });
// };

// var renderPhotosList = function (fieldList, value) {
//   fieldList.children[0].src = value[0];
//   for (var g = 1; g < value.length; g++) {
//     var photo = fieldList.children[0].cloneNode(true);
//     photo.src = value[g];
//     fieldList.appendChild(photo);
//   }
// };

// var getCard = function (ad) {
//   var mapCardElement = cardTemplate.cloneNode(true);

//   addCheckedField(mapCardElement.querySelector('.popup__title'), ad.offer.title);
//   addCheckedField(mapCardElement.querySelector('.popup__text--address'), ad.offer.address);
//   addCheckedField(mapCardElement.querySelector('.popup__text--price'), ad.offer.price + '₽/ночь');
//   addCheckedField(mapCardElement.querySelector('.popup__type'), TYPE_MAP[ad.offer.type]);
//   addCheckedField(mapCardElement.querySelector('.popup__text--capacity'), ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
//   addCheckedField(mapCardElement.querySelector('.popup__text--time'), 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);

//   var featuresList = mapCardElement.querySelectorAll('.popup__feature');
//   getFeaturesList(featuresList, ad.offer.features);
//   addCheckedField(mapCardElement.querySelector('.popup__description'), ad.offer.description);
//   renderPhotosList(mapCardElement.querySelector('.popup__photos'), ad.offer.photos);
//   addCheckedField(mapCardElement.querySelector('.popup__avatar'), ad.author.avatar);

//   return mapCardElement;
// };

// var renderCardsList = function () {
//   var fragment = document.createDocumentFragment();
//   fragment.appendChild(getCard(ads[0]));
//   map.insertBefore(fragment, map.querySelector('.map__filters-container'));
// };
// renderCardsList();

var form = document.querySelector('.ad-form');
var mapFilters = map.querySelector('.map__filters');

var disabledForms = function () {
  for (var e = 0; e < form.children.length; e++) {
    form.children[e].setAttribute('disabled', '');
  }

  for (var q = 0; q < mapFilters.children.length; q++) {
    mapFilters.children[q].setAttribute('disabled', '');
  }
};

disabledForms();

var activatedForms = function () {
  for (var z = 0; z < form.children.length; z++) {
    form.children[z].removeAttribute('disabled', '');
  }

  for (var o = 0; o < mapFilters.children.length; o++) {
    mapFilters.children[o].removeAttribute('disabled', '');
  }
};

var mapPinMain = map.querySelector('.map__pin--main');
var mapPinMainLocation = {
  x: mapPinMain.offsetLeft,
  y: mapPinMain.offsetTop
};
var inputAdress = form.querySelector('#address');
inputAdress.value = Math.round(mapPinMainLocation.x + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(mapPinMainLocation.y + (MAP_PIN_MAIN_HEIGHT / 2));

var pageActiveHandler = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  inputAdress.value = Math.round(mapPinMainLocation.x + MAP_PIN_MAIN_WIDTH / 2) + ', ' + Math.round(mapPinMainLocation.y + (MAP_PIN_MAIN_HEIGHT + TAIL_MAP_PIN_MAIN_HEIGHT));
  activatedForms();
};

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    pageActiveHandler();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    pageActiveHandler();
  }
});

var titleInput = document.querySelector('#title');

var titleInputValidation = function () {
  var valueLength = titleInput.value.length;
  titleInput.setCustomValidity('');
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  }
};

titleInput.addEventListener('input', function () {
  titleInputValidation();
});

var typeInput = form.querySelector('#type');
var priceInput = form.querySelector('#price');

var priceInputValidation = function () {
  priceInput.setAttribute('placeholder', PRICE_MAP[typeInput.value]);
  priceInput.setAttribute('min', PRICE_MAP[typeInput.value]);
};

typeInput.addEventListener('input', function () {
  priceInputValidation();
});

var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');

var timeInOutValidation = function (changeElement, setElement) {
  for (var y = 0; y < changeElement.children.length; y++) {
    setElement.children[y].removeAttribute('selected', '');
    changeElement.children[y].removeAttribute('selected', '');
    if (changeElement.children[y].selected) {
      setElement.children[y].setAttribute('selected', '');
      changeElement.children[y].setAttribute('selected', '');
    }
  }
};

timeIn.addEventListener('change', function () {
  timeInOutValidation(timeIn, timeOut);
});

timeOut.addEventListener('change', function () {
  timeInOutValidation(timeOut, timeIn);
});

var rooomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

var capacitySetAttributeDisabled = function (a) {
  capacity.children[a].setAttribute('disabled', '');
};
var capacityRemoveAttributeDisabled = function (startIndex, finishIndex) {
  for (var u = startIndex; u <= finishIndex; u++) {
    capacity.children[u].removeAttribute('disabled', '');
  }
};
var capacityOptionsDisabled = function () {
  for (var a = 0; a < capacity.children.length; a++) {
    capacitySetAttributeDisabled(a);
    if (rooomNumber.value === '1') {
      capacityRemoveAttributeDisabled(2, 2);
    } else if (rooomNumber.value === '2') {
      capacityRemoveAttributeDisabled(1, 2);
    } else if (rooomNumber.value === '3') {
      capacityRemoveAttributeDisabled(0, 2);
    } else if (rooomNumber.value === '100') {
      capacityRemoveAttributeDisabled(3, 3);
    }
  }
};
var capacitySetCustomValidity = function () {
  capacity.setCustomValidity('');
  if (rooomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('Только для 1-го гостя');
  } else if (rooomNumber.value === '2' && (capacity.value > '2' || capacity.value === '0')) {
    capacity.setCustomValidity('Не более 2-х гостей');
  } else if (rooomNumber.value === '3' && (capacity.value > '3' || capacity.value === '0')) {
    capacity.setCustomValidity('Не более 3-х гостей');
  } else if (rooomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей');
  }
};

capacityOptionsDisabled();
capacitySetCustomValidity();

rooomNumber.addEventListener('change', function () {
  capacityOptionsDisabled();
  capacitySetCustomValidity();
});

capacity.addEventListener('change', function () {
  capacitySetCustomValidity();
});
