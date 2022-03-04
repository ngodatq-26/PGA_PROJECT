import React from 'react';
import { TableHead,TableRow,TableCell,Checkbox } from '@mui/material';
import {HeadCell} from '../../../../models/common';

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
                        HeadCells.map((HeadCell) =>(
                            <TableCell key ={HeadCell.id}><a style={{color : 'white',fontSize : '15px'}}>{HeadCell.label}</a></TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>

    )
}

export default EnhancedTableHead;