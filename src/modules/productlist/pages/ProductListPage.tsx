import React, { useCallback, useEffect, useState } from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from "redux";
import {AppState} from "../../../redux/reducer";
import {setApiGetProduct, setProductAction,setApiPageProduct, setApiSearchProduct} from "../redux/productReducer";
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import TableProductComponent from '../components/ProductListForm/TableProductComponent';
import { IProduct,IApiSearchProduct } from '../../../models/product';
import {IApiGetProduct} from '../../../models/product'
import { useSelector } from 'react-redux';
import {initProductState} from '../redux/productReducer';
import { Box, Button, Paper, Table, TableContainer } from '@mui/material';
import EnhancedTableHead from '../components/ProductListForm/EnhancedTableHead';
import TableUserComponent from '../../userlist/components/UserListForm/TableUserComponent';
import PaginationComponent from '../components/ProductListForm/PaginationComponent';
import SearchFormComponent from '../components/ProductListForm/SearchFormComponent';
import { Link } from 'react-router-dom';
import '../styles/styleProductPage.css'
import DeleteForm from '../components/ProductListForm/DeleteForm';

const ProductListPage = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();

    const [api,setApi] = React.useState<IApiGetProduct>(initProductState.apigetproduct);
    const [data,setData] = React.useState<Array<IProduct>>([]);
    const [checkReload,setCheckReload] = React.useState(false);

    const fetchUser = useCallback(async () =>{
        const json = await dispatch(fetchThunk(API_PATHS.productList,'post',api));
        setCheckReload(false);
        if(json.data === false) {
           setData([]);
       } else {
          setData(json.data);
          dispatch(setApiGetProduct(api))
       }
   },[api]);

   useEffect(() => {
       fetchUser();
   },[api])

    return (
        <div style ={{display : 'flex',backgroundColor :'#1b1b38',width:'100%'}}>
            
        <MenuHeaderComponent />
        
        <div style ={{marginTop :'80px'}}>
           <SearchFormComponent api ={api} setApi ={setApi}/>
           <div style={{ margin:'30px'}}>
                    <div style={{marginBottom : '30px'}}>
                        <Button variant='contained' ><Link style={{color:'white'}} to ="/pages/products/new-product">Add Products</Link></Button>
                    </div>
                    <Box sx={{ width: '100%',backgroundColor : '#323259' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <TableContainer sx={{backgroundColor : '#323259'}}>
                                <Table sx={{minwidth : 750}}>
                                <EnhancedTableHead api ={api} setApi ={setApi}/>
                                <TableProductComponent data={data} />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                    <div style={{ marginBottom :'10'}}>
                       <PaginationComponent api ={api} setApi ={setApi} />
                    </div>
                    <DeleteForm api={api} setApi ={setApi} setCheckReload ={setCheckReload} />
           </div>
        </div>
    </div>
    )
}

export default React.memo(ProductListPage);