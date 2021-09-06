
export default (state = {}, action) => {
    switch (action.type) {
        case 'contactServer':
            return {...state, response: action.payload }
        default: 
            return state;
    }
}
