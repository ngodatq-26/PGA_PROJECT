import React from 'react';
import { Stack,Pagination, Button } from '@mui/material';

interface PropPagination {
    currentPage : number,
    setCurrentPage(page : number) : void,
    lengthPage : number
}

const PaginationComponent = (propPagination : PropPagination) =>{

    const {currentPage,setCurrentPage,lengthPage} = propPagination;

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
            </Stack>
    )
}

export default PaginationComponent;