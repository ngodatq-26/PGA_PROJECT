import { CheckBox } from '@mui/icons-material';
import { Checkbox, TableCell, TableRow,Button } from '@mui/material';
import React, { useState } from 'react';
import { IProduct } from '../../../models/product';
import DeleteIcon from '@mui/icons-material/Delete';
import {TimeConvert,formatter} from '../utils';

interface PropTableRow {
    product : IProduct;
}
const TableRowProductComponent = (propTableRow : PropTableRow) =>{

    const {product} = propTableRow;
    return (
            <TableRow>
                <TableCell><Checkbox color="primary" 
                                  inputProps={{'aria-label' : 'select all desserts'}}
                        /></TableCell>
                <TableCell></TableCell>
                <TableCell align="left">{product?.sku}</TableCell>
                <TableCell align="left"
                           sx ={{
                            color: '#007bff!important',
                            cursor: 'pointer'
                }}><a style={{cursor: 'pointer'}}>{product?.name}</a></TableCell>
                <TableCell align="left">{product?.category}</TableCell>
                <TableCell align="left">{formatter.format(product.price) }</TableCell>
                <TableCell align="left">{product.amount}</TableCell>
                <TableCell align="left" sx ={{
                            color: '#007bff!important',
                            cursor: 'pointer'
                }}>{product.vendor}</TableCell>
                <TableCell align="left">{TimeConvert(product.arrivalDate)}</TableCell>
                <TableCell align="left"><Button variant="contained" href="#contained-buttons">{}<DeleteIcon sx={{color : 'white'}} /></Button></TableCell>
            </TableRow>
    )
}

export default React.memo(TableRowProductComponent);