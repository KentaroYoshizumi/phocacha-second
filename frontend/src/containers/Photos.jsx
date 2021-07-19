import React, { Fragment, useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from "react-router-dom";

// components
import { LocalMallIcon } from '../components/Icons';
import { PhotoWrapper } from '../components/PhotoWrapper';
import { NewOrderConfirmDialog } from '../components/NewOrderConfirmDialog';
import Skeleton from '@material-ui/lab/Skeleton';

// reducers
import {
  initialState as photosInitialState,
  photosActionTyps,
  photosReducer,
} from '../reducers/photos';

// apis
import { fetchPhotos } from '../apis/photos';
import { postLinePhotos, replaceLinePhotos } from '../apis/line_photos';

// images
import MainLogo from '../images/logo.jpg';
import { PhotoOrderDialog } from '../components/PhotoOrderDialog';
import PhotoImage from '../images/stars.jpg';

// constants
import { HTTP_STATUS_CODE } from '../constants';
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const PhotosList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Photos = ({
  match
}) => {
  const initialState = {
    isOpenOrderDialog: false,
    selectedPhoto: null,
    selectedPhotoCount: 1,
    isOpenNewOrderDialog: false,
    existingShopName: '',
    newShopName: '',
  };
  const [state, setState] = useState(initialState);
  const [photosState, dispatch] = useReducer(photosReducer, photosInitialState);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: photosActionTyps.FETCHING });
    fetchPhotos(match.params.shopsId)
      .then((data) => {
        dispatch({
          type: photosActionTyps.FETCH_SUCCESS,
          payload: {
            photos: data.photos
          }
        });
      })
  }, []);

  const submitOrder = () => {
    postLinePhotos({
      photoId: state.selectedPhoto.id,
      count: state.selectedPhotoCount,
    }).then(() => history.push('/orders'))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            existingShopName: e.response.data.existing_shop,
            newShopName: e.response.data.new_shop,
          })
        } else {
          throw e;
        }
      })
  };

  const replaceOrder = () => {
    replaceLinePhotos({
      photoId: state.selectedPhoto.id,
      count: state.selectedPhotoCount,
    }).then(() => history.push('/orders'))
  }

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/shops">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <PhotosList>
        {
          photosState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
            :
            photosState.photosList.map(photo =>
              <ItemWrapper key={photo.id}>
                <PhotoWrapper
                  photo={photo}
                  onClickPhotoWrapper={
                    (food) => setState({
                      ...state,
                      selectedPhoto: food,
                      isOpenOrderDialog: true,
                    })
                  }
                  imageUrl={PhotoImage}
                />
              </ItemWrapper>
            )
        }
      </PhotosList>
      {
        state.isOpenOrderDialog &&
        <PhotoOrderDialog
          isOpen={state.isOpenOrderDialog}
          photo={state.selectedPhoto}
          countNumber={state.selectedPhotoCount}
          onClickCountUp={() => setState({
            ...state,
            selectedPhotoCount: state.selectedPhotoCount + 1,
          })}
          onClickCountDown={() => setState({
            ...state,
            selectedPhotoCount: state.selectedPhotoCount - 1,
          })}
          onClickOrder={() => submitOrder()}
          onClose={() => setState({
            ...state,
            isOpenOrderDialog: false,
            selectedPhoto: null,
            selectedPhotoCount: 1,
          })}
        />
      }
      {
        state.isOpenNewOrderDialog &&
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingShopName={state.existingShopName}
          newShopName={state.newShopName}
          onClickSubmit={() => replaceOrder()}
        />
      }
    </Fragment>
  )
}
