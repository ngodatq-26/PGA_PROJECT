import React from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import CreateUserForm from '../components/CreateUserForm/CreateUserForm';
import '../../common/Styles/styles.css';
import 'antd/dist/antd.css';
import { Modal, Spin } from 'antd';

const CreateUserPage = () =>{

    const [loading,setLoading] = React.useState(false);

    return (
        <div style ={{display : 'flex',marginTop:'80px'}}>
           <MenuHeaderComponent />  
           {loading ?  <Modal visible = {true} footer={null} destroyOnClose={true} ><Spin style={{marginLeft : '225px'}}/></Modal> :
           <div style={{maxWidth : '100%',display:'flex',flex :'8'}}>
               <CreateUserForm setLoading = {setLoading} />
            </div>}
            
        </div>
    )
}

export default React.memo(CreateUserPage);