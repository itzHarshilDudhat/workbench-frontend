import { Dialog, Transition } from "@headlessui/react";
import { Formik, FormikHelpers } from "formik";
import { Fragment, useCallback, useRef, useState } from "react";
import { AxiosCustomError, IExpense } from "../../helper/interface";
import IncomeForm from "./Form";
import { errorHandler } from "../../helper/handleError";
import dataService from "../../axios/dataService";
import { API } from "../../axios/api";
import { successToast } from "../../helper/toast";
import { expenseValidation } from "../../helper/validation";

interface Props {
  onAction: () => void;
  onCancel: () => void;
}

const AddExpense = (props: Props) => {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const initialValues: IExpense = {
    date: new Date().toString(),
    description: "",
    account: "",
    subAccount: "",
    amount: "",
  };

  const onSubmit = useCallback(
    async (data: IExpense, { resetForm }: FormikHelpers<IExpense>) => {
      setLoading(true);
      try {
        const payload = {
          date: data.date,
          amount: data.amount,
          account: data.account,
          subAccount: data.subAccount,
          description: data.description,
        };
        const response = await dataService.post(API.createExpense, payload);

        successToast(response.data.message);

        resetForm();
        props.onAction();
      } catch (error) {
        errorHandler(error as AxiosCustomError);
      } finally {
        setLoading(false);
      }
    },
    [props]
  );

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.onCancel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-center mt-2 bg-gray-50">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 pb-2"
                  >
                    Add New Expense
                  </Dialog.Title>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={expenseValidation}
                  >
                    {(payload) => (
                      <IncomeForm
                        {...payload}
                        cancelButtonRef={cancelButtonRef}
                        onCancel={props.onCancel}
                        loading={loading}
                      />
                    )}
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddExpense;
