import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IApiGetProduct } from '../../../../models/product';

interface Props {
    api : IApiGetProduct;
    setApi(a : IApiGetProduct) : void
    record : string
}
const PaginationComponent = (props : Props) =>{

    
    const {api,setApi,record} = props 
    const handleClick = (event: React.ChangeEvent<unknown>, page: number) =>{
        setApi({...api,page : page})
    }

    return (
        <Stack spacing={2} sx={{display : 'flex',flexDirection :'row',color :'white'}}>
             <Pagination count={73} variant="outlined" shape="rounded" onChange ={handleClick}/>
             <p style={{marginTop:'0px'}}>{record} Items </p>
             <select className="form-select" style={{width : '80px',marginLeft : '40px',marginTop:'0px'}}
                     onChange = {(e) =>{
                        setApi({...api,count : parseInt(e.target.value)})
                     }}
                     defaultValue={25}
             >
                 <option value={10}>10</option>
                 <option value={25}>25</option>
                 <option value={50}>50</option>
                 <option value={75}>75</option>
                 <option value={100}>100</option>
             </select>
             per page
        </Stack>
    )
}

export default React.memo(PaginationComponent);