import { Button, Checkbox, TableCell, TableRow } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import { IUserList } from '../../../../models/user';
import DeleteIcon from '@mui/icons-material/Delete'
import { TimeConvert } from '../../utils/utils';
import { IDelete } from '../../../../models/common';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import {setApiDeleteUserAction} from '../../redux/userReducer';
interface Prop {
    user : IUserList;
    deleteList : IDelete[];
    setDeleteList (e : IDelete[]) : void
}
const TableRowComponent = (prop : Prop) => {

  const {user,deleteList,setDeleteList} = prop;
  const [check,setCheck] = React.useState(false);

  const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    
  const deleteItem : IDelete = {
    id : user.profile_id,
    delete : 1
  }

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
  },[deleteItem]);

  useEffect(()=>{
    dispatch(setApiDeleteUserAction(deleteList));
  },[deleteList]);
  
  return (
    <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
              <TableCell><Checkbox color="primary" 
                                  inputProps={{'aria-label' : 'select all desserts'}}
              /></TableCell>
              <TableCell component="th" scope="row">
                {user.vendor}
              </TableCell>
              <TableCell align="left">{user.fistName}</TableCell>
              <TableCell align="left">{user.access_level}</TableCell>
              <TableCell align="left">{user.product}</TableCell>
              <TableCell align="left">{user.order.order_as_buyer_total}</TableCell>
              <TableCell align="left">{user.wishlist}</TableCell>
              <TableCell align="left">{TimeConvert(parseInt(user.created))}</TableCell>
              <TableCell align="left">{TimeConvert(parseInt(user.last_login))}</TableCell>
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

export default React.memo(TableRowComponent)
