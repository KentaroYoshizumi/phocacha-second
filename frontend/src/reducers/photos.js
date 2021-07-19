import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  photosList: [],
};

export const photosActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const photosReducer = (state, action) => {
  switch (action.type) {
    case photosActionTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case photosActionTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        photosList: action.payload.photos,
      };
    default:
      throw new Error();
  }
}
