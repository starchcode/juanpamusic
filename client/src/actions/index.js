// import history from "../history";
import server from "../apis/server";

export const sendEmail = (formValues) => async (dispatch, getState) => {
  try {
    // console.log('action creator getState', getState())
    const response = await server.post("/contact", { ...formValues });
    // console.log('Response status',response.config.method.toUpperCase(), ':', response.status);
    dispatch({ type: "sendEmail", payload: response.data });
  } catch (e) {
    // console.log("response: ", e.response.data);
    // console.log("Server error: ", e.response.statusText, e.response.status);

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
    dispatch({
      type: "error",
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
  if (lan === "en" || lan === "es") {
    storage.setItem("lan", lan);
    return { type: "languageChange", payload: lan };
  }
  return { type: "languageChange", payload: null };
};
