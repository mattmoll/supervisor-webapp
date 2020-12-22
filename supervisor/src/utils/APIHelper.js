import React from "react";
import axios from "axios";

import { AppContext } from "../AppContext";
import Constants from "./Constants";

const useApi = (resource) => {
  const {apiUrl, sessionInfo: {token}, logOut, setSessionExpired} = React.useContext(AppContext);

  const makeRequest = async (onSuccess) => {
    await axios.get(apiUrl + resource, {
      headers: {
      'token': token
      }
    }).then(result => {
        const resultState = result.data;

        if(resultState.code == Constants.errorCode){
          setSessionExpired(true);
          logOut();
          return;
        }

        onSuccess(resultState);
    })
  };

  return { makeRequest };
};

export default useApi;