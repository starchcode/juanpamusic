// import history from "../history";
import server from "../apis/server";

export const contactServer = () => async (dispatch) => {
  try {
    const response = await server.get("/");
    // console.log('Response status',response.config.method.toUpperCase(), ':', response.status);
    dispatch({ type: "contactServer", payload: response.data });
  } catch (e) {
    // console.log(e);
    // console.log('Server error', e.message, e.status);
    dispatch({
      type: "contactServer",
      payload:
        "We encountered an error with the message: " +
        e.message +
        " and response status of: " +
        e.status,
    });
  }
};
export const getAdminData = () => async (dispatch) => {
  try {
    const response = await server.get("/admindata");
    // console.log('Response status',response.config.method.toUpperCase(), ':', response.status);
    dispatch({ type: "adminData", payload: response.data });
  } catch (e) {
    // console.log(e);
    // console.log('Server error', e.message, e.status);
    dispatch({
      type: "adminData",
      payload:
        "We encountered an error with the message: " +
        e.message +
        " and response status of: " +
        e.status,
    });
  }
};

export const languageChange = (lan) => {
  const storage = window.localStorage;
  if(lan === 'en' || lan === 'es'){
    storage.setItem('lan', lan)
    return { type: "languageChange", payload: lan };
  } 
  return { type: "languageChange", payload: null};
};
