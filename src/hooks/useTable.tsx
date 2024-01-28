import React, { useCallback, useState } from "react";
import useFetch from "./Fetch";
import { PaginationAvailability, TableResponse } from "../helper/interface";

const convertIntoURL = (obj: Record<string, string>) => {
  return new URLSearchParams(obj).toString();
};

const useTable = <T, S = null>(url: string) => {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<T[]>([]);
  const [allData, setAllData] = useState<(TableResponse<T[]> & S) | null>(null);
  const [paginationAvailability, setPaginationAvailability] =
    useState<PaginationAvailability>({
      pre: false,
      next: false,
    });

  const onAppendData = useCallback(
    (response: TableResponse<T[]> & S) => {
      setAllData(response);

      const resultTotal = response.total;

      setTotal(resultTotal);
      setData(response.list);

      const pageAvailability = { ...paginationAvailability };

      // Make disable if no next page available
      pageAvailability.next = limit * page <= resultTotal;

      // Make disable if no previous page is available
      pageAvailability.pre = page > 1;

      setPaginationAvailability(pageAvailability);
    },
    [limit, page, paginationAvailability]
  );

  const { error, loading, reload } = useFetch<TableResponse<T[]> & S>(
    `${url}?limit=${limit}&page=${page}&search=${search}`,
    onAppendData
  );

  React.useEffect(() => {
    const getData = setTimeout(() => {
      reload(`${url}?limit=${limit}&page=${page}&search=${search}`);
    }, 500);

    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onSetPage = useCallback((payload: number) => {
    setPage(payload);
  }, []);

  const onSetLimit = useCallback((payload: number) => {
    setLimit(payload);
  }, []);

  const onNextPage = useCallback(() => {
    if (paginationAvailability.next) {
      const nextValue = page + 1;
      reload(
        `${url}?${convertIntoURL({
          page: nextValue.toString(),
          limit: limit.toString(),
          search,
        })}`
      );
      setPage(nextValue);
    }
  }, [limit, page, paginationAvailability.next, url, reload, search]);

  const onPreviousPage = useCallback(() => {
    if (paginationAvailability.pre) {
      const nextValue = page - 1;

      reload(
        `${url}?${convertIntoURL({
          page: nextValue.toString(),
          limit: limit.toString(),
          search,
        })}`
      );

      setPage(nextValue);
    }
  }, [limit, page, paginationAvailability.pre, url, reload, search]);

  return {
    data,
    error,
    loading,
    reload,
    allData,
    setSearch,
    pagination: { limit, page, total, paginationAvailability },
    setPagination: { onSetPage, onSetLimit, onPreviousPage, onNextPage },
  };
};

export default useTable;
