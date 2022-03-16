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