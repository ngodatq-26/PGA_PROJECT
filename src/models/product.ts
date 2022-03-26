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

export interface Cate {
    category_id: string
    name: string
}

export interface Image {
    file: string
    id: string
    thumbs : Array<string>
}

export interface Member {
    membership_id: string
}
export interface IInfoProduct{
        arrival_date: string,
        brand_id: string,
        categories: Cate[]
        cleanURL: string
        code: string
        condition_id: string
        description: string
        enabled: string
        facebook_marketing_enabled: string
        google_feed_enabled: string
        id: string
        images: Image[]
        inventory_tracking: string
        memberships: Member[]
        meta_desc_type: string
        meta_description: string
        meta_keywords: string
        name: string
        og_tags: string                  
        og_tags_type: string
        participate_sale :string
        price: string
        product_page_title: string
        quantity: string
        sale_price: string
        sale_price_type: string
        shipping: Ship[]
        sku: string
        sort_description: string
        tax_exempt: string
        vendor_id: string
        weight: string
}

export interface Ship {
    id: string,
    zone_name: string, 
    price: string
}