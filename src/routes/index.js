

import AdminPage from "../page/AdminPage/AdminPage";
import DetailsOrderPage from "../page/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../page/HomePage/HomePage";
import MyOrderPage from "../page/MyOrderPage/MyOrderPage";
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import OrderPage from "../page/OrderPage/OrderPage";
import OrderSuccess from "../page/OrderSuccess/OrderSuccess";
import PaymentPage from "../page/PaymentPage/PaymentPage";
import ProductDetailPage from "../page/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../page/ProductsPage/ProductsPage";
import ProfilePage from "../page/ProfilePage/ProfilePage";
import SignInPage from "../page/SignInPage/SignInPage";
import SignUpPage from "../page/SignUpPage/SignUpPage";
import TypeProductPage from "../page/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: 'profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: 'system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]