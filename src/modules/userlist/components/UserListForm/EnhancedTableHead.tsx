import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { IApiGetUsers } from '../../../../models/user';
import { headCells } from '../../utils/utils';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface Props {
  apiGetUser : IApiGetUsers
  setApiGetUser(a : IApiGetUsers) : void
}
const EnhancedTableHead = (props : Props) => {
  
  const {apiGetUser,setApiGetUser} = props;

  const onSort = (name : string)=>{
     if(apiGetUser.order_by === 'ASC') {
      setApiGetUser({...apiGetUser,sort : name,order_by : 'DESC'})
     } else {
      setApiGetUser({...apiGetUser,sort : name,order_by : 'ASC'})
     }
  }

  return (
    <TableHead>
                <TableRow>
                    <TableCell><Checkbox /></TableCell>
                    {
                        headCells.map((HeadCell,index : number) =>(
                            <TableCell key = {index} 
                                ><a 
                                onClick ={(e) =>{
                                  onSort(HeadCell.id)
                                }}
                                style ={{padding: '16px 18px',
                                fontSize: '15px',
                                color: '#fff',
                                whiteSpace: 'nowrap',
                                cursor : 'pointer',
                            }}>{HeadCell.label}
                            {(apiGetUser.sort === HeadCell.id)&& (apiGetUser.order_by ==='ASC') ? (<ArrowUpwardIcon />) : null}
                            {(apiGetUser.sort === HeadCell.id)&& (apiGetUser.order_by ==='DESC') ? (<ArrowDownwardIcon />) : null}
                            </a>
                            </TableCell>
                        ))
                    }
                    <TableCell></TableCell>
                </TableRow>
    </TableHead>
  )
}

export default React.memo(EnhancedTableHead)