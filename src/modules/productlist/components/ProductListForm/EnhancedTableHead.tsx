import React from 'react';
import { TableHead,TableRow,TableCell,TableSortLabel } from '@mui/material';
import {HeadCell} from '../../../../models/common';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { headCells } from '../../utils/utils';
import { IApiGetProduct, IProduct } from '../../../../models/product';
import { Checkbox } from 'antd';
import { setDeleteProductAction, setNextDeleteProduct, setProductAction } from '../../redux/productReducer';

interface Props {
    api : IApiGetProduct;
    setApi(a : IApiGetProduct) : void
    data? : IProduct[];
}

const EnhancedTableHead  = (props : Props) =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const Redux_ApiGetProduct = useSelector((state : AppState) => state.productlist.apigetproduct);
    const Redux_ProductList = useSelector((state : AppState) => state.productlist.deletelist);

    const {api,setApi,data} = props 
    
    const onSort = (name : string)=>{
        if(api.order_by === 'ASC') {
         setApi({...api,sort : name,order_by : 'DESC'})
        } else {
         setApi({...api,sort : name,order_by : 'ASC'})
        }
    }

    const handleCheckAll = (e : any) =>{
        if(e.target.checked) {
        data?.map((e,index : number) =>{
            dispatch(setNextDeleteProduct(e.id,1));
        })}
        else {
            dispatch(setDeleteProductAction([]));
        }
    }

    return (
            <TableHead>
                <TableRow>
                    <TableCell>
                    </TableCell>
                    {
                        headCells.map((HeadCell,index : number) =>(
                            <TableCell key ={index} ><a 
                              onClick ={(e) =>{
                                onSort(HeadCell.id)
                              }}
                                style={{padding: '16px 18px',
                                fontSize: '15px',
                                color: '#fff',
                                whiteSpace: 'nowrap',
                                cursor : 'pointer',
                            }}>{HeadCell.label}
                            {(api.sort === HeadCell.id)&& (api.order_by ==='ASC') ? (<ArrowUpwardIcon />) : null}
                            {(api.sort === HeadCell.id)&& (api.order_by ==='DESC') ? (<ArrowDownwardIcon />) : null}
                            </a></TableCell>
                        ))
                    }
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>

    )
}


export default React.memo(EnhancedTableHead);