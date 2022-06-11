import server from "../apis/server";


export const sendEmail = (formValues) => async (dispatch, getState) => {
  try {
    const response = await server.post("/contact", { ...formValues });
    dispatch({ type: "sendEmail", payload: response.data });
  } catch (e) {
    dispatch({
      type: "sendEmail",
      payload:
        e.response.status +
        " " +
        e.response.statusText +
        " - We encountered an error with the message: " +
        e.response.data,
    });
  }
};

export const cleanContact = () => {
    return { type: 'cleanContact' }
}

export const getAdminData = () => async (dispatch) => {
  try {
    const response = await server.get("/admindata");
    dispatch({ type: "adminData", payload: response });
  } catch (e) {
    let message, status;
    if(e.response){
      status = e.response.status || null;
      message = e.response.data || null;
    }else if(e.message){
      status = null;
      message = e.message || null;
    }

    dispatch({
      type: "error",
      payload:
        "We encountered an error with the message: " +
       message + " and response status of: " + status
    });
  }
};
export const getIglinksData = () => async (dispatch) => {
  try {
    const response = await server.get("/iglinksdata");
    dispatch({ type: "iglinksdata", payload: response });
  } catch (e) {
    let message, status;
    if(e.response){
      status = e.response.status || null;
      message = e.response.data || null;
    }else if(e.message){
      status = null;
      message = e.message || null;
    }

    dispatch({
      type: "error",
      payload:
        "We encountered an error with the message: " +
       message + " and response status of: " + status
    });
  }
};

export const languageChange = (lan) => {
  if (lan === "en" || lan === "es") {
    return { type: "languageChange", payload: lan };
  }
  return { type: "languageChange", payload: null };
};
