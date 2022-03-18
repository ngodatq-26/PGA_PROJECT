import React from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import CreateUserForm from '../components/CreateUserForm/CreateUserForm';
import '../../common/Styles/styles.css';
import 'antd/dist/antd.css';

const CreateUserPage = () =>{
    return (
        <div style ={{display : 'flex',marginTop:'80px'}}>
           <MenuHeaderComponent />  
           <div style={{maxWidth : '100%',display:'flex',flex :'8'}}>
               <CreateUserForm />
            </div>
        </div>
    )
}

export default React.memo(CreateUserPage);