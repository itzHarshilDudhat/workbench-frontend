import { AxiosCustomError } from "./interface";
import { errorToast } from "./toast";

export const errorHandler = (error: AxiosCustomError) => {
  const { response } = error;
  let message = "Something went wrong, Please try again later";
  if (response) {
    if (response.data && response.data.message) message = response.data.message;
  }
  errorToast(message);
};

export const errorHandlerForFetch = (error: AxiosCustomError) => {
  const { response } = error;
  let message = "Something went wrong, Please try again later";
  if (response) {
    if (response.data && response.data.message) message = response.data.message;
  }
  return message;
};
