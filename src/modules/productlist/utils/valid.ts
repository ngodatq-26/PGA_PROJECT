import * as yup from 'yup';

export const ValidationSchema = yup.object({
  vendors: yup
    .string()
    .required('Vendor is required'),
  producttitle: yup
    .string()
    .required('Product title is required'),
  brands: yup
    .string()
    .nullable()
    .required('Brand is required'),
  condition : yup 
    .string()
    .required('Condition is required'),
  categorys: yup
    .array()
    .min(1,'Category title is required')
    .required('Category title is required'),
  price : yup
    .string()
    .required('Price is required'),
  stock : yup 
    .string()
    .required('Stock is required'),
  continental : yup 
    .string()
    .required('continental is required'),
  description : yup 
    .string()
    .required('Description is required'),
});