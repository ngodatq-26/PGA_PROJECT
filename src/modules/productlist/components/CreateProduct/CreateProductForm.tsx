import { useFormik } from 'formik';
import React from 'react';
import { ValidationSchema } from '../../utils/valid';
import {Formik} from 'formik';
import { FormHelperText } from '@mui/material';
import {Editable, Slate} from 'slate-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button, Checkbox, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

const { Option } = Select;

const CreateProductForm = () =>{
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const formik = useFormik({
        initialValues :{
            email : '',
            password : '',
        },
       validationSchema : ValidationSchema,
       onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    return (
        <form className ="form-create" >
            <Button type="primary" style ={{marginLeft : '40px',marginTop :'30px'}} shape="circle" > <Link to="/pages/users/manage-user" ><ArrowBackIcon sx={{color:'#fff'}}/></Link></Button>
            <div className='form-create-div1'>
                <label className="title" style={{width : '100%'}}>Create Profile</label>
                <label className="text" style={{width : '100%'}}>Email & password</label>
                <div>
                        
                        <label>First Name</label>
                        <div>
                            <Input></Input>
                        </div>
                </div>
                <div>
                        <label>Last Name</label>
                        <div>
                             <Input></Input>
                        </div>
 
                </div>
                <div>
                        
                        <label>Email</label>
                        <div>
                            <Input></Input>
                        </div>
                </div>
                <div>
                        
                        <label>Password</label>
                        <div>
                            <Input></Input>
                        </div>
                </div>
                <div>
                        
                        <label>Confirm Password</label>
                        <div>
                            <Input></Input>
                        </div>
                </div>
                <div>               
                        <label>Type</label>
                        <Select style={{width : '400px',margin :'0px'}}>
                              <Option value="lucy">Lucy</Option>
                        </Select>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="text" style={{width : '100%'}}>Acess information</label>
                <div>               
                        <label>Acess Level</label>
                        <Select style={{width : '400px',margin :'0px'}}>
                              <Option value="lucy">Lucy</Option>
                        </Select>
                </div>
                <div>               
                        <label>Memberships</label>
                        <Select style={{width : '400px',margin :'0px'}}>
                              <Option value="lucy">Lucy</Option>
                        </Select>
                </div>
                <div>
                        <label>Require to change password on next log in</label>
                        <div>
                            <Checkbox></Checkbox>
                        </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="text" style={{width : '100%'}}>Tax information</label>
                <div>   
                    <label>Tax exempt</label>
                    <div>
                            <Checkbox></Checkbox>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
        </form>
    )
}

export default React.memo(CreateProductForm);