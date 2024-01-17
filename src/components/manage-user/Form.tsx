import React from "react";
import { Form, FormikProps } from "formik";
import { ICreateUser } from "../../helper/interface";

interface Props extends FormikProps<ICreateUser> {
  cancelButtonRef: React.MutableRefObject<null>;
  onCancel: () => void;
  loading: boolean;
  isEditFrom?: boolean;
}

const UserForm = (props: Props) => {
  const { values, errors, touched, loading, handleBlur, handleChange } = props;

  return (
    <>
      <Form>
        <div className="bg-white sm:pb-4 w-full">
          <div className="sm:flex sm:items-start sm:justify-center w-full">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <div className="flex flex-row justify-around">
                <div className="relative z-0 mt-4 sm:mr-4">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="text"
                    id="name_input"
                    name="name"
                    disabled={loading}
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label
                    htmlFor="name_input"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                  {errors.name && touched.name && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="relative z-0 mt-4">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="text"
                    id="username_input"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    placeholder=" "
                  />
                  <label
                    htmlFor="username_input"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    User Name
                  </label>
                  {errors.userName && touched.userName && (
                    <p
                      id="standard_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                    >
                      {errors.userName}
                    </p>
                  )}
                </div>
              </div>
              {!props.isEditFrom || values.updatePassword ? (
                <div className="flex flex-row justify-around">
                  <div className="relative z-0 mt-4 sm:mr-4">
                    <input
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  border-0 border-b-2"
                      type="text"
                      id="password_input"
                      name="password"
                      value={values.password}
                      disabled={loading}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                    />
                    <label
                      htmlFor="password_input"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                    {errors.password && touched.password && (
                      <p
                        id="standard_error_help"
                        className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="relative z-0 mt-4">
                    <input
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  border-0 border-b-2"
                      type="text"
                      id="confirm_password_input"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      disabled={loading}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                    />
                    <label
                      htmlFor="confirm_password_input"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Confirm Password
                    </label>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p
                        id="standard_error_help"
                        className="mt-2 text-xs text-red-600 dark:text-red-400 italic error-text"
                      >
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {props.isEditFrom && (
                <div className="flex flex-row justify-center">
                  <div className="relative z-0 mt-4 sm:mr-4">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                      <input
                        className="mr-1"
                        type="checkbox"
                        name="updatePassword"
                        aria-selected={values.updatePassword}
                        disabled={loading}
                        onChange={handleChange}
                      />
                      <span>Change password?</span>
                    </label>
                  </div>
                </div>
              )}
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
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default UserForm;
