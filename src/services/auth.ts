import { Dispatch } from "redux";
import { API } from "../axios/api";
import dataService from "../axios/dataService";
import { errorHandler } from "../helper/handleError";
import { AxiosCustomError, IUser, IUserLogin } from "../helper/interface";
import { successToast } from "../helper/toast";
import { setIsSuperUser, setToken } from "../store/slice/Base";
import { NavigateFunction } from "react-router-dom";
import React from "react";

export const onSubmitSignup = async (
  payload: IUser,
  resetForm: () => void,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await dataService.post(API.signup, payload);

    successToast(response.data.message);

    dispatch(setToken(response.data.data.token));

    navigate("/");

    resetForm();
  } catch (error) {
    return errorHandler(error as AxiosCustomError);
  }
};

export const onSubmitLogin = async (
  payload: IUserLogin,
  resetForm: () => void,
  dispatch: Dispatch,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await dataService.post(API.login, payload);

    successToast(response.data.message);

    dispatch(setToken(response.data.data.token));

    dispatch(setIsSuperUser(response.data.data?.isSuperUser ?? false));

    navigate("/");

    setLoading(false);
    resetForm();
  } catch (error) {
    setLoading(false);
    return errorHandler(error as AxiosCustomError);
  }
};
