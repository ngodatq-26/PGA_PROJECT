import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material'
import React from 'react';
import { IDelete } from '../../../../models/common';
import { IUserList } from '../../../../models/user';
import EnhancedTableHead from './EnhancedTableHead';
import TableRowComponent from './TableRowComponent';

interface Props {
    data : IUserList[];
}

const TableUserComponent = (props : Props) => {

  const [deleteList,setDeleteList] = React.useState<Array<IDelete>>([]);

  const {data} = props
 
  return (

                <TableBody>
                    {
                        data.map((e,index : number) => (
                               <TableRowComponent  key ={index} user ={e} deleteList={deleteList} setDeleteList={setDeleteList} />
                            )
                        )
                    }
                </TableBody>
            
  )
}

export default React.memo(TableUserComponent)