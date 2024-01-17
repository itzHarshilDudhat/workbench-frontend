import { Formik, Form, FormikHelpers } from "formik";
import { IUserLogin } from "../helper/interface";
import { onLoginValidation } from "../helper/validation";
import { onSubmitLogin } from "../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues: IUserLogin = {
  userName: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (
    values: IUserLogin,
    { resetForm }: FormikHelpers<IUserLogin>
  ) => {
    onSubmitLogin(values, resetForm, dispatch, navigate);
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={onLoginValidation}
        >
          {({ values, handleChange, errors, handleBlur, touched }) => (
            <Form>
              <div className="text-center md:text-left">
                <label className="mr-1">Welcome back</label>
              </div>
              <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
              <div className="relative z-0 mt-4">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  type="text"
                  id="username_input"
                  autoFocus
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=" "
                />
                <label
                  htmlFor="username_input"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  User name
                </label>
                {errors.userName && touched.userName && (
                  <p
                    id="standard_error_help"
                    className="mt-2 text-xs text-red-600 dark:text-red-400 italic"
                  >
                    {errors.userName}
                  </p>
                )}
              </div>

              <div className="relative z-0 mt-4">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  border-0 border-b-2"
                  type="text"
                  id="password_input"
                  name="password"
                  value={values.password}
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
                    className="mt-2 text-xs text-red-600 dark:text-red-400 italic"
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="mt-4 flex justify-between font-semibold text-sm">
                <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                  <input className="mr-1" type="checkbox" />
                  <span>Remember Me</span>
                </label>
                <a
                  className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center md:text-left">
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
                >
                  Login
                </button>
              </div>
              {/* <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Don't have account?{" "}
                <div
                  className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
                  onClick={() => navigate("/auth/signup")}
                >
                  Signup
                </div>
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
