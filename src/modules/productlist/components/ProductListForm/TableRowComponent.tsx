import {  TableCell, TableRow,Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../../../../models/product';
import DeleteIcon from '@mui/icons-material/Delete';
import {TimeConvert,formatter} from '../../utils/utils';
import { IDelete } from '../../../../models/common';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { setDeleteProductAction, setProductAction } from '../../redux/productReducer';
import { Checkbox } from 'antd';
import "../../styles/styleProductPage.css"
import { Link } from 'react-router-dom';
interface PropTableRow {
    product : IProduct;
    deleteList : IDelete[];
    setDeleteList (e : IDelete[]) : void;
}

const TableRowProductComponent = (propTableRow : PropTableRow) =>{
    const Redux_DeleteList = useSelector((state : AppState) => state.productlist.deletelist);
    const {product,deleteList,setDeleteList} = propTableRow;
    
    const [checkInput,setCheckInput] = React.useState(false);
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

    const HandleClickCheckBox = (e : any) =>{
            clickDelete();
    }

    const checkInputType = (e : any) =>{
        setCheckInput(!checkInput);
    } 

    const link="/pages/products/product-detail/" + product.id
    return (
            <TableRow >
                <TableCell><Checkbox onChange={HandleClickCheckBox} checked={check}
                /></TableCell>
                <TableCell align="left" className="text-none">{product?.sku}</TableCell>
                <TableCell align="left"
                           sx ={{
                            color: '#007bff!important',
                            cursor: 'pointer'
                }}><Link to={link} style={{cursor: 'pointer'}} >{product?.name}</Link></TableCell>
                <TableCell align="left" className="text-none">{product?.category}</TableCell>
                <TableCell align="left" className="text-none">{formatter.format(parseInt(product.price)) }</TableCell>
                <TableCell align="left" className="text-none">{product.amount}</TableCell>
                <TableCell align="left" sx ={{
                            color: '#007bff!important',
                            cursor: 'pointer'
                }}>{product.vendor}</TableCell>
                <TableCell align="left" className="text-none">{TimeConvert(parseInt(product.arrivalDate))}</TableCell>
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