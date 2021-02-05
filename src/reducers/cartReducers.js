import {
    CART_ADD_ITEM,
    CART_EMPTY,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";
import {
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: action.payload };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};