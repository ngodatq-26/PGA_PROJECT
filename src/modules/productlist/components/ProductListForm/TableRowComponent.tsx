import { CheckBox } from '@mui/icons-material';
import { Checkbox, TableCell, TableRow,Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../../../../models/product';
import DeleteIcon from '@mui/icons-material/Delete';
import {TimeConvert,formatter} from '../../utils/utils';
import { IDelete } from '../../../../models/common';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { setDeleteProductAction, setProductAction } from '../../redux/productReducer';

interface PropTableRow {
    product : IProduct;
    deleteList : IDelete[];
    setDeleteList (e : IDelete[]) : void
}

const TableRowProductComponent = (propTableRow : PropTableRow) =>{

    const {product,deleteList,setDeleteList} = propTableRow;
    
    const [check,setCheck] = React.useState(false);

    const deleteItem : IDelete = {
        id : product.id,
        delete : 1
    }

    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    

    const clickDelete = useCallback(() =>{
        setCheck(!check)
        if(!check) {
            setDeleteList([...deleteList,deleteItem])
        } else {
            deleteList.map((e,index : number) =>{
                if(e.id === deleteItem.id) {
                    setDeleteList([...deleteList.slice(0,index), ...deleteList.slice(index+1)])
                }
            })
        }
    },[deleteItem])

    useEffect(()=>{
        dispatch(setDeleteProductAction(deleteList));
    },[deleteList]);


    return (
            <TableRow >
                <TableCell><Checkbox color="primary" 
                                  inputProps={{'aria-label' : 'select all desserts'}}
                /></TableCell>
                <TableCell align="left">{product?.sku}</TableCell>
                <TableCell align="left"
                           sx ={{
                            color: '#007bff!important',
                            cursor: 'pointer'
                }}><a style={{cursor: 'pointer'}}>{product?.name}</a></TableCell>
                <TableCell align="left">{product?.category}</TableCell>
                <TableCell align="left">{formatter.format(parseInt(product.price)) }</TableCell>
                <TableCell align="left">{product.amount}</TableCell>
                <TableCell align="left" sx ={{
                            color: '#007bff!important',
                            cursor: 'pointer'
                }}>{product.vendor}</TableCell>
                <TableCell align="left">{TimeConvert(parseInt(product.arrivalDate))}</TableCell>
                <TableCell align="left">
                    {!check ? (
                    <Button sx={{backgroundColor : '#b18aff'}} variant="contained"
                             onClick = {clickDelete}
                    >{}
                           <DeleteIcon sx={{color : 'white'}} />
                    </Button> ) : (<Button sx={{backgroundColor : '#212529'}} variant ="contained"
                             onClick = {clickDelete}
                    >{}
                           <DeleteIcon sx={{color : 'white'}} />
                    </Button>)
                    } 
                </TableCell>
            </TableRow>
    )
}

export default React.memo(TableRowProductComponent);