import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IDelete } from '../../../../models/common';
import { IApiGetProduct, IProduct } from '../../../../models/product';
import { AppState } from '../../../../redux/reducer';
import { setApiCountProduct, setApiGetProduct, setApiPageProduct, setApiSortProduct } from '../../redux/productReducer';
import EnhancedTableHead from './EnhancedTableHead';
import PaginationComponent from './PaginationComponent';
import TableRowComponent from './TableRowComponent';

interface PropFormTable {
    data? : IProduct[];
}

const TableForm = (propFormTable : PropFormTable) =>{

    const Redux_DeleteList = useSelector((state : AppState) => state.productlist.deletelist);
    
    const [deleteList,setDeleteList] = React.useState<Array<IDelete>>([]);

    const {data}= propFormTable;

    return (
                     <TableBody>
                         {
                             data?.map((e,index : number) =>{
                                 return (
                                     <TableRowComponent key={index} product={e} deleteList={deleteList} setDeleteList ={setDeleteList} />
                                 )
                             })
                         }
                     </TableBody>
    )
}

export default React.memo(TableForm);