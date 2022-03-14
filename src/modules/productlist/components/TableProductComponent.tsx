import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { HeadCell } from '../../../models/common';
import { ApiProductList, IProduct } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { setApiCountProduct, setApiGetProduct, setApiPageProduct, setApiSortProduct } from '../redux/productReducer';
import EnhancedTableHead from './EnhancedTableHead';
import PaginationComponent from './PaginationComponent';
import TableRowProductComponent from './TableRowProductComponent';

interface PropFormTable {
    Data? : IProduct[];
    HeadCells : HeadCell[];
    fetchData(e : ApiProductList) : void;
}

const TableForm = (propFormTable : PropFormTable) =>{

    const {Data,HeadCells,fetchData}= propFormTable;
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const Redux_ApiGetProduct = useSelector((state : AppState) => state.productlist.apigetproduct);

    const [sortName,setSortName] = useState('name');
    const [orderBy,setOrderBy] = useState('ASC');
    const [page,setPage] = useState(1);
    const [rowPerPage,setRowPerPage] = useState(Redux_ApiGetProduct.count); 

    React.useEffect(()=>{
        dispatch(setApiPageProduct(page));
    },[page])

    console.log(Redux_ApiGetProduct);

    return (
        <div>
        <Box sx={{ width: '100%',backgroundColor : '#323259' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer sx={{backgroundColor : '#323259'}}>
                <Table sx={{minwidth : 750}}>
                     <EnhancedTableHead HeadCells={HeadCells} sortName={sortName} setSortName ={setSortName} orderBy={orderBy} setOrderBy={setOrderBy} />
                     <TableBody>
                         {
                             Data?.map((e,index : number) =>{
                                 return (
                                     <TableRowProductComponent key={index} product={e} />
                                 )
                             })
                         }
                     </TableBody>
                 </Table>
            </TableContainer>
          </Paper>
        </Box>
        <PaginationComponent 
        currentPage={page} 
        setCurrentPage ={setPage} 
        lengthPage = {5} 
        rowPerPage ={rowPerPage} 
        setRowPerPage={setRowPerPage}
        />
        </div>
    )
}

export default React.memo(TableForm);