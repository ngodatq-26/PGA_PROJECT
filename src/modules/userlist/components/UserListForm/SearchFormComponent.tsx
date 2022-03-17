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
    <div className="search-form">
      <div className="div-1">
          <div><input className="form-control" placeholder='Search keywords'></input></div>
          <div>
             <CustomSelect renderValue={renderValue} >
                    <StyledOption value={10}>Ten</StyledOption>
                    <StyledOption value={20}>Twenty</StyledOption>
                    <StyledOption value={30}>Thirty</StyledOption>
              </CustomSelect>
          </div>
          <div>
             <CustomSelect renderValue={renderValue} >
                    <StyledOption value={10}>Ten</StyledOption>
                    <StyledOption value={20}>Twenty</StyledOption>
                    <StyledOption value={30}>Thirty</StyledOption>
              </CustomSelect>
          </div>
          <div>
             <CustomSelect renderValue={renderValue} >
                    <StyledOption value={10}>Ten</StyledOption>
                    <StyledOption value={20}>Twenty</StyledOption>
                    <StyledOption value={30}>Thirty</StyledOption>
              </CustomSelect>
          </div>
          <div><Button variant ="contained">Search</Button></div>
      </div>
      <div className="div-2">
          <div>  
             <div>
               <label style={{color:'white'}}>Country</label>
                <CustomSelect renderValue={renderValue}  onChange={
                  (e) =>{ fetchState(e)}
                }>
                        {country ? 
                          country.map((e,index : number) =>(
                             <StyledOption key={index} value={e.code}>{e.country}</StyledOption>
                          )) : null 
                        }
                  </CustomSelect>
              </div>
              <div>
                {state ? ( <CustomSelect renderValue={renderValue} >
                               { state.map((e : IState,index: number) =>(
                                  <StyledOption key={index} value={e.state}>{e.state}</StyledOption>
                                ))}
                            </CustomSelect>)
                  : (<input className="form-control"></input>)
                }
              </div>
              <div>
                <input className="form-control"></input>
              </div>
              <div>
                <input className="form-control"></input>
              </div>
          </div>
          <div>
                <div>
                    User activity
                </div>
                <div>
                    <div >
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          sx={{display : 'flex',flexDirection :'row'}}
                        >
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </div>
                    <div>
                        
                    </div>
                </div>
          </div>
      </div>
    </div>

  )
}

export default React.memo(SearchFormComponent)
