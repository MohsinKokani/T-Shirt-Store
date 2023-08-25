import axios from "axios";
const addToCart = (product, quantity, size) => {
    return (dispatch) => {
        dispatch({ type: 'ADD_TO_CART_REQUEST' });
        axios.post(`${process.env.REACT_APP_FETCH_DOMAIN}/cart/add`, { product, quantity, size })
            .then(response => {
                alert("added to cart")
                dispatch({
                    type: 'ADD_TO_CART_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'ADD_TO_CART_FAIL',
                    payload: error.response,
                });
            });

    }
}
const getCartItems = () => {
    return (dispatch) => {
        dispatch({ type: 'GET_CART_ITEM_REQUEST' });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/cart/all`, {}, config)
            .then(response => {
                dispatch({
                    type: 'GET_CART_ITEM_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'GET_CART_ITEM_FAIL',
                    payload: error.response,
                });
            });
    }
}
const removeItem = (product) => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_ITEM_REQUEST' });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        axios.delete(`${process.env.REACT_APP_FETCH_DOMAIN}/cart/remove/${product}`, {}, config)
            .then(response => {
                dispatch({
                    type: 'REMOVE_ITEM_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'REMOVE_ITEM_FAIL',
                    payload: error.response,
                });
            });
    }
}
const clearErrors = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        })
    }
}
export { addToCart, getCartItems, clearErrors, removeItem }