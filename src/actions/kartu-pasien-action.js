import { GET_KARTUPASIEN_DATAPASIEN } from "../constants";

export const getDataPasien = () => {
  const res = await fetch(`http://localhost:3000/api/kartu-pasien/data-pasien`);
  const data = await res
    .json()
    .then(function (response) {
      dispatch({
        type: GET_KARTUPASIEN_DATAPASIEN,
        payload: {
          data: response.data,
          errorMessage: false,
        },
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_KARTUPASIEN_DATAPASIEN,
        payload: {
          data: false,
          errorMessage: error.message,
        },
      });
    });
};
