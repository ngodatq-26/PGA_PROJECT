export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  profile_id : number,
  login : string,
  firstName : string,
  lastName : string,
  dateOfLoginAttempts : number,
  countOfLoginAttempts : number,
  forceChangePassword : number,
}

export interface IApiCreateUser {
   access_level : string ,
   confirm_password : string ,
   email : string | null,
   firstName : string,
   forceChangePassword : number,
   lastName : string,
   membership_id : string,
   password : string,
   paymentRailsType : string,
   roles? : Array<string>,
   taxExempt : number
}

export interface IApiGetUsers {
        address: string
        count: number
        country: string
        date_range: Array<string>
        date_type: string
        memberships: Array<string> 
        order_by: string
        page: number
        phone: string 
        search: string 
        sort: string
        state: string
        status: Array<string> 
        types: Array<string> 
        tz: number
}

export interface IUserList {
  access_level: string
  created: string
  fistName: string | null
  lastName: string
  last_login: string
  order: IOrder
  product: number
  profile_id: string
  storeName: null | string
  vendor: string
  vendor_id: string
  wishlist: string
}

export interface IOrder  {
  order_as_buyer: number, 
  order_as_buyer_total: number
}

export interface account_roles {
  id: string
  name: string
}

export interface account_status {
  D: string
  E: string
  U: string
}

export interface info {
  access_level: string
companyName: null | string
default_card_id: string
earning: number
email: string
expense: string
firstName: null | string
first_login: null | string
forceChangePassword: string
income: null | string
joined: null | string
language: string
lastName:  string
last_login: null | string
membership_id: null | string
order_as_buyer: number
order_as_buyer_total: number
paymentRailsId: null | string
paymentRailsType: string
pending_membership_id: null | string
products_total: string
profile_id: string
referer: string
roles: string[]
status: string
statusComment: string
taxExempt: string
vendor_id: string
}

export interface IInfoUser {
  account_roles : account_roles
  account_status : account_status
  info : info
}