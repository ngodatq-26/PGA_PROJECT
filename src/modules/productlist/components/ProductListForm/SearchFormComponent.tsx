import { Search } from 'history';
import { IApiGetProduct, IApiSearchProduct } from '../../../../models/product';
import { setApiSearchProduct } from '../../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import initProductState from '../../redux/productReducer';
import React from 'react';
import { Box, Button } from '@mui/material';
import {checkboxSearch} from '../../utils/utils'
import '../../styles/styleSearch.css'
const SearchFormComponent = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();

    const Redux_ApiGetProduct = useSelector((state : AppState) => state.productlist.apigetproduct);

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
                        >
                        </input>
                </li>
                <li style={{display : 'flex',flex : '5',}}>
                    <select className='form-select' aria-label="Default select example">
                        
                    </select>
                </li>
                <li>
                    <select className='form-select' aria-label="Default select example">
                        
                    </select>
                </li>
                <li>
                    <Button variant="contained" sx={{color :'white',display:'flex',flex :'1'}}
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
