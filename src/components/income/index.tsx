import { useCallback, useState } from "react";
import { API } from "../../axios/api";
import {
  ALIGN,
  AxiosCustomError,
  IIncome,
  Props,
} from "../../helper/interface";
import useTable from "../../hooks/useTable";
import DeleteConformation from "../modal/DeleteModal";
import Table from "../table/Table";
import dataService from "../../axios/dataService";
import { errorHandler } from "../../helper/handleError";
import AddIncome from "./AddIncome";
import { successToast } from "../../helper/toast";
import UpdateIncome from "./UpdateIncome";
import { Income } from "../../helper/be.interface";
import moment from "moment";

const ManageIncome = () => {
  const { data, pagination, setPagination, reload, allData, setSearch } =
    useTable<Income, { totalAmount: number }>(API.getIncome);

  const [deleteThis, setDeleteThis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [updateModal, setUpdateModal] = useState<IIncome | null>(null);

  const cols: Props<Income>["columns"] = [
    {
      key: "date",
      title: "DATE",
      render: (data) => <>{moment(data.date).format("DD-MM-YYYY")}</>,
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
      successToast(response.data.message || "Income deleted");
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
      {addModal && <AddIncome onAction={onSuccessAdd} onCancel={onCancel} />}

      {updateModal?._id && (
        <UpdateIncome
          incomeId={updateModal._id}
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
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          onClick={() => setAddModal(true)}
        >
          Add New Income
        </button>
      </div>

      <Table
        columns={cols}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default ManageIncome;
