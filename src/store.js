import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productReducer, productDetailsReducer, newReviewReducer, productsReducer, newProductReducer, reviewReducer, productReviewsReducer, productDetailsAdminReducer } from './reducers/productReducer';
import { allUsersReducer, contactMailReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    productsState:productsReducer,
    productState: productReducer,
    productDetailsState:productDetailsReducer,
    userState:userReducer,
    profileState: profileReducer,
    forgotPasswordState: forgotPasswordReducer,
    cartState: cartReducer,
    newOrderState: newOrderReducer,
    myOrdersState: myOrdersReducer,
    orderDetailsState: orderDetailsReducer,
    newReviewState: newReviewReducer,
    allOrdersState: allOrdersReducer,
    orderState: orderReducer,
    allUsersState: allUsersReducer,
    newProductState: newProductReducer,
    userDetailsState: userDetailsReducer,
    reviewState: reviewReducer,
    productReviewsState: productReviewsReducer,
    contactMailState: contactMailReducer,
    productDetailsAdminState: productDetailsAdminReducer,
});

let initialState = {
    cartState: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;