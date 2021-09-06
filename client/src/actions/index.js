// import history from "../history";
import apis from '../apis/server';
import server from "../apis/server";

  export const contactServer = () => async dispatch => {

      const response = await server.get('/');
      dispatch({type: 'contactServer', payload: response.data})
  }

