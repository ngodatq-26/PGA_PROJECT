import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IApiGetUsers } from '../../../../models/user';

interface Props {
    apiGetUser : IApiGetUsers
    setApiGetUser(a : IApiGetUsers) : void
}
const PaginationComponent = (props : Props) =>{

    const {apiGetUser,setApiGetUser} = props 
    const handleClick = (event: React.ChangeEvent<unknown>, page: number) =>{
        setApiGetUser({...apiGetUser,page : page})
    }

    return (
        <Stack spacing={2} sx={{display : 'flex',flexDirection :'row',color :'white'}}>
             <Pagination count={10} variant="outlined" shape="rounded" onChange ={handleClick}/>
             Items
             <select className="form-select" style={{width : '80px',marginLeft : '40px',marginTop:'0px'}}
                     onChange = {(e) =>{
                        setApiGetUser({...apiGetUser,count : parseInt(e.target.value)})
                     }}
                     defaultValue={25}
             >
                 <option value={10}>10</option>
                 <option value={25}>25</option>
                 <option value={50}>50</option>
                 <option value={75}>75</option>
                 <option value={100}>100</option>
             </select>
             Per Page
        </Stack>
    )
}

export default React.memo(PaginationComponent);