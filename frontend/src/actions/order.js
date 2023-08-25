import axios from "axios"
const newOrder = ({ firstName, lastName, address, city, state, country, pinCode, phoneNo, orderItems, itemsPrice, paymentInfo }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "NEW_ORDER_REQUEST" })
            const body = {
                shippingInfo: {
                    firstName,
                    lastName,
                    address,
                    city,
                    state,
                    country,
                    pinCode,
                    phoneNo,
                },
                orderItems,
                itemsPrice,
                taxPrice: itemsPrice * 0.18,
                shippingPrice: 40,
                totalPrice: itemsPrice + itemsPrice * 0.18 + 40,
                paymentInfo,
                paidAt: Date.now()
            }
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredntials: true
            };
            const { data } = await axios.post(`${process.env.REACT_APP_FETCH_DOMAIN}/order/neworder`, body, config);
            dispatch({
                type: 'NEW_ORDER_SUCCESS',
                payload: data,
            })
        } catch (error) {
            alert(error.message || error);
            dispatch({
                type: 'NEW_ORDER_FAIL',
                payload: error.message
            })
        }
    }
}
const getMyOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MY_ORDER_REQUEST" })
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredntials: true
            };
            const { data } = await axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/order/myOrders`, {}, config);
            dispatch({
                type: 'GET_MY_ORDER_SUCCESS',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'GET_MY_ORDER_FAIL',
                payload: error.message
            })
        }
    }

}
const getMyOrderWithId = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_SINGLE_ORDER_REQUEST" })
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredntials: true
            };
            const { data } = await axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/order/getbyid/${id}`, {}, config);
            dispatch({
                type: 'GET_SINGLE_ORDER_SUCCESS',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'GET_SINGLE_ORDER_FAIL',
                payload: error.message
            })
        }
    }
}
const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        })
    }
}
export { newOrder, clearErrors, getMyOrders, getMyOrderWithId }