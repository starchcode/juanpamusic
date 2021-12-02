
export const iglinksdata = (state = {}, action) => {
    switch (action.type) {
        case 'iglinksdata':
            return {...state, response: action.payload.data }
        case 'error':
            return { ...state, response: null, error: action.payload }
        default: 
            return state;
    }
}