import axios from "axios";
import { GET_KARTUPASIEN_DATAPASIEN } from "../constants";

export const getDataPasien = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/kartu-pasien/data-pasien/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_DATAPASIEN,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_DATAPASIEN,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};
