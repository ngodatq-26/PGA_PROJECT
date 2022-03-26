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
import { setDeleteProductAction } from '../../redux/productReducer';
import '../../styles/styleProductPage.css';
import 'antd/dist/antd.css';

interface Props {
  api : IApiGetProduct;
  setApi(a : IApiGetProduct) : void
  setCheckReload (a : boolean) : void
}

const DeleteForm = (props : Props) => {

  const {api,setApi,setCheckReload} = props 
  const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
  const Redux_DeleteList = useSelector((state : AppState) => state.productlist.deletelist);

  
  const fetchDelete = useCallback(async () =>{
    const json = await dispatch(fetchThunk(API_PATHS.productEdit,'post',{params : Redux_DeleteList}));
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
               <p>Do you want delete product?</p>
           </Modal>
      </div>
  )
}

export default React.memo(DeleteForm)