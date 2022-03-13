import React, { useCallback, useEffect, useState } from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from "redux";
import {AppState} from "../../../redux/reducer";
import {setApiGetProduct, setProductAction,setApiPageProduct} from "../redux/productReducer";
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import EnhancedTableHead from '../../common/components/TableForm/EnhancedTableHead';
import { HeadCell } from '../../../models/common';
import PaginationComponent from '../../common/components/TableForm/PaginationComponent';
import TableProductComponent from '../components/TableProductComponent';
import { IProduct } from '../../../models/product';
import {ApiProductList} from '../../../models/product'
import { useSelector } from 'react-redux';
import TableRowProductComponent from '../components/TableRowProductComponent';
import { headCells } from '../utils';
import initProductState from '../redux/productReducer';
import SearchFormComponent from '../components/SeacrhFormComponent';
import { Button } from '@mui/material';

const ProductListPage = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const Redux_ApiGetProduct = useSelector((state : AppState) => state.productlist.apigetproduct);

    const [data,setData] = useState<Array<IProduct>>([]);

    const fetchData = useCallback(async () =>{
         const json = await dispatch(fetchThunk(API_PATHS.productList,'post',Redux_ApiGetProduct));
         dispatch(setProductAction(json.data))
         setData(json.data);
    },[Redux_ApiGetProduct]);

    useEffect (() =>{
        fetchData();
    },[Redux_ApiGetProduct]);

    console.log(Redux_ApiGetProduct);
    

    return (
        <div style ={{display : 'flex',backgroundColor :'#1b1b38'}}>
            
            <MenuHeaderComponent />
            <div style ={{marginTop :'80px'}}>
              <div style={{color : 'white'}}>
                  Products
              </div>
              <SearchFormComponent />
              <div style={{marginBottom : '30px'}}>
                <Button variant='contained'>Add Product</Button>
              </div>
              <TableProductComponent Data = {data} HeadCells ={headCells} />
            </div>
        </div>
    )
}

export default React.memo(ProductListPage);