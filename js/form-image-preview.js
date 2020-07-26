'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('#avatar');
  var avatarPreview = form.querySelector('.ad-form-header__preview').querySelector('img');
  var photoChooser = form.querySelector('#images');
  var photoPreviewBox = form.querySelector('.ad-form__photo');

  var getImagePreview = function (imageChooser, imagePreview) {
    var photo = imageChooser.files[0];
    var photoName = photo.name.toLowerCase();

    var photoMatches = FILE_TYPES.some(function (it) {
      return photoName.endsWith(it);
    });

    if (photoMatches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (imagePreview.src) {
          imagePreview.src = reader.result;
        } else {
          imagePreview.innerHTML += '<img src="' + reader.result + '" alt="Фото жилья" width="70" height="70">';
        }
      });

      reader.readAsDataURL(photo);
    }
  };

  avatarChooser.addEventListener('change', function () {
    getImagePreview(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    getImagePreview(photoChooser, photoPreviewBox);
  });
})();
