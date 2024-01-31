import React from "react";
import { Form, FormikProps } from "formik";
import { IExpense } from "../../helper/interface";
import CustomDatePicker from "../datepicker/DatePicker";
import moment from "moment";
import ReactSelect from "react-select";

interface Props extends FormikProps<IExpense> {
  cancelButtonRef: React.MutableRefObject<null>;
  onCancel: () => void;
  loading: boolean;
  isEditFrom?: boolean;
}

const accountOptions = ["Labour", "Building", "B/W"];

const selectOptions = accountOptions.map((item) => ({
  value: item,
  label: item,
}));

const ExpenseForm = (props: Props) => {
  const {
    values,
    errors,
    touched,
    loading,
    handleBlur,
    handleChange,
    setFieldValue,
  } = props;

  return (
    <>
      <Form>
        <div className="bg-white sm:pb-4 w-full">
          <div className="sm:flex sm:items-start sm:justify-center w-full">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <div className="flex flex-row justify-around">
                <div className="relative z-0 mt-4 sm:mr-4 w-full description-input">
                  <CustomDatePicker
                    id="date_input"
                    name="date"
                    selected={
                      values.date
                        ? new Date(moment(values.date).format("yyyy-MM-DD"))
                        : null
                    }
                    hasError={Boolean(errors.date && touched.date)}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                  />
                  {errors.date && touched.date && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.date}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-row justify-around">
                <div className="relative z-0 mt-4 sm:mr-4 w-full description-input">
                  <input
                    type="number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    id="amount_input"
                    name="amount"
                    disabled={loading}
                    autoFocus
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label
                    htmlFor="amount_input"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    amount
                  </label>
                  {errors.amount && touched.amount && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.amount}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-row justify-around">
                <div className="relative z-0 mt-4 sm:mr-4 w-full description-input">
                  <ReactSelect
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={loading}
                    autoFocus
                    options={selectOptions}
                    value={selectOptions.find(
                      (item) => item.value === values.account
                    )}
                    onChange={(e) => setFieldValue("account", e?.value ?? "")}
                    onBlur={handleBlur}
                    placeholder="Select an option"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {errors.account && touched.account && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.account}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-row justify-around">
                <div className="relative z-0 mt-4 sm:mr-4 w-full description-input">
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    id="subAccount_input"
                    name="subAccount"
                    disabled={loading}
                    autoFocus
                    value={values.subAccount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label
                    htmlFor="subAccount_input"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Sub Account
                  </label>
                  {errors.subAccount && touched.subAccount && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.subAccount}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-row justify-around">
                <div className="relative z-0 mt-4 sm:mr-4 w-full description-input">
                  <textarea
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    id="description_input"
                    name="description"
                    disabled={loading}
                    autoFocus
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label
                    htmlFor="description_input"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                  {errors.description && touched.description && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:justify-end sm:px-6">
          <button
            type="button"
            disabled={loading}
            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={props.onCancel}
            ref={props.cancelButtonRef}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:mt-3 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default ExpenseForm;
