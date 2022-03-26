import { Affix, Button } from 'antd'
import React from 'react'
import { Link, Redirect } from 'react-router-dom';

interface Props {
    check : boolean
    fetchCreateProduct() : void
}

const CreateLabelForm = (props : Props) => {

  
  const {check,fetchCreateProduct} = props;
  
  return (
    <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%'}} className="delete-form">
    <Affix offsetBottom={0}>
       {
         !check ? (
          <Button type="primary" onClick ={fetchCreateProduct} disabled>
              <Link to="/pages/user/manage-user">Add Product</Link>
          </Button>
         ) :(
          <Button type="primary" onClick ={fetchCreateProduct}>Add Product
          </Button>
         )
       }
     </Affix>
</div>
  )
}

export default React.memo(CreateLabelForm)