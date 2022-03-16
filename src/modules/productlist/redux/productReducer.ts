import {IApiSearchProduct, IProduct} from "../../../models/product";
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IApiGetProduct } from "../../../models/product";

export interface ProductState {
    productlist? : IProduct[],
    apigetproduct : IApiGetProduct,
}

export const initProductState : ProductState ={
    apigetproduct : {
        page : 1,
        count:25,
        search:"",
        category:'0',
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

export const setApiGetProduct = createCustomAction('apigetproduct/setApiGetProduct',(data : IApiGetProduct) =>({
        data,
}))

export const setApiPageProduct = createCustomAction('apigetproduct/setApiPageProduct',(data : number) =>({
        data
}))

export const setApiCountProduct = createCustomAction('apigetproduct/setApiCountProduct',(data : number) =>({
    data,
}))

export const setApiSortProduct = createCustomAction('apigetproduct/setApiSortProduct',(sortName : string,orderBy : string) =>({
    orderBy,sortName
}))

export const setApiSearchProduct = createCustomAction('apigetproduct/setSeacrchApiProduct',(
    searchForm : IApiSearchProduct
) =>({
    searchForm
}))

const actions = {setApiSearchProduct,setProductAction,setApiGetProduct,setApiPageProduct,setApiCountProduct,setApiSortProduct} ;

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
            return ({...state,apigetproduct : {...state.apigetproduct,count : action.data}});
        case getType(setApiSortProduct) :
            return ({...state,apigetproduct : {...state.apigetproduct,sort : action.sortName ,order_by : action.orderBy}});
        case getType(setApiSearchProduct) :
            return ({...state,apigetproduct : {...state.apigetproduct,
                avaibility : action.searchForm.avaibility,
                category : action.searchForm.category,
                search : action.searchForm.search,
                search_type : action.searchForm.search_type,
                stock_status : action.searchForm.stock_status,
                vendor : action.searchForm.vendor,
            }})
        default :
            return state;
    }
}

