
import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL, // 取得状況
  postState: REQUEST_STATE.INITIAL,  // 登録状況
  linePhotosSummary: null,            // 仮注文データ
};

export const linePhotosActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
}

export const linePhotosReducer = (state, action) => {
  switch (action.type) {
    case linePhotosActionTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case linePhotosActionTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        linePhotosSummary: action.payload.linePhotosSummary,
      };
    case linePhotosActionTyps.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    case linePhotosActionTyps.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
}

