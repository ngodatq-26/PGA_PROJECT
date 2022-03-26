import React from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import '../../common/Styles/styles.css';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { queries } from '@testing-library/react';
import { useParams } from 'react-router';
import CreateUserForm from '../components/CreateUserForm/CreateUserForm';
import { IInfoUser, info } from '../../../models/user';
import UserDetailForm from '../components/UserDetailForm/UserDetailForm';
import { Modal, Spin } from 'antd';


const CreateUserPage = () =>{

    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();

    const id = useParams();

    const [loading,setLoading] = React.useState(false)
    const [data,setData] = React.useState<IInfoUser>();
    const fetchUser = React.useCallback(async () =>{
        setLoading(true)
        const json = await dispatch(fetchThunk(API_PATHS.userDetail,'post',id));
        setData(json.data);
        setLoading(false);
   },[]);

   React.useEffect(() =>{
       fetchUser()
   },[])

    return (
        <div style ={{display : 'flex',marginTop:'80px'}}>
           <MenuHeaderComponent /> 
           {loading ?  <Modal visible = {true} footer={null} destroyOnClose={true} ><Spin style={{marginLeft : '225px'}}/></Modal> : 
           <div style={{maxWidth : '100%',display:'flex',flex :'8'}}>
               { data ? 
               <UserDetailForm data ={data.info} setLoading = {setLoading} /> : null
                } 
            </div>}
        </div>
    )
}

export default React.memo(CreateUserPage);