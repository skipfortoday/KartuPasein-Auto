import axios from "axios";
import {
  GET_KARTUPASIEN_DATAPASIEN,
  GET_KARTUPASIEN_BA,
  GET_KARTUPASIEN_DOKTER,
  GET_KARTUPASIEN_PERAWATAN,
} from "../constants";

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

export const getBA = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/kartu-pasien/ba/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_BA,
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

export const getDokter = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/kartu-pasien/dokter/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_DOKTER,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_DOKTER,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getPerawatan = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/kartu-pasien/perawatan/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_PERAWATAN,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_PERAWATAN,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getFotoBefore = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/api/kartu-pasien/perawatan/data`)
      .then(function (response) {
        dispatch({
          type: GET_KARTUPASIEN_PERAWATAN,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KARTUPASIEN_PERAWATAN,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};
