import DesktopDatePicker from '@mui/lab/DesktopDatePicker/DesktopDatePicker';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import { CustomSelect, renderValue, StyledOption } from '../../../common/components/SelectionMui'
import '../../styles/UserListStyle.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { ICountry, IState } from '../../../../models/common';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';


const SearchFormComponent = () => {

  const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
  const [date, setDate] = React.useState(moment(new Date()));
  const [state,setState] = React.useState<Array<IState>>([]);
  
  const country  = useSelector((state: AppState) => 
    state.common.country
  )
  const brand  = useSelector((state: AppState) => 
    state.common.brand
  )

  console.log(brand)
  const fetchState  = useCallback(async(code) =>{
    const json = await dispatch(fetchThunk(API_PATHS.state,'post',{code}));
    if(json.data === false) {
      setState([]);
   } else {
     setState(json.data);
   }
  },[])

  const handleDateChange = (dateObj: moment.Moment, dateStr: string): void => {
      setDate(dateObj);
  }

  return (
    <div></div>

  )
}

export default React.memo(SearchFormComponent)
