import { Button, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { ValidationSchema } from '../../utils/valid';
import '../../styles/CreateUserStyle.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateUserForm = () =>{
    const formik = useFormik({
        initialValues :{
            firstname: '',
            lastname :'',
            email : '',
            password : '',
            confirmpassword :'',
            paymentRailsType :'individual',
        },
       validationSchema : ValidationSchema,
       onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    return (
        <form onSubmit={formik.handleSubmit} 
         className="card-header create-product-form" 
         style={{width:'100%',
         display : 'flex',
         flexDirection : 'column',
         justifyContent: 'center',
         alignItems: 'center',
        }}
         >
             <div>
                <div>
                    <div><Button variant='contained' href=""><ArrowBackIcon /></Button></div>
                    <div style={{color:'white',fontSize :'2rem',fontFamily :'sans-serif'}}>Create Profile</div>
                    <div style={{color:'white',fontSize :'1.125rem',fontFamily :'sans-serif'}}>Email & password</div>
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>First Name</label>
                    <input id="outlined-basic" type="text"
                               className="form-control"
                                name="firstname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstname}
                                
                    ></input>
                    {formik.touched.firstname && Boolean(formik.errors.firstname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.firstname}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Last Name</label>
                    <input id="outlined-basic" type="email"
                               className="form-control"
                                name="lastname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                                
                    ></input>
                    {formik.touched.lastname && Boolean(formik.errors.lastname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.lastname}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Email Name</label>
                    <input id="outlined-basic" type="email"
                               className="form-control"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                
                    ></input>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Password</label>
                    <input id="outlined-basic" type="password"
                               className="form-control"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}                  
                    ></input>
                    {formik.touched.password && Boolean(formik.errors.password) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.password}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Confirm Password</label>
                    <input id="outlined-basic" type="password"
                               className="form-control"
                                name="confirmpassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmpassword}
                                
                    ></input>
                    {formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.confirmpassword}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Category</label>
                    <select
                        className='form-select'
                        name="paymentRailsType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.paymentRailsType}
                    >
                        <option value="individual">Individual</option>
                        <option value="business">Business</option>
                    </select>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                      <label style={{color:'white'}}>PaymentRails ID</label>
                </div>
             </div>
             <div>
                <div><div style={{color:'white',fontSize :'1.125rem',fontFamily :'sans-serif'}}>Acess Information</div></div>
                <div className="field-form">
                    <label style={{color:'white'}}>Acess Level</label>
                    <select
                        className='form-select'
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstname}
                    >
                        <option value={10}>Admin</option>
                        <option value={20}>Vendor</option>
                    </select>
                    {formik.touched.firstname && Boolean(formik.errors.firstname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.firstname}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Membership</label>
                    <select
                        className='form-select'
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    >
                        <option value={10}>Ignore Membership</option>
                        <option value={20}>General</option>
                    </select>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                </div>
                <div>
                     
                     <label style={{color:'white'}}>Require to change password on next log in</label>
                     <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
                </div>
             </div>
             <div>
                 <div><div style={{color:'white',fontSize :'1.125rem',fontFamily :'sans-serif'}}>Tax information</div></div>
                 <div>    
                     <label style={{color:'white'}}>Tax exempt</label>
                     <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
                </div>
             </div>
             <div>
                 <button className='btn btn-warning'>Create account</button>
             </div>
        </form>
    )
}

export default React.memo(CreateUserForm);