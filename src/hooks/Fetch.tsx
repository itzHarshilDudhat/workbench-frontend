import { useState, useEffect } from "react";
import dataService from "../axios/dataService";
import { APIResponse, AxiosCustomError } from "../helper/interface";
import { errorHandlerForFetch } from "../helper/handleError";

const useFetch = <T,>(baseUrl: string, onGrabData?: (response: T) => void) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (url?: string) => {
    try {
      setLoading(true);

      const response = await dataService.get<APIResponse<T>>(
        url ? url : baseUrl
      );

      const { data: responseData } = response.data;

      if (onGrabData) onGrabData(responseData);

      setData(responseData);
    } catch (error) {
      setError(errorHandlerForFetch(error as AxiosCustomError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { reload: fetch, data, error, loading };
};

export default useFetch;
