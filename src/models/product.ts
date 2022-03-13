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

export interface ApiProductList {
    page : number,
    count : number,
    search : string | null,
    category : number,
    stock_status : string,
    availability : string | number,
    vendor : string,
    sort : string,
    order_by : string,
    search_type : string | null
}
