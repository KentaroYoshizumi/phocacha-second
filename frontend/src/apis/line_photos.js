import axios from 'axios';
import { linePhotos, linePhotosReplace } from '../urls/index'

export const postLinePhotos = (params) => {
  return axios.post(linePhotos,
    {
      photo_id: params.photoId,
      count: params.count,
    }
  )
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};

export const fetchLinePhotos = () => {
  return axios.get(linePhotos)
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};

export const replaceLinePhotos = (params) => {
  return axios.put(linePhotosReplace,
    {
      photo_id: params.photoId,
      count: params.count,
    }
  )
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};
