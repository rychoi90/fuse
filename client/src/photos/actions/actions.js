import axios from 'axios';

export const SELECT_PHOTO = 'SELECT_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';

// fetches photo library of selected user
export function fetchPhotos(friend) {
  // need to update this get request or pass in user id to fetch photos.

  // expect request to be an array of object photos
  console.log('friend');
  console.log(friend);
  const request = axios.get(`http://localhost:8000/photo/${friend.id}`)
  .then((response) => {
    return response.data.map((photo) => {
      const newPhoto = photo;
      newPhoto.link = `http://${photo.link}`;
      return newPhoto;
    });
  });


  return {
    type: FETCH_PHOTOS,
    payload: request,
  };
}

// click handler to update selected photo by user
export function selectPhoto(photo) {
  console.log('expect this to be selected photo object', photo);
  return {
    type: SELECT_PHOTO,
    payload: photo,
  };
}
