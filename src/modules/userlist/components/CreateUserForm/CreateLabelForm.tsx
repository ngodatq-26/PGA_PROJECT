import { Affix, Button } from 'antd'
import React from 'react'
import { Link, Redirect } from 'react-router-dom';

interface Props {
    fetchCreateUser() : any
    check : boolean
}

const CreateLabelForm = (props : Props) => {

  

  const {fetchCreateUser,check} = props;
  
  return (
      <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%'}} className="delete-form">
          <Affix offsetBottom={0}>
             {
               !check ? (
                <Button type="primary" onClick={fetchCreateUser} disabled>
                    <Link to="/pages/user/manage-user">Create account</Link>
                </Button>
               ) :(
                <Button type="primary" onClick={fetchCreateUser}>Create account
                </Button>
               )
             }
           </Affix>
      </div>
  )
}

export default React.memo(CreateLabelForm)