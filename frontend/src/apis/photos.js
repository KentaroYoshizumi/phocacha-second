import axios from 'axios';
import { photosIndex } from '../urls/index'

export const fetchPhotos = (shopId) => {
  return axios.get(photosIndex(shopId))
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
