import { HeadCell } from "../../models/common";

export const headCells: HeadCell[] = [
    {
      id:'id',
      numeric: false,
      disablePadding: true,
      label: '',
    },
    {
        id: 'sku',
        numeric: true,
        disablePadding: false,
        label: 'SKU',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id : 'id',
        numeric : false,
        disablePadding : false,
        label :"Delete"
    }
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
    const time = month + ' ' + date + ',' + year ;
    return time;
} 

export const formatter = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
})
