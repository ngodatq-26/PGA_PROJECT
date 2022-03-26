import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';


const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductListPage = lazy(() => import('./modules/productlist/pages/ProductListPage'));
const UserListPage = lazy(()=> import('./modules/userlist/pages/UserListPage'));
const CreateProductPage = lazy(() => import('./modules/productlist/pages/CreateProductPage'));
const CreateUserPages =lazy(() =>import( './modules/userlist/pages/CreateUserPages'));
const UserDetailPages = lazy(() =>import('./modules/userlist/pages/UserDetailPages'));
const DetailProductPage = lazy(()=> import('./modules/productlist/pages/DetailProductPage'));
interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.products} component={ProductListPage} />
        <Route path ={ROUTES.createproduct} component ={CreateProductPage} />
        <Route path ={ROUTES.users} component = {UserListPage} />
        <Route path={ROUTES.createuser} component ={CreateUserPages} />
        <Route path={ROUTES.detailUser} component={UserDetailPages} />
        <Route path={ROUTES.detailProduct} component ={DetailProductPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
