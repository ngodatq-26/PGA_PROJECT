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