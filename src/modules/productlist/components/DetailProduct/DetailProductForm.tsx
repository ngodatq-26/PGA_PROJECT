import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { ValidationSchema } from '../../utils/valid';
import {Formik} from 'formik';
import { Box, FormHelperText } from '@mui/material';
import {Editable, Slate} from 'slate-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button, Checkbox, DatePicker, Input, notification, Select, Switch, Upload } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Editor } from '@tinymce/tinymce-react';
import UpdateLabelForm from './UpdateLabelForm';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from "redux";
import {AppState} from "../../../../redux/reducer";
import {setApiGetProduct, setProductAction,setApiPageProduct, setApiSearchProduct} from "../../redux/productReducer";
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import '../../styles/styleCreateProduct.css';
import { now } from 'lodash';
import ImgCrop from 'antd-img-crop';
import { UploadFile } from 'antd/lib/upload/interface';
import { IInfoProduct } from '../../../../models/product';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';

const { Option } = Select;
interface Props {
    data : IInfoProduct
}
const DetailProductForm = (props : Props) =>{

    const {data} = props;
    const openNotification = (placement : any,message : string,desc : string) => {
        notification.info({
          message: message,
          description:
            desc,
          placement,
        });
    };

    const fileBegin : any = data.images.map((e,index : number) =>[{
        url : e.file,
        id : e.id
    }])

    const [fileList, setFileList] = React.useState<Array<UploadFile>>([]);
    const [fileListbegin, setFileListBegin] = useState<any>(fileBegin);
 
    console.log(!fileList[0]?.originFileObj)
    const onChange = (newFileList : any) => {
        setFileList(newFileList.fileList);
    };

      const onPreview = async (file : any) => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        if(imgWindow) {
        imgWindow.document.write(image.outerHTML);
        }
      };
    const [check,setCheck] = React.useState(false);
    const [id,setId] = React.useState("");
    const [api,setApi] = React.useState({
        sku : data.sku,
        enable : parseInt(data.enabled),
        membership : data.memberships.map((e) => parseInt(e.membership_id)),
        shippingId : 1,
        tax : 0,
        sale : 0,
        saleType : data.sale_price_type,
        salePrice : data.sale_price,
        oldTagType : data.og_tags_type,
        oldTag : data.og_tags,
        metaType : data.meta_desc_type,
        metaDesc : data.meta_description,
        metaKey : data.meta_keywords,
        pageTitle : data.product_page_title,
        facebook : parseInt(data.facebook_marketing_enabled),
        google : parseInt(data.google_feed_enabled),
        date : data.arrival_date,
        image_name : [] as string[],
    })

    useEffect (()=>{
        setApi({...api,image_name : fileList.map((e)=> e.name)})
    },[fileList])

    console.log(api)
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const vendor = useSelector((state: AppState) => 
        state.common.vendor
    )
    const brand = useSelector((state: AppState) => 
        state.common.brand
    )

    const category = useSelector((state: AppState) => 
        state.common.category
    )

    const shipping = useSelector((state: AppState) => 
        state.common.shipping
    )
    
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const formik = useFormik({
        initialValues :{
            vendors : data.vendor_id,
            producttitle : data.name,
            brands : data.brand_id,
            condition : data.condition_id,
            categorys :data.categories.map((e)=>e.category_id),
            description : data.description,
            price :data.price,
            stock :data.quantity,
            continental :data.shipping[0].price,
        },
       validationSchema : ValidationSchema,
       onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    
    const apiPost : object = {
        vendor_id :formik.values.vendors,
        name:formik.values.producttitle,
        brand_id:formik.values.brands,
        condition_id:formik.values.condition,
        categories:formik.values.categorys,
        description:formik.values.description,
        enabled:api.enable,
        memberships:api.membership,
        shipping_to_zones:[{id:api.shippingId,price:formik.values.continental}],
        tax_exempt:api.tax,
        price:formik.values.price,
        sale_price_type:api.saleType,
        arrival_date: api.date,
        inventory_tracking:0,
        quantity:formik.values.stock,
        sku:api.sku,
        participate_sale:api.sale,
        sale_price:api.salePrice,
        og_tags_type:api.oldTagType,
        og_tags:api.oldTag,
        meta_desc_type:api.metaType,
        meta_description:api.metaDesc,
        meta_keywords:api.metaKey,
        product_page_title:api.pageTitle,
        facebook_marketing_enabled:api.facebook,
        google_feed_enabled:api.google,
        imagesOrder:api.image_name,
        deleted_images:[]
    }
    const formData = new FormData();
    formData.append('productDetail',JSON.stringify(apiPost));

    const fetchCreateProduct = React.useCallback(async () =>{
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
            },
        };
        const json = await axios.post(API_PATHS.productCreate,formData,config)
        if(json.data?.success) {
            setId(json.data.data)
        }
    },[formik.values]);
    
    
    useEffect(()=>{
        fileList.map((file,i : number) =>{
            const formData2 = new FormData;
            console.log('ok')
            formData2.append('productId',id);
            formData2.append('order',"0");
            formData2.append('images[]',fileList[i]?.originFileObj,fileList[i].name);
            UploadFile(formData2)
        })
    },[id]) 


    const UploadFile = React.useCallback(async (formData2 : FormData) =>{
        
        const config = {
            headers: {
              'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryhyWEZEY5ni49pnVw',
              Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
            },
        };
        const json = await axios.post(API_PATHS.UploadImage,formData2,config)
    },[fileList])

    React.useEffect(() =>{
        if(formik.values.vendors !== "" && formik.isValid === true && fileList) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    },[formik.isValid])

    const handleChangeEnable = (e : any) =>{
        if(e) {
            setApi({...api,enable : 1})
        } else setApi({...api,enable : 0})
    }

    const handleChangeMembership = (e : any) =>{
        setApi({...api,membership : e})
    }

    const handleChangeTax = (e : any) =>{
        if(e.target.checked) {
            setApi({...api,tax : 1})
        } else setApi({...api,tax : 0})
    }

    const handleChangeDate = (e : any) =>{
        setApi({...api,date : e})
    }

    const handleChangeSetSale = (e : any) =>{
        if(e.target.checked) {
            setApi({...api,sale : 1})
        } else {setApi({...api,sale : 0})}
    }

    const handleChangeSaleType = (e : any) =>{
        setApi({...api,saleType : e})
    }

    const handleChangeSalePrice = (e : any) =>{
        setApi({...api,salePrice : e.target.value})
    }

    const handleChangeShipping = (e : any) =>{
        setApi({...api,shippingId : e})
    }

    const handleChangeGoogle = (e : any) =>{
        if(e) {
            setApi({...api,google : 1})
        } else setApi({...api,google : 0})
    }

    const handleChangeFacebook = (e : any) =>{
        if(e) {
            setApi({...api,facebook: 1})
        } else setApi({...api,facebook : 0})
    }

    const handleChangeOldTagType = (e : any) =>{
        setApi({...api,oldTagType : e})
    }

    const handleChangeOldTag = (e : any) =>{
        setApi({...api,oldTag : e.target.value})
    }

    const handleChangeMetaType = (e : any) =>{
        setApi({...api,metaType : e})
    }

    const handleChangeMetaDesc = (e : any) =>{
        setApi({...api,metaDesc: e.target.value})
    }

    const handleChangeMetaKey = (e: any) =>{
        setApi({...api,metaKey: e.target.value})
    }

    const handleChangePageTitle = (e: any) =>{
        setApi({...api,pageTitle: e.target.value})
    }

    React.useEffect(() =>{
        if(formik.values.vendors !== "" && formik.isValid === true && fileList !== []) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    },[formik.isValid])
    return (
        <form className ="form-create" onSubmit={formik.handleSubmit}>
            <Button type="primary" style ={{marginLeft : '40px',marginTop :'30px'}} shape="circle" > <Link to="/pages/products/manage-product" ><ArrowBackIcon sx={{color:'#fff'}}/></Link></Button>
            <div className='form-create-div1'>
                <label className="title" style={{width : '100%'}}>{data.name}</label>
                <div>
                        
                        <label>Vendor</label>
                        <div className='valid-form'>
                        <Select style={{width : '400px',margin :'0px'}} placeholder="Search to Select"
                                className='valid-form'
                                id='vendors'
                                optionFilterProp="children"
                                value={formik.values.vendors}
                                onChange={(value) =>{formik.setFieldValue('vendors',value)}}
                                onBlur={formik.handleBlur}
                                showSearch
                        >
                              {
                                  vendor ? vendor.map((e,index : number) =>(
                                      <Option value={e.id} key={index}>{e.companyName}</Option>   
                                  )): null
                              } 
                        </Select>
                        {formik.touched.vendors && Boolean(formik.errors.vendors) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.vendors}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                        <label>Product Title</label>
                        <div className='valid-form'>
                             <Input value={formik.values.producttitle}
                                name="producttitle"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                ></Input>
                              {formik.touched.producttitle && Boolean(formik.errors.producttitle) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.producttitle}</FormHelperText>) : null }
                       </div>
               
                </div>
                <div>
                        
                        <label>Brand</label>
                        <div className='valid-form'>
                        <Select style={{width : '400px',margin :'0px'}} 
                        
                        id='brands'
                        optionFilterProp="children"
                        value={formik.values.brands}
                        onChange={(value) =>{formik.setFieldValue('brands',value)}}
                        onBlur={formik.handleBlur}
                        showSearch
                        >
                              {
                                  brand ? brand.map((e,index : number) =>(
                                      <Option value={e.id} key={index}>{e.name}</Option>   
                                  )): null
                              } 
                        </Select>
                        {formik.touched.brands && Boolean(formik.errors.brands) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.brands}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                        
                        <label>Condition</label>
                        <div className="valid-form">
                        <Select style={{width : '400px',margin :'0px'}} 
                                id="condition"
                                value={formik.values.condition}
                                onChange={(value) =>{formik.setFieldValue('condition',value)}}
                                onBlur={formik.handleBlur} >
                              <Option value="292">Used</Option>
                        </Select>
                        {formik.touched.condition && Boolean(formik.errors.condition) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.condition}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                        
                        <label>SKU</label>
                        <div>
                             <Input value={api.sku} onChange={(e) =>{
                                 setApi({...api,sku : e.target.value})
                             }}></Input>
                        </div>
                </div>
                <div>
                         <label>image</label>
                         
                         <ImgCrop rotate>
                         <Box component="span" sx={{ p: 1, border: '1px dashed grey' }}>
                                <Upload
                                    beforeUpload={()=>{return false}}
                                    action="/"
                                    listType="picture-card"
                                    fileList = {fileListbegin} 
                                    onChange={onChange}
                                    onPreview={onPreview}
                                ></Upload>
                                <Upload
                                    beforeUpload={()=>{return false}}
                                    action="/"
                                    listType="picture-card"
                                    fileList = {fileList} 
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 5 && '+ Upload'}
                                </Upload>
                        </Box>
                        </ImgCrop>
                         
                </div>
                <div>               
                        <label>Category</label>
                        <div className="valid-form">
                        <Select style={{width : '400px',margin :'0px'}} mode="tags" placeholder="Type Categpory name to select" 
                                id="categorys"
                                value={formik.values.categorys}
                                onChange={(value) =>{formik.setFieldValue('categorys',value)}}
                                onBlur={formik.handleBlur}
                        >
                              {
                                  category ? category.map((e,index : number) =>(
                                    <Option value={e.id} key={index}>{e.name}</Option>  
                                )): null
                              }
                        </Select>
                        {formik.touched.categorys && Boolean(formik.errors.categorys) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.categorys}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                        <label>Description</label>
                        <div className="valid-form">
                        <Editor
                            apiKey="u085ls4n2xaf1c7cxtvzr3c1nboggnhlo1x3w6f6dtk4enpy"
                            value={formik.values.description}
                            id = "description"
                            onEditorChange={(value) =>{formik.setFieldValue('description',value)}}
                            onBlur={formik.handleBlur}
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        {formik.touched.description && Boolean(formik.errors.description) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.description}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                         <label>Available for sale</label>
                         <Switch defaultChecked  onChange={handleChangeEnable} />
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="title" style={{width : '100%'}}>Prices & Inventory</label>
                <div>               
                        <label>Memberships</label>
                        <Select style={{width : '400px !important',margin :'0px'}} onChange={handleChangeMembership} mode="multiple" >
                              <Option value={4}>General</Option>
                        </Select>
                </div>
                <div>               
                        <label>Tax Class</label>
                        <div>
                            <label>Default</label>
                            <Checkbox style={{color:'white'}} onChange = {handleChangeTax}>Tax Exempt</Checkbox>
                        </div>
                </div>
                <div>
                       <label>Prices</label>
                        <div style={{display :'flex',flexDirection :'row'}}>
                            <label>
                            <Input 
                        addonBefore="$" placeholder="0.00" defaultValue="mysite"
                         value={formik.values.price}
                                name="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        ></Input>
                        {formik.touched.price && Boolean(formik.errors.price) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.price}</FormHelperText>) : null }
                            </label>
                            <Checkbox onChange ={handleChangeSetSale} style={{color:'white'}}>Sale</Checkbox>
                        </div>
                </div>
                {
                        api.sale ? 
                            <div>
                                <label></label>
                                <Select defaultValue="$" onChange={handleChangeSaleType}>
                                    <Option value="$">$</Option>
                                    <Option value="%">%</Option>
                                </Select>
                                <div style={{width :'100px',height : '33px'}}>
                                  <Input value={api.salePrice} onChange={handleChangeSalePrice}></Input>
                                </div>
                            </div> : null
                        }
                <div>
                    <label>Arrival Date</label>
                    <div>
                            <DatePicker  onChange={handleChangeDate}/>
                    </div>
                </div>
                <div>
                    <label>Quantity in Stock</label>
                    <div className="valid-form">
                    <Input 
                         value={formik.values.stock}
                                name="stock"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        ></Input>
                        {formik.touched.stock && Boolean(formik.errors.stock) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.stock}</FormHelperText>) : null }
                    </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="title" style={{width : '100%'}}>Shipping</label>
                <div>   
                    <label>Continental U.S.</label>
                    <div className="valid-form">
                         
                         <Input 
                        addonBefore="$" placeholder="0.00" defaultValue="mysite"
                         value={formik.values.continental}
                                name="continental"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        ></Input>
                        {formik.touched.continental && Boolean(formik.errors.continental) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.continental}</FormHelperText>) : null }
                    </div> 
                </div>
                <div>   
                    <label>Add Shipping Location</label>
                    <div>
                        <Select style={{width : '400px',margin :'0px'}} defaultValue="Select new zone" onChange={handleChangeShipping}>
                           {
                                  shipping ? shipping.map((e,index : number) =>(
                                    <Option value={e.id} key={index}>{e.name}</Option>   
                                )): null
                              }
                        </Select>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="title" style={{width : '100%'}}>Marketing</label>
                <div>   
                    <label>Open Graph meta tags</label>
                    <div>
                        <Select style={{width : '400px',margin :'0px'}} onChange={handleChangeOldTagType} defaultValue={api.oldTagType}>
                              <Option value="0">Autogenerated</Option>
                              <Option value="1">Custom</Option>
                        </Select>
                    </div>
                </div>
                {
                    api.oldTagType === "1" ?
                        <div>
                            <label></label>
                            <div>
                              <Input value={api.oldTag} onChange={handleChangeOldTag}></Input>
                            </div>
                        </div> : null
                }
                <div>   
                    <label>Meta description</label>
                    <div>
                        <Select style={{width : '400px',margin :'0px'}} onChange={handleChangeMetaType} defaultValue={api.metaType}>
                              <Option value="A">Autogenerated</Option>
                              <Option value="C">Custom</Option>
                        </Select>
                    </div>
                </div>
                {
                    api.metaType === "C" ?
                        <div>
                            <label></label>
                            <div>
                              <Input value={api.metaDesc} onChange={handleChangeMetaDesc}></Input>
                            </div>
                        </div> : null
                }
                <div>
                        
                        <label>Meta keywords</label>
                        <div>
                            <Input value={api.metaKey} onChange={handleChangeMetaKey}></Input>
                        </div>
                </div>
                <div>
                        
                        <label>Product Page Title</label>
                        <div>
                            <Input value={api.pageTitle} onChange={handleChangePageTitle}></Input>
                        </div>
                </div>
                <div>
                         <label>Add to Facebook product feed</label>
                        {api.facebook === 1 ? <Switch defaultChecked onChange = {handleChangeFacebook} /> : <Switch onChange = {handleChangeFacebook} /> }
                </div>
                <div>
                         <label>Add to Google product feed</label>
                         { api.google === 1 ?<Switch defaultChecked onChange = {handleChangeGoogle}/> :<Switch onChange = {handleChangeGoogle}/> }
                        
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'50px'}}></div>
            <UpdateLabelForm  check={check} fetchCreateProduct = {fetchCreateProduct} />
        </form>
    )
}

export default React.memo(DetailProductForm);