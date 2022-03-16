import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material'
import React from 'react';
import { IUserList } from '../../../../models/user';
import EnhancedTableHead from './EnhancedTableHead';
import TableRowComponent from './TableRowComponent';

interface Props {
    data : IUserList[];
}

const TableUserComponent = (props : Props) => {

  const {data} = props;
 
  return (

                <TableBody>
                    {
                        data.map((e,index : number) => (
                               <TableRowComponent  key ={index} user ={e} />
                            )
                        )
                    }
                </TableBody>
            
  )
}

export default React.memo(TableUserComponent)