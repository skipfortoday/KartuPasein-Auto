import {
  GET_KARTUPASIEN_DATAPASIEN,
  GET_KARTUPASIEN_BA,
  GET_KARTUPASIEN_DOKTER,
  GET_KARTUPASIEN_PERAWATAN,
  GET_KARTUPASIEN_LOKASIFOTOBEFORE,
} from "../constants";

let initialState = {
  getDataPasien: false,
  errorDataPasien: false,
  getBA: false,
  errorBA: false,
  getDokter: false,
  errorDokter: false,
  getPerawatan: false,
  errorPerawatan: false,
  getLokasiFotoBefore: false,
  errorLokasiFotoBefore: false,
};

const kartuPasien = (state = initialState, action) => {
  switch (action.type) {
    case GET_KARTUPASIEN_DATAPASIEN:
      return {
        ...state,
        getDataPasien: action.payload.data,
        errorDataPasien: action.payload.errorMessage,
      };
    case GET_KARTUPASIEN_BA:
      return {
        ...state,
        getBA: action.payload.data,
        errorBA: action.payload.errorMessage,
      };
    case GET_KARTUPASIEN_DOKTER:
      return {
        ...state,
        getDokter: action.payload.data,
        errorDokter: action.payload.errorMessage,
      };
    case GET_KARTUPASIEN_PERAWATAN:
      return {
        ...state,
        getPerawatan: action.payload.data,
        errorPerawatan: action.payload.errorMessage,
      };
    case GET_KARTUPASIEN_LOKASIFOTOBEFORE:
      return {
        ...state,
        getLokasiFotoBefore: action.payload.data,
        errorLokasiFotoBefore: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default kartuPasien;
