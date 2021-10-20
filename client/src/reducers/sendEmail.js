export default (state = {}, action) => {
    switch (action.type) {
        case 'sendEmail':
            return {...state, response: action.payload }
        case 'cleanContact':
            return { response: null};
        default: 
            return state;
    }
}
