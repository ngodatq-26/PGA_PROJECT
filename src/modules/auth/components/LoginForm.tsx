import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { ValidationSchema } from '../utils';
import {Formik} from 'formik';
import {Button,TextField,Avatar} from '@mui/material';
import { Icon } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import {useFormik} from 'formik';
import * as yup  from "yup";


import '../style/LoginStyle.css';

interface Props {
  onLogin(email : string,password : string): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;


  const onSubmit = () => {
    onLogin(formik.values.email,formik.values.password);
  }

  const formik = useFormik({
      initialValues: {
        email: 'admin.training@powergatesoftware.com',
        password: '123123',
      },
      validationSchema: ValidationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
   });

  return (
         <form onSubmit={formik.handleSubmit} 
         className="card-header loginform" 
         style={{width : '500px',height : '400px',
         display : 'flex',
         flexDirection : 'column',
         justifyContent: 'center',
         alignItems: 'center',
        }}
         >
           <div style ={{display: 'flex',
                       justifyContent: 'center'}}>
             <b style ={{fontSize : '30px'}}>Login</b>
           </div>
           <div>
                 <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                />
           </div>
           <div>
                 <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                />
           </div>
           <div>
                 <Button variant="contained" color="success" className="btn btn-login" onClick={
                   (e) =>{
                    e.preventDefault();
                    onSubmit();
                   }
                 }>
                   <LoginIcon />
                    Login
                 </Button>
           </div>
        </form>
  );
};

export default LoginForm;
