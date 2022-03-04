import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import productReducer,{ProductState} from '../modules/productlist/redux/productReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  productlist : ProductState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    productlist : productReducer,
  });
}
