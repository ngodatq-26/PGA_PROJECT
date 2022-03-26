import { Affix, Button } from 'antd'
import React from 'react'
import { Link, Redirect } from 'react-router-dom';

interface Props {
    check : boolean
    fetchCreateProduct() : void
}

const UpdateLabelForm = (props : Props) => {

  
  const {check,fetchCreateProduct} = props;
  
  return (
    <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%'}} className="delete-form">
    <Affix offsetBottom={0}>
       
    {
         !check ? (
          <Button type="primary" onClick ={fetchCreateProduct} disabled>
              <Link to="/pages/user/manage-user">Update Product</Link>
          </Button>
         ) :(
          <Button type="primary" onClick ={fetchCreateProduct}>Update Product
          </Button>
         )
       }

     </Affix>
</div>
  )
}

export default React.memo(UpdateLabelForm)