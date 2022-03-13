import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, Checkbox, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import '../styles/styleSearch.css';
import { categorySeacrh, checkboxSearch, stockStatusSearch ,avaibilitySearch} from '../utils';
import { Search } from 'history';

const SearchFormComponent = () =>{

    console.log(stockStatusSearch)
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
                    <Button variant="contained" sx={{color :'white',display:'flex',flex :'1'}}>Search</Button>
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