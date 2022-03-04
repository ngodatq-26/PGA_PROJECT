import { CheckBox } from '@mui/icons-material';
import { Checkbox, TableCell, TableRow,Button } from '@mui/material';
import React, { useState } from 'react';
import { IProduct } from '../../../../models/product';
import DeleteIcon from '@mui/icons-material/Delete';

interface PropTableRow {
    product? : IProduct;
}
const TableRowComponent = (propTableRow : PropTableRow) =>{

    const {product} = propTableRow;
    return (
            <TableRow>
                <TableCell><Checkbox color="primary" 
                                  inputProps={{'aria-label' : 'select all desserts'}}
                        /></TableCell>
                <TableCell></TableCell>
                <TableCell align="left">{product?.sku}</TableCell>
                <TableCell align="left">{product?.name}</TableCell>
                <TableCell align="left">{product?.category}</TableCell>
                <TableCell align="left"><Button variant="contained" href="#contained-buttons">{}<DeleteIcon sx={{color : 'white'}} /></Button></TableCell>
            </TableRow>
    )
}

export default TableRowComponent;