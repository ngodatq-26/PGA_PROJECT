import { Affix, Button, Modal } from 'antd'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/api';
import { IApiGetProduct } from '../../../../models/product';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import '../../styles/UserListStyle.css';
import 'antd/dist/antd.css';
import { IApiGetUsers } from '../../../../models/user';

interface Props {
  api : IApiGetUsers;
  setApi(a : IApiGetUsers) : void
  setCheckReload (a : boolean) : void
}

const DeleteForm = (props : Props) => {

  const {api,setApi,setCheckReload} = props 
  const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
  const Redux_DeleteList = useSelector((state : AppState) => state.userlist.deletelist);
  
  const fetchDelete = useCallback(async () =>{
    const json = await dispatch(fetchThunk(API_PATHS.userEdit,'post',{params : Redux_DeleteList}));
    if(json.success === true) {
      window.location.replace('/pages/users/manage-user');
    } else {
      alert('loi')
    }
  },[Redux_DeleteList]);

  const Click = () =>{
    setCheckReload(true);
    fetchDelete();
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        Click()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
  return (
      <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%',marginLeft :'50px'}} className="delete-form">
          <Affix offsetBottom={0}>
            { (Redux_DeleteList?.length === 0) ? (
             <Button type="primary" disabled>
                Save changes
              </Button>) : <Button type="primary" onClick={showModal} >
                 Remove Selected
              </Button>
            }
           </Affix>
           <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <p>Do you want delete user?</p>
           </Modal>
      </div>
  )
}

export default React.memo(DeleteForm)