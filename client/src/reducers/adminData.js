
export default (state = [], action) => {
    switch (action.type) {
        case 'adminData':
            return {...state, response: action.payload }
        default: 
            return state;
    }
}