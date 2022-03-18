import { Affix, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
    fetchCreateUser() : void
}

const CreateLabelForm = (props : Props) => {

  const {fetchCreateUser} = props;
  return (
      <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%'}} className="delete-form">
          <Affix offsetBottom={0}>
             <Button type="primary" onClick={fetchCreateUser}>
                <Link to="/pages/user/manage-user">Create account</Link>
              </Button>
           </Affix>
      </div>
  )
}

export default React.memo(CreateLabelForm)