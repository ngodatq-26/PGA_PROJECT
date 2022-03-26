import { Affix, Button } from 'antd'
import React from 'react'
import { Link, Redirect } from 'react-router-dom';

interface Props {
    fetchUpdateUser() : any
    check : boolean
}

const CreateLabelForm = (props : Props) => {

  const {check,fetchUpdateUser} = props;
  
  return (
      <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%'}} className="delete-form">
          <Affix offsetBottom={0}>
             {
               !check ? (
                <Button type="primary" onClick={fetchUpdateUser} disabled>
                    <Link to="/pages/user/manage-user">Update</Link>
                </Button>
               ) :(
                <Button type="primary" onClick={fetchUpdateUser}>Update
                </Button>
               )
             }
           </Affix>
      </div>
  )
}

export default React.memo(CreateLabelForm)