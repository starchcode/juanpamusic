export default (state = {lan: 'en'}, action) => {
    if(action.type === 'languageChange') {
        return {
            ...state, lan: action.payload
        }
    } else {
        return state;
    }
}