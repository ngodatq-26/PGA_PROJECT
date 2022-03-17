import {IApiGetUsers,IApiCreateUser,IUserList} from "../../../models/user";
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IBrand, ICategory, ICondition, ICountry, IRole, IShipping, IVendor } from "../../../models/common";

export interface commonState {
    country? : ICountry[]
    category? : ICategory[]
    brand? : IBrand[]
    vendor? : IVendor[]
    condition? : ICondition[]
    role? : IRole[]
    shipping? : IShipping[]
}

export const setGetCountryAction = createCustomAction('country/setGetCountryAction',(data : ICountry[]) =>({
    data,
}));

export const setGetCategoryAction = createCustomAction('category/setGetCategoryAction',(data : ICategory[]) =>({
    data,
}));

export const setGetBrandAction = createCustomAction('brand/setGetBrandAction',(data : IBrand[]) =>({
    data,
}));

export const setGetVendorAction = createCustomAction('vendor/setGetVendorAction',(data : IVendor[]) =>({
    data,
}));

export const setGetConditionAction = createCustomAction('condition/setGetConditionrAction',(data : ICondition[]) =>({
    data,
}));

export const setGetRoleAction = createCustomAction('role/setGetRoleAction',(data : IRole[]) =>({
    data,
}));

export const setGetShippingAction = createCustomAction('shipping/setGetShippingAction',(data : IShipping[]) =>({
    data,
}));


const actions = {setGetShippingAction,setGetCountryAction,setGetCategoryAction,setGetBrandAction,setGetVendorAction,setGetConditionAction,setGetRoleAction} ;

type Action = ActionType<typeof actions>;

export default function reducer (state : commonState = {} ,action : Action) {
    switch(action.type) {
        case getType(setGetCountryAction):
            return ({...state, country : action.data});
        case getType(setGetCategoryAction):
            return ({...state,category : action.data});
        case getType(setGetBrandAction) :
            return ({...state,brand : action.data})
        case getType(setGetVendorAction):
            return ({...state, vendor : action.data})
        case getType(setGetConditionAction):
            return ({...state, condition : action.data})
        case getType(setGetRoleAction):
            return ({...state, role : action.data})
        case getType(setGetShippingAction):
            return ({...state, shipping : action.data})
        default :
            return state;
    }
}