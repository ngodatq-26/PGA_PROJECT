import React from 'react';
import { TableHead,TableRow,TableCell,Checkbox } from '@mui/material';
import {HeadCell} from '../../../../models/common';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface PropTableHead {
    HeadCells : HeadCell[];
}

const EnhancedTableHead  = (propTableHead : PropTableHead) =>{
    const {HeadCells} = propTableHead;

    return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox color="primary" 
                                  inputProps={{'aria-label' : 'select all desserts'}}
                        />
                    </TableCell>
                    {
                        HeadCells.map((HeadCell,index : number) =>(
                            <TableCell key ={index} ><a style={{color : 'white',fontSize : '15px'}}>{HeadCell.label}</a></TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>

    )
}


export default React.memo(EnhancedTableHead);