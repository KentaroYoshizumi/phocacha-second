import React, { Fragment, useReducer, useEffect } from 'react';

import styled from 'styled-components';
import { Link } from "react-router-dom";

// components
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import CircularProgress from '@material-ui/core/CircularProgress';



// apis
import { fetchLinePhotos } from '../apis/line_photos';
import { postOrder } from '../apis/orders';

// reducers
import {
  initialState,
  linePhotosActionTyps,
  linePhotosReducer,
} from '../reducers/linePhotos';


// images
import MainLogo from '../images/logo.jpg';

// constants
import { REQUEST_STATE } from '../constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;


export const Orders = () => {
  const [state, dispatch] = useReducer(linePhotosReducer, initialState);

  useEffect(() => {
    dispatch({ type: linePhotosActionTyps.FETCHING });
    fetchLinePhotos()
      .then((data) =>
        dispatch({
          type: linePhotosActionTyps.FETCH_SUCCESS,
          payload: {
            linePhotosSummary: data
          }
        })
      );
  }, []);

  const postLinePhotos = () => {
    dispatch({ type: linePhotosActionTyps.POSTING });
    postOrder({
      line_photo_ids: state.linePhotosSummary.line_photo_ids,
    }).then(() => {
      dispatch({ type: linePhotosActionTyps.POST_SUCCESS });
    });
    window.location.reload();
  };

  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };


  return (
    <Fragment>

      <HeaderWrapper>
        <Link to="/shops">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              // APIローディング中はくるくる回るローディングコンポーネントを表示
              state.fetchState === REQUEST_STATE.LOADING ?
                <CircularProgress />
                :
                state.linePhotosSummary &&
                <OrderDetailItem
                  shopFee={state.linePhotosSummary.shop.fee}
                  shopName={state.linePhotosSummary.shop.name}
                  shopId={state.linePhotosSummary.shop.id}
                  photoCount={state.linePhotosSummary.count}
                  price={state.linePhotosSummary.amount}
                />
            }
          </OrderItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.linePhotosSummary &&
              <OrderButton
                onClick={() => postLinePhotos()}
                disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
              >
                {orderButtonLabel()}
              </OrderButton>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.linePhotosSummary) &&
              <p>
                注文予定の商品はありません。
              </p>
            }
          </div>
        </div>
      </OrderListWrapper>

    </Fragment>
  )
}
