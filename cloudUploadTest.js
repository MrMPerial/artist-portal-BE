let cloudinary = require('cloudinary');

// Profile Pic
cloudinary.v2.uploader.upload('{{ file path }}',
{public_id: "{{ username }}",
transformation: [
  {
    width: 125,
    height: 125,
    crop: "scale"
  }
]
},
(error, result) => {
  if(error) {
    console.log(error);
    res.status(500).send('Something went wrong while uploading image. Please Try again.')
  }
  console.log(result);
  res.status(200).send('Image uploaded Successfully.')
});

// Song Cover
cloudinary.v2.uploader.upload('{{ file path }}',
{public_id: "{{ username + song title }}",
transformation: [
  {
    width: 300,
    height: 300,
    crop: "scale"
  }
]
},
(error, result) => {
  if(error) {
    console.log(error);
    res.status(500).send('Something went wrong while uploading image. Please Try again.')
  }
  console.log(result);
  res.status(200).send('Image uploaded Successfully.')
});

// Banner
cloudinary.v2.uploader.upload('{{ file path }}',
{public_id: "{{ username + path name }}",
transformation: [
  {
    width: 1200,
    height: 300,
    crop: "scale"
  }
]
},
(error, result) => {
  if(error) {
    console.log(error);
    res.status(500).send('Something went wrong while uploading image. Please Try again.')
  }
  console.log(result);
  res.status(200).send('Image uploaded Successfully.')
});

// Song
cloudinary.v2.uploader.upload("Lift_Off_Single.mp3",
{resource_type: "video",
public_id: "{{ username + song title }}"
},
(error, result) => {
  if(error) {
    console.log(error);
  }
  console.log(result);
});
