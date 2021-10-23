export const languageChangeReducer = (state = {lan: null}, action) => {
    if(action.type === 'languageChange') {
     window.localStorage.setItem("lan", action.payload);
        return {
            lan: action.payload
        }
    } else {
        return state;
    }
}