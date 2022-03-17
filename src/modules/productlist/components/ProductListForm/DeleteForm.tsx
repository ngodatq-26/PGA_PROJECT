import { Affix, Button } from 'antd'
import React, { useState } from 'react'
import '../../styles/styleProductPage.css'
const DeleteForm = () => {
  return (
      <div style={{position : 'fixed',bottom : '0px',backgroundColor :'#323259',width:'100%'}} className="delete-form">
          <Affix offsetBottom={0}>
             <Button type="primary" >
                Save changes
              </Button>
           </Affix>
      </div>
  )
}

export default React.memo(DeleteForm)