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