import React from 'react';
import { Stack,Pagination, Button, NativeSelect, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface PropPagination {
    currentPage : number,
    setCurrentPage(page : number) : void,
    lengthPage : number,
    rowPerPage : number,
    setRowPerPage(any : any) : void,
}

const PaginationComponent = (propPagination : PropPagination) =>{

    const {currentPage,setCurrentPage,lengthPage,rowPerPage,setRowPerPage} = propPagination;

    const handleChangeRowPerPage = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setRowPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    }

    const handleNextPage =() =>{
        if(currentPage < lengthPage) {
        setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () =>{
        if(currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    }

    const clickPage = (event: React.ChangeEvent<unknown>,page : number) =>{
        setCurrentPage(page);
    }

    return (
            <Stack sx={{display : 'flex' ,flexDirection : 'row'}}>
                <div>
                   <Button variant="outlined" onClick ={handlePrevPage}> Prev</Button>
                </div>
                <div>
                   <Pagination count = {lengthPage} variant ="outlined" shape="rounded" onChange ={clickPage} page={currentPage}  hideNextButton={true} hidePrevButton ={true} />
                </div>
                <div>
                   <Button variant="outlined" onClick ={handleNextPage}> Next</Button>
                </div>
                <div style={{color : 'white'}}>items
                        <Select
                        sx ={{backgroundColor : 'white'}}
                        value={rowPerPage}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange ={
                            (e) =>{
                                setRowPerPage(e.target.value);
                            }
                        }
                        >
                        <MenuItem value={10}>
                            <em>10</em>
                        </MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={75}>75</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        </Select>  
                        Per Page 
                </div>
            </Stack>
    )
}

export default React.memo(PaginationComponent);