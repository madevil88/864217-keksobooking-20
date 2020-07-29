'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('#avatar');
  var avatarPreviewBox = form.querySelector('.ad-form-header__preview');
  var avatarPreview = avatarPreviewBox.querySelector('img');
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
          var newImg = document.createElement('img');
          newImg.src = reader.result;
          newImg.alt = 'Фото жилья';
          newImg.width = '70';
          newImg.height = '70';
          photoPreviewBox.appendChild(newImg);
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
