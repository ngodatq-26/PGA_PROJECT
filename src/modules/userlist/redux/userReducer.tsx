import {IApiGetUsers,IApiCreateUser,IUserList} from "../../../models/user";
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ApiProductList } from "../../../models/product";

export interface UserState {
    userlist? : IUserList[],
    apigetusers : IApiGetUsers,
}

export const initUserState : UserState ={
    apigetusers : {
        address: "",
        count: 25,
        country: "",
        date_range: [],
        date_type: "R",
        memberships: [],
        order_by: "DESC",
        page: 1,
        phone: "",
        search: "",
        sort: "last_login",
        state: "",
        status: [],
        types: [],
        tz: 7,
    }
}
export const setApiGetUsers = createCustomAction('apigetusers/setApiGetUsers',(data : IApiGetUsers) =>({
    data,
}));

export const setUserList = createCustomAction('userlist/setUserList',(data : IUserList[])=>({
    data
}));

const actions = {setApiGetUsers,setUserList} ;

type Action = ActionType<typeof actions>;

export default function reducer (state : UserState = initUserState ,action : Action) {
    switch(action.type) {
        case getType(setApiGetUsers):
            return ({...state, apigetusers : action.data});
        case getType(setUserList) :
            return ({...state, userlist : action.data});
        default :
            return state;
    }
}