let cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'mperial-web-solutions',
  api_key: '938561814326735',
  api_secret: 'QPUJetWRNBfDEjfIcZUnXCft6vM'
});


cloudinary.uploader.upload("marlowProPic.png", function(result) {
  console.log(result);
});
