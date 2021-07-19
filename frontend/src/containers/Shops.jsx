import React, { Fragment, useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from "react-router-dom";


// components
import Skeleton from '@material-ui/lab/Skeleton';


// apis
import { fetchShops } from '../apis/shops';

// reducers
import {
  initialState,
  shopsActionTyps,
  shopsReducer,
} from '../reducers/shops';


// constants
import { REQUEST_STATE } from '../constants';


// images
import MainLogo from '../images/logo.jpg';
import MainCoverImage from '../images/top.jpg';

import ShopsImage from '../images/snowmountain.jpg';


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;


const ShopsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const ShopsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const ShopsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Shops = () => {
  const [state, dispatch] = useReducer(shopsReducer, initialState);

  useEffect(() => {
    dispatch({ type: shopsActionTyps.FETCHING });
    fetchShops()
      .then((data) =>
        dispatch({
          type: shopsActionTyps.FETCH_SUCCESS,
          payload: {
            shops: data.shops
          }
        })
      )
  }, [])

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>

      <ShopsContentsList>
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </Fragment>
            :
            state.shopsList.map((item, index) =>
              <Link to={`/shops/${item.id}/photos`} key={index} style={{ textDecoration: 'none' }}>
                <ShopsContentWrapper>
                  <ShopsImageNode src={ShopsImage} />
                  <MainText>{item.name}</MainText>
                  <SubText>{`配送料：${item.fee}円
                  `}
                  </SubText>
                </ShopsContentWrapper>
              </Link>
            )
        }
      </ShopsContentsList>

    </Fragment>
  )
}
