import { useCallback, useEffect, useState } from "react";
import { API } from "../../axios/api";
import {
  ALIGN,
  AxiosCustomError,
  IExpense,
  Props,
} from "../../helper/interface";
import useTable from "../../hooks/useTable";
import DeleteConformation from "../modal/DeleteModal";
import Table from "../table/Table";
import dataService from "../../axios/dataService";
import { errorHandler } from "../../helper/handleError";
import { successToast } from "../../helper/toast";
import { Expense, ExpenseGroup } from "../../helper/be.interface";
import moment from "moment";
import AddExpense from "./AddExpense";
import UpdateExpense from "./UpdateExpense";
import useFetch from "../../hooks/Fetch";

const ManageExpense = () => {
  const { data, pagination, setPagination, reload, allData, setSearch } =
    useTable<Expense, { totalAmount: number }>(API.getExpense);

  const [deleteThis, setDeleteThis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [searchExpenseGroup, setSearchExpenseGroup] = useState("");
  const [updateModal, setUpdateModal] = useState<IExpense | null>(null);

  const { data: expenseGroup, reload: reloadExpense } = useFetch<
    ExpenseGroup[]
  >(API.getExpenseGroup);

  useEffect(() => {
    const getData = setTimeout(() => {
      reloadExpense(`${API.getExpenseGroup}?search=${searchExpenseGroup}`);
    }, 500);

    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchExpenseGroup]);

  const cols: Props<Expense>["columns"] = [
    {
      key: "date",
      title: "DATE",
      render: (data) => <>{moment(data.date).format("DD-MM-YYYY")}</>,
    },
    {
      key: "account",
      title: "ACCOUNT",
      render: (data) => <>{data.account}</>,
    },
    {
      key: "subAccount",
      title: "SUB ACCOUNT",
      render: (data) => <>{data.subAccount}</>,
    },
    {
      key: "description",
      title: "DESCRIPTION",
      render: (data) => <>{data.description}</>,
    },
    {
      key: "amount",
      title: `AMOUNT (₹${allData?.totalAmount})`,
      render: (data) => <>₹{data.amount}</>,
    },
    {
      key: "action",
      title: "ACTION",
      align: ALIGN.RIGHT,
      render: (record) => {
        return (
          <div className="flex flex-row">
            <button
              disabled={loading}
              onClick={() => {
                setUpdateModal({
                  ...record,
                  amount: String(record.amount),
                });
              }}
              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
            >
              Edit
            </button>
            <button
              disabled={loading}
              onClick={() => setDeleteThis(record._id)}
              className="ml-2 text-red-600 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const onClickOnDelete = useCallback(async () => {
    try {
      setLoading(true);
      const response = await dataService.delete(
        `${API.deleteIncome}/${deleteThis}`
      );
      setDeleteThis(null);
      reload();
      successToast(response.data.message || "Expense deleted");
    } catch (error) {
      errorHandler(error as AxiosCustomError);
    } finally {
      setLoading(false);
    }
  }, [deleteThis, reload]);

  const onCancel = useCallback(() => {
    setDeleteThis(null);
    setAddModal(false);
    setUpdateModal(null);
  }, []);

  const onSuccessAdd = useCallback(() => {
    reload();
    setAddModal(false);
    setUpdateModal(null);
  }, [reload]);

  return (
    <>
      {deleteThis && (
        <DeleteConformation onAction={onClickOnDelete} onCancel={onCancel} />
      )}
      {addModal && <AddExpense onAction={onSuccessAdd} onCancel={onCancel} />}

      {updateModal?._id && (
        <UpdateExpense
          expenseId={updateModal._id}
          onAction={onSuccessAdd}
          onCancel={onCancel}
          initialValue={updateModal}
        />
      )}
      <div className="flex justify-end items-center mb-4 mr-8">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value ?? "")}
          placeholder="Search..."
          className="w-48 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          onClick={() => setAddModal(true)}
        >
          Add New Expense
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/5 overflow-y-auto shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-4 sm:mb-0">
          <div className="bg-white">
            <div className="bg-gray-50 mb-4 w-full p-4">
              <input
                type="text"
                onChange={(e) => setSearchExpenseGroup(e.target.value ?? "")}
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="table w-full table-fixed pl-4 pr-4">
              {(expenseGroup ?? []).map((item, index) => (
                <div
                  key={item._id}
                  className={`table-row border-b h-8 border-gray-300 ${index !== 0 ? "mt-1" : ""}`}
                >
                  <div className="table-cell flex items-center w-full">
                    <span>{item._id}</span>
                    <span className="ml-2 bg-gray-200 rounded-full px-1 py-1 text-xs text-gray-700">
                      {item.numOfValues}
                    </span>
                  </div>
                  <div className="table-cell flex text-end w-full">
                    ₹{item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-auto flex-grow">
          <Table
            columns={cols}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </>
  );
};

export default ManageExpense;
