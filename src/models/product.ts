export interface IProduct {
    id : number,
    sku : string,
    price : number,
    enabled: number,
    weight : number,
    arrivalDate : number,
    name : string,
    description : string,
    created : number,
    vendor : string,
    vendorID : number,
    amount : number,
    participateSale : number,
    category : string | null,
    condition : string,
}

export interface IApiGetProduct {
    page : number,
    count : number,
    search : string | null,
    category : string,
    stock_status : string,
    availability : string ,
    vendor : string | null,
    sort : string,
    order_by : string,
    search_type : string | null
}

export interface IApiSearchProduct {
    avaibility : string ,
    category : string,
    search : string | null,
    search_type : string | null,
    stock_status : string ,
    vendor : string | null
}
