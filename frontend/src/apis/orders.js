import axios from 'axios';
import { orders } from '../urls/index'

export const postOrder = (params) => {
  return axios.post(orders,
    {
      line_photo_ids: params.line_photo_ids
    },
  )
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
