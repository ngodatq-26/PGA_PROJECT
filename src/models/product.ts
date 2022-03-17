export interface IProduct {
    id : string,
    sku : string,
    price : string,
    enabled: string,
    weight : string,
    arrivalDate : string,
    name : string,
    description : string,
    created : string,
    vendor : string,
    vendorID : string,
    amount : string,
    participateSale : string,
    category : string | null,
    condition : string,
}

export interface IApiGetProduct {
    page : number,
    count : number,
    search : string ,
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
