
export default (state = [], action) => {
    switch (action.type) {
        case 'adminData':
            return {...state, response: action.payload.data }
        default: 
            return state;
    }
}