import { useCallback, useState } from "react";
import { API } from "../../axios/api";
import {
  ALIGN,
  AxiosCustomError,
  ICreateUser,
  Props,
  User,
} from "../../helper/interface";
import useTable from "../../hooks/useTable";
import DeleteConformation from "../modal/DeleteModal";
import Table from "../table/Table";
import dataService from "../../axios/dataService";
import { errorHandler } from "../../helper/handleError";
import AddUser from "./AddUser";
import { successToast } from "../../helper/toast";
import UpdateUser from "./UpdateUser";

const ManageUser = () => {
  const { data, pagination, setPagination, reload } = useTable<User>(
    API.getUser
  );

  const [deleteThis, setDeleteThis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);

  const [updateUser, setUpdateUser] = useState<ICreateUser | null>(null);

  const cols: Props<User>["columns"] = [
    {
      key: "name",
      title: "NAME",
      align: ALIGN.LEFT,
      render: (data) => <>{data.name}</>,
    },
    {
      key: "userName",
      title: "USER NAME",
      render: (data) => <>{data.userName}</>,
    },
    {
      key: "isActive",
      title: "STATUS",
      render: (data) => (
        <input
          className={"switch-input"}
          type="checkbox"
          checked={data.isActive}
          disabled={loading}
          onChange={() => activateDeactivate(data._id)}
        />
      ),
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
                setUpdateUser({
                  ...record,
                  confirmPassword: "",
                  password: "",
                  updatePassword: false,
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

  const activateDeactivate = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        const response = await dataService.patch(
          `${API.activateDeactivateUser}/${userId}`
        );

        reload();
        successToast(response.data.message || "User deleted");
      } catch (error) {
        errorHandler(error as AxiosCustomError);
      } finally {
        setLoading(false);
      }
    },
    [reload]
  );

  const onClickOnDelete = useCallback(async () => {
    try {
      setLoading(true);
      const response = await dataService.delete(
        `${API.deleteUser}/${deleteThis}`
      );
      setDeleteThis(null);
      reload();
      successToast(response.data.message || "User deleted");
    } catch (error) {
      errorHandler(error as AxiosCustomError);
    } finally {
      setLoading(false);
    }
  }, [deleteThis, reload]);

  const onCancel = useCallback(() => {
    setDeleteThis(null);
    setAddUserModal(false);
    setUpdateUser(null);
  }, []);

  const onSuccessAddedUser = useCallback(() => {
    reload();
    setAddUserModal(false);
    setUpdateUser(null);
  }, [reload]);

  return (
    <>
      {deleteThis && (
        <DeleteConformation onAction={onClickOnDelete} onCancel={onCancel} />
      )}
      {addUserModal && (
        <AddUser onAction={onSuccessAddedUser} onCancel={onCancel} />
      )}

      {updateUser?._id && (
        <UpdateUser
          userId={updateUser._id}
          onAction={onSuccessAddedUser}
          onCancel={onCancel}
          initialValue={updateUser}
        />
      )}
      <div className="flex justify-end mb-4 mr-8">
        <button
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          onClick={() => setAddUserModal(true)}
        >
          Create New User
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

export default ManageUser;
