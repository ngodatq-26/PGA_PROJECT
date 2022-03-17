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
   access_level : string,
   confirm_password : string,
   email : string,
   firstName : string,
   forceChangePassword : 1,
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
  fistName: string
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