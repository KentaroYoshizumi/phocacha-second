import axios from 'axios';
import { shopsIndex } from '../urls/index'

export const fetchShops = () => {
  return axios.get(shopsIndex)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
