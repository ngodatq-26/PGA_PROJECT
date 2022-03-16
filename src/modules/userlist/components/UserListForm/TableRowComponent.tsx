import { Button, Checkbox, TableCell, TableRow } from '@mui/material';
import React from 'react'
import { IUserList } from '../../../../models/user';
import DeleteIcon from '@mui/icons-material/Delete'
import { TimeConvert } from '../../utils/utils';

interface Prop {
    user : IUserList;
}
const TableRowComponent = (prop : Prop) => {

  const {user} = prop;
  
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
              <TableCell align="left"><Button variant="contained" href="#contained-buttons">{}<DeleteIcon sx={{color : 'white'}} /></Button></TableCell>
    </TableRow>
  )
}

export default React.memo(TableRowComponent)
