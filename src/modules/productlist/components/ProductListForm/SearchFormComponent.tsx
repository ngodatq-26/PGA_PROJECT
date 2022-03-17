import { Search } from 'history';
import { IApiGetProduct, IApiSearchProduct } from '../../../../models/product';
import { setApiSearchProduct } from '../../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import initProductState from '../../redux/productReducer';
import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import {Avaibility, checkboxSearch,Stock_Status} from '../../utils/utils'
import 'antd/dist/antd.css';
import '../../styles/styleSearch.css'

import { Select,Input,Checkbox } from 'antd';
import { IVendor } from '../../../../models/common';
import { API_PATHS } from '../../../../configs/api';
import { fetchThunk } from '../../../common/redux/thunk';

interface Props {
    api : IApiGetProduct;
    setApi(a : IApiGetProduct) : void
}

const SearchFormComponent = (props : Props) =>{
    const { Option } = Select;
    const {api,setApi} = props;
    
    

    const [search,setSearch] = React.useState(api.search);
    const [category,setCategory] = React.useState(api.category);
    const [stock,setStock] = React.useState(api.stock_status);
    const [searchType,setSearchType] = React.useState(api.search_type);
    const [availability,setAvailability] = React.useState(api.availability);
    const [vendor,setVendor] = React.useState(api.vendor);
    const [vendorFillter,setVendorFillter] = React.useState<Array<IVendor>>([]);
    
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();

    const Redux_ApiGetProduct = useSelector((state : AppState) => state.productlist.apigetproduct);
    const Redux_Category = useSelector((state : AppState) => state.common.category);
    
    const handleChangeCategory = (value : any) =>{
        setCategory(value);
    }

    const handleChangeStock = (value : any) =>{
        setStock(value);
    }

    const handleChangeSearchType = (checkedValues :any) =>{
        setSearchType(checkedValues.toString())
    }

    const handleClickSearch = () =>{
        setApi({...api,search : search,category : category,stock_status : stock,search_type : searchType,availability : availability,vendor : vendor})
    }

    const handleChangeAvailability = (value : any) =>{
        setAvailability(value);
    }

    const fillterVendor = React.useCallback(async (e : string) =>{
        const json = await dispatch(fetchThunk(API_PATHS.vendorList,'post',{search : e}));
        if(json.data === false) {
           setVendorFillter([]);
       } else {
           setVendorFillter(json.data);
       }
    },[vendor]);

    const handleChangeVendor = (value : any) =>{
        setVendor(value);
    }
    
    const onSearch = (value : string) =>{
        if(value !== "") {
        fillterVendor(value);
        }
    }

    
    return (
        <Box className='box-search'>
           < ul className="" style = {{display : 'flex',flexDirection :'row',listStyleType :'none'}} >
                <li style={{display : 'flex',flex : '8',}}>   
                        <Input className='' 
                               placeholder='Seacrh Keywords'
                               type='text'
                               value={search}
                               onChange={(e) =>{setSearch(e.target.value)}}
                        >
                        </Input>
                </li>
                <li style={{display : 'flex',flex : '5',}}>
                    <Select className='' aria-label="Default select example" style={{width : '100%'}} defaultValue='Any Category' onChange={handleChangeCategory}>
                        <Option value={0}>Any Category</Option>
                        {Redux_Category ? Redux_Category.map((e,index : number) =>(
                            <Option key={e.id}  value={e.id}>{e.name}</Option>
                        )) : null}
                    </Select>
                </li>
                <li style={{display : 'flex',flex : '4',}}>
                    <Select className='' aria-label="Default select example" style={{width : '100%'}} defaultValue='Any Stock Status' onChange={handleChangeStock}>
                        {Stock_Status ? Stock_Status.map((e,index : number) =>(
                            <Option key={index}  value={e.value}>{e.label}</Option>
                        )) : null}
                    </Select>
                </li>
                <li>
                    <Button variant="contained" sx={{color :'white',display:'flex',flex :'1'}}
                       onClick={handleClickSearch}
                    >Search</Button>
                </li>
            </ul>
            <ul className="ul-search-2" style = {{display : 'flex',flexDirection :'row',listStyleType :'none',color: 'white'}} >
                <li style = {{display : 'flex',flexDirection :'row',listStyleType :'none',flex : '1'}}>    
                        <div style={{paddingRight:'10px'}}>Seacrh in: </div>
                        <div>
                        <Checkbox.Group onChange={handleChangeSearchType}>
                        {
                            checkboxSearch.map((e ,index: number) =>(
                                <div key={index}>
                                    <Checkbox value={e.value} style={{color : 'white'}} >{e.label}</Checkbox>
                                </div>
                            ))
                        }</Checkbox.Group>
                        </div>
                </li>
                <li style = {{display : 'flex',flexDirection :'row',flex : '1'}}>
                        <div style={{paddingRight:'10px'}}>Avaibility: </div>
                        <Select className='' aria-label="Default select example" style={{width : '100%'}} defaultValue='Any Availability Status' onChange={handleChangeAvailability}>
                            {Avaibility ? Avaibility.map((e,index : number) =>(
                                <Option key={index}  value={e.value}>{e.label}</Option>
                            )) : null}
                        </Select>
                </li>
                <li style = {{display : 'flex',flexDirection :'row',flex : '2'}}>
                      <div style={{paddingRight:'10px'}}>Vendor: </div>
                      <div>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange = {handleChangeVendor }
                                onSearch = {onSearch}
                            >
                            {
                                vendorFillter ? vendorFillter.map((e,index : number) =>(
                                    <Option key={index}  value={e.id}>{e.companyName}</Option>
                                )) :  null
                            }
                            </Select>
                      </div>
                </li>
            </ul>
        </Box>
    )
}

export default React.memo(SearchFormComponent);
