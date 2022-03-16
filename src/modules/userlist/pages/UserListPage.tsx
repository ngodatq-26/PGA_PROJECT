import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { IApiGetUsers, IUserList } from '../../../models/user';
import { AppState } from '../../../redux/reducer';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import { fetchThunk } from '../../common/redux/thunk';
import SeacrhFormComponent from '../components/UserListForm/SearchFormComponent';
import EnhancedTableHead from '../components/UserListForm/EnhancedTableHead';
import PaginationComponent from '../components/UserListForm/PaginationComponent';
import TableUserComponent from '../components/UserListForm/TableUserComponent';
import { initUserState } from '../redux/userReducer';
import {ICountry, IState} from '../../../models/common'
import { Box, Button, Paper, Table, TableContainer } from '@mui/material';
import {setApiGetUsers} from '../redux/userReducer';

const UserListPage = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const [apiGetUser,setApiGetUser] = React.useState<IApiGetUsers>(initUserState.apigetusers);
    const [data,setData] = React.useState<Array<IUserList>>([]);
    

    const fetchUser = useCallback(async () =>{
        const json = await dispatch(fetchThunk(API_PATHS.userList,'post',apiGetUser));
        if(json.data === false) {
           setData([]);
       } else {
          setData(json.data);
          dispatch(setApiGetUsers(apiGetUser))
       }
   },[apiGetUser]);
   
   useEffect(() => {
       fetchUser();
   },[apiGetUser])


    return (
        <div style ={{display : 'flex',backgroundColor :'#1b1b38'}}>
            
        <MenuHeaderComponent />
        
        <div style ={{marginTop :'80px'}}>
           <SeacrhFormComponent />
           <div style={{ margin:'30px'}}>
           <div style={{marginBottom : '30px'}}>
                <Button variant='contained' href='/pages/user/new-user'>Add User</Button>
            </div>
            <Box sx={{ width: '100%',backgroundColor : '#323259' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer sx={{backgroundColor : '#323259'}}>
                        <Table sx={{minwidth : 750}}>
                           <EnhancedTableHead apiGetUser ={apiGetUser} setApiGetUser ={setApiGetUser}/>
                           <TableUserComponent data={data} />
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
           <PaginationComponent apiGetUser ={apiGetUser} setApiGetUser ={setApiGetUser} />
           </div>
        </div>
    </div>
    )
}

export default React.memo(UserListPage);