import {IProduct} from "../../../models/product";
import { ActionType, createCustomAction, getType } from 'typesafe-actions';


export interface ProductState {
    productlist? : IProduct[],
}

export const setProductAction = createCustomAction('productlist/setProductAction',(data : IProduct[]) =>({
    data,
}));

const actions = {setProductAction} ;

type Action = ActionType<typeof actions>;

export default function reducer (state : ProductState = {},action : Action) {
    switch(action.type) {
        case getType(setProductAction):
            return ({...state, productlist : action.data});
        default :
            return state;
    }
}

