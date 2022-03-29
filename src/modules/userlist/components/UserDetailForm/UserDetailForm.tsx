import { FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { ValidationSchema } from '../../utils/valid';
import {createAcessLevelUser, CreateTypeUser, membership} from '../../utils/utils'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Select } from 'antd';
import 'antd/dist/antd.css';
import '../../styles/CreateUserStyle.css'
import CreateLabelForm from '../CreateUserForm/CreateLabelForm';
import { IApiCreateUser, IInfoUser, info, IUser } from '../../../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { API_PATHS } from '../../../../configs/api';
import { fetchThunk } from '../../../common/redux/thunk';
import { IAdministrator } from '../../../../models/common';
import UpdateLabelForm from './UpdateLabelForm';

const { TextArea } = Input;
const { Option } = Select;
interface Props {
    data? : info
    setLoading(a : boolean) : void
}

const CreateUserForm = (props : Props) =>{
    const openNotification = (placement : any) => {
        notification.info({
          message: `Update User`,
          description:
            'Update Successfully',
          placement,
        });
    };

    const routes  = useParams();
    const {data,setLoading} = props;

    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const formik = useFormik({
        initialValues :{
            firstname: data?.firstName ? data.firstName : '',
            lastname :data?.lastName,
            email : data?.email,
            password : '',
            confirmpassword :'',
        },
       validationSchema : ValidationSchema,
       onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    const [check,setCheck] = React.useState(false);

    useEffect(() =>{
        if(formik.values.firstname !== "" && formik.isValid === true ) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    },[formik.isValid])

    const role = useSelector((state: AppState) => 
        state.common.role
    )
    
    const [type,setType] = React.useState(data?.paymentRailsType);
    const [changePassword,setChangePassword] = React.useState(data?.forceChangePassword);
    const [tax,setTax] = React.useState(data?.taxExempt);
    const [accessLevel,setAccessLevel] = React.useState(data?.access_level);
    const [roleType,setRoleType] = React.useState<Array<string> | undefined>(data?.roles);
    const [membershipId,setMembershipId] = React.useState(data?.membership_id);
    const [status,setStatus] = React.useState(data?.status);
    const [statusComment,setStatusComment] = React.useState(data?.statusComment);

    const fetchCreateUser = async () =>{
        setLoading(true);
        const json = await dispatch(fetchThunk(API_PATHS.userEdit,'post',{params : [{
            confirm_password: formik.values.confirmpassword,
            email: formik.values.email,
            firstName: formik.values.firstname,
            forceChangePassword: changePassword,
            lastName: formik.values.lastname,
            membership_id: "",
            password: formik.values.password,
            roles: roleType,
            status: status,
            statusComment: statusComment,
            taxExempt: tax,
            id : Object.values(routes)[0]
        }]}));
        setLoading(false);
        if(json.success == true) {
            openNotification('bottom')
        } else {
            alert('loi');
        }
    } 

    const handleChangeType = (value : any) =>{
        setType(value);
    }

    const handleChangeAccessLevel = (value : any) =>{
        setAccessLevel(value);
    }

    const handleChangeMembership = (value : any) =>{
        setMembershipId(value);
    }
    
    const handleChangeForcePassword = (e : any) =>{
        if(e.target.checked) {
            setChangePassword("1");
        } else {
            setChangePassword("0");
        }
    }

    const handleChangeTax = (e : any) =>{
        if(e.target.checked) {
            setTax("1");
        } else {
            setTax("0");
        }
    }

    const handleChangeRoles = (value : any) =>{
        setRoleType(value);
    }

    const handleStatus = (e : any) =>{
        setStatusComment(e.target.value)
    }

    return (
        <Form className ="form-create" >
            <Button type="primary" style ={{marginLeft : '40px',marginTop :'30px'}} shape="circle" > <Link to="/pages/users/manage-user" ><ArrowBackIcon sx={{color:'#fff'}}/></Link></Button>
            <div className='form-create-div1'>
                <label className="title" style={{width : '100%'}}>{data?.email}</label>
                <label className="text" style={{width : '100%'}}>Email & password</label>
                <div>
                        
                        <label>First Name</label>
                        <div className="valid-form">
                           <Input 
                                name='firstname'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstname}></Input>
                           {formik.touched.firstname && Boolean(formik.errors.firstname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.firstname}</FormHelperText>) : null }
                        </div>
                        <div></div>
                </div>
                <div>
                        <label>Last Name</label>
                        <div className="valid-form">
                             <Input
                             name="lastname"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.lastname}
                             ></Input>
                             {formik.touched.lastname && Boolean(formik.errors.lastname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.lastname}</FormHelperText>) : null }
                        </div>
 
                </div>
                <div>
                        
                        <label>Email</label>
                        <div className="valid-form">
                            <Input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}></Input>
                            {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                        </div>
                        
                </div>
                <div>
                        
                        <label>Password</label>
                        <div className="valid-form">
                            <Input type="password"
                            name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}                  
                            ></Input>
                            {formik.touched.password && Boolean(formik.errors.password) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.password}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                        
                        <label>Confirm Password</label>
                        <div className="valid-form">
                            <Input type="password"
                            name="confirmpassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmpassword}></Input>
                            {formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.confirmpassword}</FormHelperText>) : null }
                        </div>
                </div>
                <div>               
                        <label>Type</label>
                        <div><label>{data?.paymentRailsType}</label></div>
                </div>
                <div>               
                        <label>PaymentRails Id</label>
                        <div><label>{data?.paymentRailsId}</label></div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="text" style={{width : '100%'}}>Acess information</label>
                <div>               
                        <label>Acess Level</label>
                        <div>{data?.access_level === "100" ? <label>Admin</label> : <label>Vendor</label>}</div>
                </div>
                {
                    (data?.access_level === "100") ? (
                        <div>               
                                <label>Roles</label>
                                <Select style={{width : '400px',margin :'0px'}} defaultValue={data.roles} mode="tags" onChange ={handleChangeRoles} >
                                    { role ? role.administrator.map((e : IAdministrator,index : number) =>(
                                        <Option key={index} value={e.id} label={e.name} >{e.name}</Option>
                                        )) : null
                                    }
                                </Select>
                        </div>
                    ) : null
                }
                <div>
                        <label>Roles</label>
                        <Select style={{width : '400px',margin :'0px'}} defaultValue={data?.status}>
                            <Option value="D">Disable</Option>
                            <Option value="E">Enable</Option>
                            <Option value="U">Unapproved vendor</Option>
                        </Select>
                </div>
                <div>
                    <label>Status comment</label>
                    <div><TextArea rows={4} cols={90} value={statusComment} onChange={handleStatus}/></div>
                </div>
                <div>               
                        <label>Memberships</label>
                        <Select style={{width : '400px',margin :'0px'}} defaultValue = "Ignore Membership" onChange = {handleChangeMembership} >
                            {
                                membership.map((e,index : number) =>(
                                    <Option key={index} value={e.value} label={e.label}>{e.label}</Option>
                                ))
                            }
                        </Select>
                </div>
                <div>
                    <label>Pending membership</label>
                    <div>{data?.pending_membership_id ? <label>{data.pending_membership_id}</label> : <label>none</label> }</div>
                </div>
                <div>
                        <label>Require to change password on next log in</label>
                        <div>
                            {
                                data?.forceChangePassword === "0" ?
                                <Checkbox onChange={handleChangeForcePassword}></Checkbox> :
                                <Checkbox checked onChange={handleChangeForcePassword}></Checkbox>
                            }
                        </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="text" style={{width : '100%'}}>Tax information</label>
                <div>   
                    <label>Tax exempt</label>
                    <div>
                        {data?.taxExempt === "0" ? <Checkbox onChange= {handleChangeTax}></Checkbox> : <Checkbox checked onChange= {handleChangeTax}></Checkbox>}    
                    </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <UpdateLabelForm check={check} fetchUpdateUser={fetchCreateUser} />
        </Form>
    )
}

export default React.memo(CreateUserForm);