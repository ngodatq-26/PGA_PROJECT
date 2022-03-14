import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, Checkbox, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import '../styles/styleSearch.css';
import { categorySeacrh, checkboxSearch, stockStatusSearch ,avaibilitySearch} from '../utils';
import { Search } from 'history';
import { ApiProductList, IApiSearchProduct } from '../../../models/product';
import { setApiSearchProduct } from '../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import initProductState from '../redux/productReducer';
interface Props {
    fetchData(e : ApiProductList) : void;
}
const SearchFormComponent = (props : Props) =>{
    const {fetchData} = props;
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();

    const Redux_ApiGetProduct = useSelector((state : AppState) => state.productlist.apigetproduct);
    const [searchForm,setSearchForm] = React.useState<ApiProductList>({
        page : 1,
        count: Redux_ApiGetProduct.count,
        search:"",
        category:'0',
        stock_status:"all",
        availability:"all",
        vendor:"",
        sort:Redux_ApiGetProduct.sort,
        order_by:Redux_ApiGetProduct.order_by,
        search_type:""
    });  

    const onSearch = () =>{
        fetchData(searchForm);
    };
    
    console.log(searchForm);

    return (
        <Box className='box-search'>
            <ul className="ul-search-1" style = {{display : 'flex',flexDirection :'row',listStyleType :'none'}} >
                <li style={{display : 'flex',flex : '8',}}>
                    
                        <input className='form-control' 
                               placeholder='Seacrh Keywords'
                               style= {{
                                fontSize: '.9375rem',
                                lineHeight: '1.5rem',
                                padding: '.4375rem 1rem',
                               }}
                               type='text'
                               onChange={(e) =>{
                                   setSearchForm({...searchForm,search : e.target.value})
                               }}
                        >
                        </input>
                </li>
                <li style={{display : 'flex',flex : '5',}}>
                    <select className='form-select' aria-label="Default select example">
                        {
                            categorySeacrh.map((e,index: number) =>(
                                <option key={index} value={e.value}>{e.label}
                                </option>
                            ))
                        }
                    </select>
                </li>
                <li>
                    <select className='form-select' aria-label="Default select example">
                        {
                            stockStatusSearch.map((e,index: number) =>(
                                <option key={index} value={e.value}>{e.label}
                                </option>
                            ))
                        }
                    </select>
                </li>
                <li>
                    <Button variant="contained" sx={{color :'white',display:'flex',flex :'1'}}
                            onClick = {onSearch}
                    >Search</Button>
                </li>
            </ul>
            <ul className="ul-search-2" style = {{display : 'flex',flexDirection :'row',listStyleType :'none',color: 'white'}} >
                <li style = {{display : 'flex',flexDirection :'row',listStyleType :'none'}}>    
                        <div style={{paddingRight:'10px'}}>Seacrh in: </div>
                        <div>
                        {
                            checkboxSearch.map((e ,index: number) =>(
                                <div key={index}>
                                    <input type='checkbox' value={e.value}></input>
                                    <label style={{color: 'white',paddingLeft: '5px',fontSize :'13px'}}>{e.label}</label>    
                                </div>
                            ))
                        }
                        </div>
                </li>
                <li style = {{display : 'flex',flexDirection :'row'}}>
                       <div style={{paddingRight:'10px'}}>Avaibility: </div>
                       <div>
                            <select className='form-select' aria-label="Default select example">
                                {
                                    avaibilitySearch.map((e,index: number) =>(
                                        <option key={index} value={e.value}>{e.label}
                                        </option>
                                    ))
                                }
                            </select>
                       </div>
                </li>
                <li style = {{display : 'flex',flexDirection :'row'}}>
                      <div style={{paddingRight:'10px'}}>Vendor: </div>
                      <div>
                        <input className='form-control' 
                                style= {{
                                    fontSize: '.9375rem',
                                    lineHeight: '1.5rem',
                                    padding: '.4375rem 1rem',
                                }}
                            >
                        </input>
                      </div>
                </li>
            </ul>
        </Box>
    )
}

export default React.memo(SearchFormComponent);


