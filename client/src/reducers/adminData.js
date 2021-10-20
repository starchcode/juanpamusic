
export default (state = {}, action) => {
    switch (action.type) {
        case 'adminData':
            return {...state, response: action.payload.data }
        case 'error':
            return { ...state, response: null, error: action.payload }
        default: 
            return state;
    }
}