import { Button, TableCell, TableRow } from '@mui/material';
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
import '../../styles/UserListStyle.css'
import { Link } from 'react-router-dom';
import {Checkbox} from 'antd'
interface Prop {
    user : IUserList;
    deleteList : IDelete[];
    setDeleteList (e : IDelete[]) : void
}
const TableRowComponent = (prop : Prop) => {

  const {user,deleteList,setDeleteList} = prop;
  const [checkInput,setCheckInput] = React.useState(false);
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

  const HandleClickCheckBox = (e : any) =>{
    clickDelete();
  }

  const link="/pages/users/user-detail/" + user.profile_id 
  return (
    <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
              <TableCell><Checkbox onChange={HandleClickCheckBox} checked={check}
              /></TableCell>
              <TableCell component="th" scope="row" className="text-link">
                <Link to= {link}>{user.vendor}</Link>
                <br></br>
                <a className="text-none">{user.storeName}</a>
              </TableCell>
              <TableCell align="left" className="text-link">{user.fistName +" "+ user.lastName}</TableCell>
              <TableCell align="left" className="text-none">{user.access_level}</TableCell>
              <TableCell align="left" className="text-link">{user.product}</TableCell>
              <TableCell align="left" className="text-none">{user.order.order_as_buyer_total}</TableCell>
              <TableCell align="left" className="text-link">{user.wishlist}</TableCell>
              <TableCell align="left" className="text-none">{TimeConvert(parseInt(user.created))}</TableCell>
              <TableCell align="left" className="text-none">{TimeConvert(parseInt(user.last_login))}</TableCell>
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
