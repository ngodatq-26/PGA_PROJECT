import React, { useCallback, useEffect, useState } from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from "redux";
import {AppState} from "../../../redux/reducer";
import {setProductAction} from "../redux/productReducer";
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import EnhancedTableHead from '../../common/components/TableForm/EnhancedTableHead';
import { HeadCell } from '../../../models/common';
import PaginationComponent from '../../common/components/TableForm/PaginationComponent';
import TableForm from '../../common/components/TableForm/TableComponent';
import { IProduct } from '../../../models/product';
import {ApiProductList} from '../../../models/product'

const ProductListPage = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();

    const [data,setData] = useState<Array<IProduct>>([]);
    const [apiPost,setApiPost] = useState<ApiProductList>({
        page : 1,
        count:25,
        search:"",
        category:0,
        stock_status:"all",
        availability:"all",
        vendor:"",
        sort:"name",
        order_by:"ASC"
        ,search_type:""
    });
    const fetchDataProduct = useCallback(async () =>{
         const json = await dispatch(fetchThunk(API_PATHS.productList,'post',apiPost));
         dispatch(setProductAction(json.data))
         setData(json.data);
    },[data]);

    useEffect (() =>{
        fetchDataProduct()
    },[]);

    
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
            id : 'id',
            numeric : false,
            disablePadding : false,
            label :"Delete"
        }
    ];

    return (
        <div style ={{display : 'flex',backgroundColor :'#1b1b38'}}>
            <MenuHeaderComponent />
            <div style ={{marginTop :'80px'}}>
              <TableForm Data = {data} HeadCells ={headCells}/>
            </div>
        </div>
    )
}

export default ProductListPage;