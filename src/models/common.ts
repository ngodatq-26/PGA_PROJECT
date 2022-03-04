import { IProduct } from "./product";

export interface HeadCell {
    disablePadding : boolean,
    id : keyof IProduct,
    label : string,
    numeric : boolean,
}