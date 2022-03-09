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
    const headCells: HeadCell[] = [
        {
          id: 'name',
          numeric: false,
          disablePadding: true,
          label: '',
        },
        {
            id: 'sku',
            numeric: true,
            disablePadding: false,
            label: 'SKU',
        },
        {
            id: 'name',
            numeric: true,
            disablePadding: false,
            label: 'Name',
        },
        {
            id: 'category',
            numeric: false,
            disablePadding: false,
            label: 'Category',
        },
        {
            id : 'price',
            numeric : true,
            disablePadding : false,
            label: 'Price',
        },
        {
            id:'amount',
            numeric : true,
            disablePadding : false,
            label :'In Stock'
        },
        {
            id :'vendor',
            numeric :false,
            disablePadding : false,
            label:'Vendor'
        },
        {
            id:'arrivalDate',
            numeric : true,
            disablePadding : false,
            label:'Arrival Date'
        },
        {
            id : 'id',
            numeric : false,
            disablePadding : false,
            label :"Delete"
        },
    ];

    return (
        <div style ={{display : 'flex',backgroundColor :'#1b1b38'}}>
            
            <MenuHeaderComponent />
            <div style ={{marginTop :'80px'}}>

              <TableProductComponent Data = {data} HeadCells ={headCells} />
            </div>
        </div>
    )
}

export default React.memo(ProductListPage);