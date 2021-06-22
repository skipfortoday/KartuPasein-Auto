import { GET_KARTUPASIEN_DATAPASIEN } from "../constants";

let initialState = {
  getDataPasien: false,
  errorDataPasien: false,
};

const kartuPasien = (state = initialState, action) => {
  switch (action.type) {
    case GET_KARTUPASIEN_DATAPASIEN:
      return {
        ...state,
        getDataPasien: action.payload.data,
        errorDataPasien: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default kartuPasien;
