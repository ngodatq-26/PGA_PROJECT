import { Box, Button, FormControlLabel, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import { CustomSelect, renderValue, StyledOption } from '../../../common/components/SelectionMui';
import { Checkbox, DatePicker, Input, Space } from 'antd';
import { ICountry, IState } from '../../../../models/common';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { TypeStatus } from '../../utils/utils';
import { Radio } from 'antd';
import { IApiGetUsers } from '../../../../models/user';
import '../../styles/UserListStyle.css';

const { Option,OptGroup } = Select;

interface Props {
  api : IApiGetUsers;
  setApi (e : IApiGetUsers) : void;
}

const SearchFormComponent = (props : Props) => {

  const {api,setApi} = props;
  const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
  const [state,setState] = React.useState<Array<IState>>([]);
  const [search,setSearch] = React.useState(api.search);
  const [membership,setMembership] = React.useState<Array<string>>(api.memberships);
  const [types,setTypes] = React.useState<Array<string>>(api.types);
  const [status,setStatus] = React.useState<string[]>(api.status);
  const [countrySearch,setCountrySearch] = React.useState(api.country);
  const [stateSearch,setStateSearch] = React.useState(api.state);
  const [address,setAddress] = React.useState(api.address);
  const [phone,setPhone] = React.useState(api.phone);
  const [dateType,setDateType] = React.useState(api.date_type);
  const [dateRange,setDateRange] = React.useState(api.date_range);

  const country  = useSelector((state: AppState) => 
    state.common.country
  )
  const brand  = useSelector((state: AppState) => 
    state.common.brand
  )
  const role = useSelector((state: AppState) => 
    state.common.role
  )

  const handleChangeMembership = (value :  any) =>{
    setMembership(value);
  }

  const handleChangeTypes = (value : any) =>{
    setTypes(value);
  }

  const handleChangeStatus = (value : any) =>{
    setStatus([value]);
  }

  const handleChangeCountry = (value : any) =>{
    fetchState(value)
    setCountrySearch(value);
  }
  
  const handleChangeState = (value : any) =>{
    setStateSearch(value);
  }

  const handleChangeDateType = (e : any) =>{
    setDateType(e.target.value);
  }
  
  const handleChangeDate = (date : any, dateString : any) =>{
    setDateRange( [dateString,new Date().toISOString().slice(0, 10)]);
  }

  const handleClickSearch = () =>{
    setApi({...api,date_range : dateRange,date_type : dateType ,search : search,memberships : membership,types : types,status : status,country : countrySearch,state : stateSearch,address : address,phone : phone});
  }


  const fetchState  = useCallback(async(code) =>{
    const json = await dispatch(fetchThunk(API_PATHS.state,'post',{code}));
    if(json.data === false) {
      setState([]);
   } else {
     setState(json.data);
   }
  },[])

  return (
    <Box className ="box-search">
         < ul className="" style = {{display : 'flex',flexDirection :'row',listStyleType :'none'}} >
                <li style={{display : 'flex',flex : '5',}}>   
                        <Input className='' 
                               placeholder='Seacrh Keywords'
                               type='text'
                               value={search}
                               onChange={(e) =>{setSearch(e.target.value)}}
                        >
                        </Input>
                </li>
                <li style={{display : 'flex',flex : '5',}}>
                        <Select
                          placeholder = "All memberships"
                          mode="tags"
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                          onChange = {handleChangeMembership}
                        >
                            <OptGroup label="Memberships"> 
                              <Option value="M_4" label="Genaral">Genaral</Option>
                            </OptGroup>
                            <OptGroup label="Pending Memberships">
                              <Option value="P_4" label="Genaral">Genaral</Option>
                            </OptGroup>

                        </Select>
                </li>
                <li style={{display : 'flex',flex : '5',}}>
                        <Select
                          placeholder = "All user types"
                          mode="tags"
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                          onChange = {handleChangeTypes}
                        >
                            <OptGroup label="Memberships"> 
                               { role ? 
                                 role?.administrator.map((e) =>(
                                     <Option value={e.id} key ={e.id} label={e.name}>{e.name}</Option>
                                 )) : null
                               }
                            </OptGroup>
                            <OptGroup label="Pending Memberships">
                               { role ? 
                                 role?.customer.map((e) =>(
                                     <Option value={e.id} key ={e.id} label={e.name}>{e.name}</Option>
                                 )) : null
                               }
                            </OptGroup>
                        </Select>
                </li>
                <li style={{display : 'flex',flex : '3',}}>
                        <Select
                          defaultValue = "Any status"
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                          onChange = {handleChangeStatus}
                        >{
                            TypeStatus.map((e,index : number) =>(
                              <Option value={e.value} key ={index} label={e.label}>{e.label}</Option>
                            ))
                        }</Select>
                </li>
                <li style={{display : 'flex',flex : '1',}}>
                        <Button variant="contained" sx={{color :'white',display:'flex',flex :'1'}}
                          onClick ={handleClickSearch}
                        >Search</Button>
                </li>
            </ul>
            <ul className="ul-search-2" style = {{display : 'flex',flexDirection :'row',listStyleType :'none',color: 'white'}} >
                <li className="form-country" style = {{display : 'flex',flexDirection :'column',listStyleType :'none',flex : '2'}}>    
                        <div>
                          <div>Country</div>
                        <Select
                          defaultValue = "Select country"
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                          onChange = {handleChangeCountry}
                        >{country ? 
                            country.map((e,index : number) =>(
                              <Option value={e.code} key ={index} label={e.country}>{e.country}</Option>
                            )) : null
                        }</Select>
                        </div>
                        <div>
                          <div>State</div>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange = {handleChangeState}
                            >
                                {state ? 
                                    state.map((e,index : number) =>(
                                      <Option value={e.state} key ={index} label={e.state}>{e.state}</Option>
                                    )) : null
                                }
                            </Select>
                        </div>
                        <div>
                          <div>Adress</div>
                            <Input className='' 
                                  type='text'
                                  value ={address}
                                  onChange={(e) =>{setAddress(e.target.value)}}
                            >
                            </Input>
                        </div>
                        <div>
                            <div>Phone</div>
                            <Input className='' 
                                  type='text'
                                  value={phone}
                                  onChange={(e) =>{setPhone(e.target.value)}}
                            >
                            </Input>
                        </div>
                </li>
                <li style = {{display : 'flex',flexDirection :'row',flex : '7'}}>
                        <div>User activity</div>
                        <div>
                          <div>
                                <Radio.Group defaultValue = "R" onChange ={handleChangeDateType}>
                                  <Radio value="R">Register</Radio>
                                  <Radio value="L">Last logged in</Radio>
                                </Radio.Group>
                          </div>
                          <div style={{marginTop : '20px',width : '100%'}}>
                                <Space direction="vertical" >
                                     <DatePicker style={{width: '300px'}} onChange={handleChangeDate}/> 
                                </Space>
                          </div>
                        </div>
                </li>
            </ul>
    </Box>
  )
}

export default React.memo(SearchFormComponent)
