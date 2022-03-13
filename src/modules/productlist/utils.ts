import { HeadCell, Search } from "../../models/common";
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from "redux";
import {AppState} from "../../redux/reducer";

export const headCells: HeadCell[] = [
    {
      id: 'name',
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
        id : 'price',
        numeric : true,
        disablePadding : false,
        label: 'Price',
    },
    {
        id:'amount',
        numeric : true,
        disablePadding : false,
        label :'In Stock'
    },
    {
        id :'vendor',
        numeric :false,
        disablePadding : false,
        label:'Vendor'
    },
    {
        id:'arrivalDate',
        numeric : true,
        disablePadding : false,
        label:'Arrival Date'
    },
    {
        id : 'id',
        numeric : false,
        disablePadding : false,
        label :"Delete"
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
    const time = month + ' ' + date + ',' + year ;
    return time;
} 

export const formatter = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
})
export const checkboxSearch : Search[] = [
    {
        label : 'Name',
        value : 'name'
    },{
        label :'SKU',
        value :'sku'
    },{
        label :'Full Description',
        value :'description'
    }
]
export const stockStatusSearch : Search[] =  [
    {
        label : 'Any stock status',
        value : 'all',
    },
    {
        label :'In stock',
        value : 'in',
    },
    {
        label : 'Low stock' ,
        value : 'low',
    },
    {
        label :'SOLD',
        value : 'out',
    }
]

export const avaibilitySearch : Search[] = [
    {
        label : 'Any avaibility status',
        value : 'all'
    },
    {
        label : 'Only enable',
        value : '1'
    },
    {
        label : 'Only disable',
        value : '0'
    }
]

export const categorySeacrh : Search[] = [
    {
        label : 'Any category',
        value : 0
    },
    {
        label :'----Computers & Electronics',
        value : 3
    },
    {
        label :'',
        value :''
    },
    {
        label :'',
        value :''
    },
    {
        label :'',
        value :''
    },
    {
        label :'',
        value :''
    }

]