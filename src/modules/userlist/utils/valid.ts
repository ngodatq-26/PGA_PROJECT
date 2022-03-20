import * as yup from 'yup';

export const ValidationSchema = yup.object({
  firstname : yup 
    .string()
    .notOneOf(['1'],'First Name is Required')
    .required('First Name is Required'),
  lastname : yup 
     .string()
     .required('Last Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmpassword : yup
    .string().when("password", {
      is: (val: string | any[]) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("password")],
        "Password do not match"
      )
    })
    .required('Confirm Password is Required'),
});