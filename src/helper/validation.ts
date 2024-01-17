import * as Yup from "yup";

const validateString = Yup.string().trim();
const validateNumber = Yup.number().typeError("Invalid number");
const validateInteger = validateNumber.integer();
const validateDate = Yup.date().typeError("Invalid date");

export const onSignUpValidation = Yup.object({
  name: validateString.required("Name is required"),
  userName: validateString.required("User name is reqiured"),
  password: validateString.min(8).required().label("Password"),
});

export const addUpdateUserValidation = Yup.object({
  name: validateString.required("Name is required"),
  userName: validateString
    .required("User name is reqiured")
    .matches(/^\S*$/g, "Blank spaces not allowed"),
  updatePassword: Yup.boolean().label("Update password"),
  password: validateString
    .when("updatePassword", (validatePassword, schema) => {
      if (validatePassword?.[0]) return schema.min(8).required();
      return schema;
    })
    .label("Password"), // Require only if update password checked
  confirmPassword: validateString.when(
    "updatePassword",
    (validatePassword, schema) => {
      if (validatePassword?.[0])
        return schema
          .min(8)
          .label("Confirm password")
          .oneOf([Yup.ref("password")], "Passwords must match");
      return schema;
    }
  ),
});

export const incomeValidation = Yup.object({
  name: validateString.required(),
  description: validateString.required(),
  date: validateDate.required(),
  amount: validateInteger.required(),
});

export const expenseValidation = Yup.object({
  name: validateString.required(),
  description: validateString.required(),
  account: validateString.required(),
  subAccount: validateString.required(),
  date: validateDate.required(),
  amount: validateInteger.required(),
});

export const onLoginValidation = Yup.object({
  userName: validateString.required("User name is reqiured"),
  password: validateString.min(8).required().label("Password"),
});
