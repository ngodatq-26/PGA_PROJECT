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
        address: string | null
        count: number
        country: string
        date_range: Array<string> | null
        date_type: string
        memberships: Array<string> | null
        order_by: string
        page: number
        phone: string | null
        search: string | null
        sort: string
        state: string| null
        status: Array<string> | null
        types: Array<string> | null
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