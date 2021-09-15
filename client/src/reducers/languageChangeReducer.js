export default (state = {lan: null}, action) => {
    if(action.type === 'languageChange') {
        return {
            lan: action.payload
        }
    } else {
        return state;
    }
}