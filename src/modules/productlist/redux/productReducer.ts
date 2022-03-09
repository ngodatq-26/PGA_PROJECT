import {IProduct} from "../../../models/product";
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ApiProductList } from "../../../models/product";

export interface ProductState {
    productlist? : IProduct[],
    apigetproduct : ApiProductList,
}

const initProductState : ProductState ={
    apigetproduct : {
        page : 1,
        count:25,
        search:"",
        category:0,
        stock_status:"all",
        availability:"all",
        vendor:"",
        sort:"name",
        order_by:"ASC",
        search_type:""
    }
}
export const setProductAction = createCustomAction('productlist/setProductAction',(data : IProduct[]) =>({
    data,
}));

export const setApiGetProduct = createCustomAction('apigetproduct/setApiGetProduct',(data : ApiProductList) =>(
    {
        data,
    }
) )

export const setApiPageProduct = createCustomAction('apigetproduct/setApiPageProduct',(data : number) =>(
    {
        data
    }
))

export const setApiCountProduct = createCustomAction('apigetproduct/setApiCountProduct',(data : number) =>({
    data,
}))

const actions = {setProductAction,setApiGetProduct,setApiPageProduct,setApiCountProduct} ;

type Action = ActionType<typeof actions>;

export default function reducer (state : ProductState = initProductState ,action : Action) {
    switch(action.type) {
        case getType(setProductAction):
            return ({...state, productlist : action.data});
        case getType(setApiGetProduct) : 
            return ({...state, apigetproduct : action.data});
        case getType(setApiPageProduct) :
            return ({...state, apigetproduct : {...state.apigetproduct,page : action.data}});
        case getType(setApiCountProduct) :
            return ({...state,apigetproduct : {...state.apigetproduct,count : action.data}})
        default :
            return state;
    }
}

