import { useFormik } from 'formik';
import React from 'react';
import { ValidationSchema } from '../../utils/valid';
import {Formik} from 'formik';
import { Box, Button, Checkbox, FormHelperText, MenuItem, Select, Switch, TextField } from '@mui/material';
import {Editable, Slate} from 'slate-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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
                    <div><Button variant='contained' href="/pages/products/manage-product"><ArrowBackIcon /></Button></div>
                    <div style={{color:'white',fontSize :'2rem',fontFamily :'sans-serif'}}>Add Product</div>
                </div>    
                <div className="field-form">
                    <label style={{color:'white'}}>Vendor</label>
                    <input id="outlined-basic" type="email"
                               className="form-control"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder ="Type Vendor name to select"
                    ></input>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Product Title</label>
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
                    <label style={{color:'white'}}>Brands</label>
                    <select
                        className='form-select'
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    >
                        <option value={10}> 10</option>
                        
                    </select>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Condition</label>
                    <select
                        className='form-select'
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    >
                        <option value={10}> 10</option>
                        
                    </select>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>Error</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>SKU</label>
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
                    <label style={{color:'white'}}>Images</label>
                    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                        <Button><CameraAltIcon /></Button>
                    </Box>
                </div>
                <div className="field-form">
                    <label style={{color:'white'}}>Category</label>
                    <select
                        className='form-select'
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    >
                        <option value={10}> 10</option>
                        
                    </select>
                    {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                </div>
                <div className="field-form">
                    <div>
                       <label style={{color:'white'}}>Description</label>
                    </div>
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
                    <div>
                       <label style={{color:'white'}}>Available for sale</label>
                    </div>
                   <Switch {...label} defaultChecked />
                </div>
            </div>
            <div>
                 <div style={{color:'white',fontSize :'2rem',fontFamily :'sans-serif'}}>Add Product</div>
                 <div className="field-form">
                        <label style={{color:'white'}}>Category</label>
                        <select
                            className='form-select'
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        >
                            <option value={10}> 10</option>
                            
                        </select>
                        {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                 </div>
            </div>

        </form>
    )
}

export default React.memo(CreateProductForm);