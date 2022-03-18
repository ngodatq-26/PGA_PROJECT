import { IProduct } from "./product";

export interface HeadCell {
    disablePadding : boolean,
    id : keyof IProduct,
    label : string,
    numeric : boolean,
}

export interface Search {
    label : string,
    value : string|number,
}

export interface ICountry {
    active_currency: null
    code: string
    code3: string
    country: string
    currency_id: string
    enabled:string
    id: string
    is_fraudlent: string
}

export interface IState {
    code: string
    country_code: string
    region_code: null
    state: string
    state_id: string
}

export interface ICategory {
    id: string
    name: string
    parentId: string
    path: string
    pos: string
}

export interface IBrand {
    id : string | null,
    name : string,
}

export interface IVendor {
    companyName: string
    id: string
    login?: string
    name?: string
}

export interface ICondition {
    id: null | string, 
    name: string
}

export interface IShipping {
    id: string | null,
    name: string
}

export interface IRole {
    administrator :IAdministrator[]
    customer : ICustomer[]
}

export interface IAdministrator {
    
    enabled: string
    id: string
    name: string
}

export interface ICustomer {
    id: string,
    name: string,
}
export interface IDelete {
    id : string,
    delete : number,
}