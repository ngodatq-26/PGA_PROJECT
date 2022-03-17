import React, { useCallback, useEffect, useMemo } from 'react';
import './App.css';
import { Routes } from './Routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchThunk } from './modules/common/redux/thunk';
import { API_PATHS } from './configs/api';
import { RESPONSE_STATUS_SUCCESS } from './utils/httpResponseCode';
import { setUserInfo } from './modules/auth/redux/authReducer';
import { IBrand, ICategory, ICondition, ICountry, IRole, IShipping, IVendor } from './models/common';
import { setGetBrandAction, setGetCategoryAction, setGetConditionAction, setGetCountryAction, setGetRoleAction, setGetShippingAction, setGetVendorAction } from './modules/common/redux/commonReducer';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

    if (accessToken && !user) {
      const json = await dispatch(fetchThunk(API_PATHS.userProfile));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo({ ...json.data, token: accessToken }));
      }
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  const [country,setCountry] = React.useState<Array<ICountry>>([]);
  const [category,setCategory] = React.useState<Array<ICategory>>([]);
  const [brand,setBrand] = React.useState<Array<IBrand>>([]);
  const [vendor,setVendor] = React.useState<Array<IVendor>>([]);
  const [condition,setCondition] = React.useState<Array<ICondition>>([]);
  const [role,setRole] = React.useState<Array<IRole>>([]);
  const [shipping,setShipping] = React.useState<Array<IShipping>>([]);

  const fetchCountry =  useCallback(async () =>{
    const json = await dispatch(fetchThunk(API_PATHS.country,'post'));
    if(json.data === false) {
       setCountry([]);
    } else {
      setCountry(json.data);
      dispatch(setGetCountryAction(json.data));
    }
  },[]);

  const fetchCategory = useCallback(async () =>{
    const json = await dispatch(fetchThunk(API_PATHS.categoryList,'post'));
    if(json.data === false) {
       setCategory([]);
    } else {
      setCategory(json.data);
      dispatch(setGetCategoryAction(json.data));
    }
  },[]);

  const fetchBrand = useCallback(async () =>{
    const json = await dispatch(fetchThunk(API_PATHS.brandList,'post'));
    if(json.data === false) {
       setBrand([]);
    } else {
      setBrand(json.data);
      dispatch(setGetBrandAction(json.data));
    }
  },[]);

  const fetchRole = useCallback(async() =>{
    const json = await dispatch(fetchThunk(API_PATHS.vendorList,'post'));
    if(json.data === false) {
       setRole([]);
    } else {
      setRole(json.data);
      dispatch(setGetRoleAction(json.data));
    }
  },[])
  
  const fetchCondition = useCallback(async() =>{
    const json = await dispatch(fetchThunk(API_PATHS.conditionList,'post'));
    if(json.data === false) {
       setCondition([]);
    } else {
      setCondition(json.data);
      dispatch(setGetConditionAction(json.data));
    }
  },[])

  const fetchVendor = useCallback(async() =>{
    const json = await dispatch(fetchThunk(API_PATHS.roleList,'post'));
    if(json.data === false) {
       setVendor([]);
    } else {
      setVendor(json.data);
      dispatch(setGetVendorAction(json.data));
    }
  },[])

  const fetchShipping = useCallback(async() =>{
    const json = await dispatch(fetchThunk(API_PATHS.shippingList,'post'));
    if(json.data === false) {
       setShipping([]);
    } else {
      setShipping(json.data);
      dispatch(setGetShippingAction(json.data));
    }
  },[])

  const isLogin = useMemo(() => Cookies.get(ACCESS_TOKEN_KEY), []);

  useEffect(() =>{
    if(isLogin) {
      fetchCountry();
      fetchCategory();
      fetchBrand();
      fetchVendor();
      fetchCondition();
      fetchRole();
      fetchShipping();
    }
  },[]);
  
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
