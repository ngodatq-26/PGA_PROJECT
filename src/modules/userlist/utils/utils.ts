import { Search } from "../../../models/common";
import { IUserList } from "../../../models/user";

export interface HeadCell {
    disablePadding : boolean,
    id : keyof IUserList,
    label : string,
    numeric : boolean,
}

export const headCells: HeadCell[] = [
    
    {
        id: 'vendor',
        numeric: true,
        disablePadding: false,
        label: 'Login/Email',
    },
    {
        id: 'fistName',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'access_level',
        numeric: false,
        disablePadding: false,
        label: 'Acess level',
    },
    {
        id : 'product',
        numeric : true,
        disablePadding : false,
        label: 'Products',
    },
    {
        id:'order',
        numeric : true,
        disablePadding : false,
        label :'Orders'
    },
    {
        id :'wishlist',
        numeric :false,
        disablePadding : false,
        label:'Wishlist'
    },
    {
        id:'created',
        numeric : true,
        disablePadding : false,
        label:'Created'
    },
    {
        id : 'last_login',
        numeric : false,
        disablePadding : false,
        label :"Last login"
    },
];

export const TimeConvert = (UNIX_timestamp : number) =>{
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = month + ' ' + date + ',' + year + ',' + hour +':' + min;
    return time;
} 

export const TypeStatus : Search[] = [
    {
        label : 'Any status',
        value : '',
    },
    {
        label : 'Enable',
        value : 'E'
    },
    {
        label : 'Disable',
        value : 'D'
    },
    {
        label : 'Unapproved vendor',
        value : 'U'
    }
]

export const CreateTypeUser : Search[] = [
    {
        label : 'Individual',
        value : 'ndividual'
    },
    {
        label : 'Business',
        value : 'business'
    }
]

export const createAcessLevelUser : Search[] = [
    {
        label :'Admin',
        value : '100'
    },
    {
        label :'Vendor',
        value : '10'
    }
]

export const membership : Search[] = [
    {
        label :'Ignore Membership',
        value : ''
    },
    {
        label :'General',
        value : '4'
    }
]