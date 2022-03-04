import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { HeadCell } from '../../../../models/common';
import { IProduct } from '../../../../models/product';
import EnhancedTableHead from './EnhancedTableHead';
import PaginationComponent from './PaginationComponent';
import TableRowComponent from './TableRowComponent';

interface PropFormTable {
    Data? : IProduct[];
    HeadCells : HeadCell[];
}

const TableForm = (propFormTable : PropFormTable) =>{

    const {Data,HeadCells}= propFormTable;

    const [page,setPage] = useState(1);
    const [rowsPerPage,setRowsPerPage] = useState(1);
    
    const handleChangeRowPerPage = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1)
    }

    
    return (
        <div>
        <Box sx={{ width: '100%',backgroundColor : '#323259' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer sx={{backgroundColor : '#323259'}}>
                <Table sx={{minwidth : 750}}>
                     <EnhancedTableHead HeadCells={HeadCells} />
                     <TableBody>
                         {
                             Data?.map((e,index : number) =>{
                                 return (
                                     <TableRowComponent key={index} product={e} />
                                 )
                             })
                         }
                     </TableBody>
                      <PaginationComponent currentPage={page} setCurrentPage ={setPage} lengthPage = {5}/>
                 </Table>
            </TableContainer>
          </Paper>
        </Box>
        </div>
    )
}

export default TableForm;
