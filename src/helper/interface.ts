import { AxiosError } from "axios";
import { FormikHandlers } from "formik";

export interface IUser {
  name: string;
  userName: string;
  password: string;
}

export interface ICreateUser extends IUser {
  _id?: string;
  updatePassword?: boolean;
  confirmPassword: string;
}

export interface IIncome {
  _id?: string;
  description: string;
  amount: string;
  date: string;
}

export interface IExpense {
  _id?: string;
  description: string;
  account: string;
  subAccount: string;
  amount: string;
  date: string;
}

export interface IUserLogin {
  userName: string;
  password: string;
}

export interface BaseState {
  token: string | null;
  isSuperUser: boolean;
  loading: boolean;
}

export interface ReduxState {
  base: BaseState;
}

export interface APIResponse<T> {
  data: T;
  message: string;
}

export interface StateInterface {
  base: BaseState;
}

export interface TableResponse<T> {
  total: number;
  list: T;
}

export interface User {
  _id: string;
  name: string;
  userName: string;
  isActive: boolean;
}

export interface PaginationAvailability {
  pre: boolean;
  next: boolean;
}

interface Pagination {
  limit: number;
  page: number;
  total: number;
  paginationAvailability: PaginationAvailability;
}

export interface CustomDatePickerProps {
  name: string;
  id: string;
  selected?: Date | null;
  minDate?: Date | null;
  hasError?: boolean;
  maxDate?: Date | null;
  setFieldValue?: (
    field: string,
    value: Date | null | string,
    shouldValidate?: boolean
  ) => void;
  handleBlur?: FormikHandlers["handleBlur"];
  disabled?: boolean;
  customChangeFunction?: (index: number, expiryDate: Date | null) => void;
  metaData?: number;
  onChangeEffect?: () => void;
}

interface SetPagination {
  onSetPage: (payload: number) => void;
  onSetLimit: (payload: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export enum ALIGN {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export interface Props<T> {
  columns: {
    key: keyof T | "action";
    title: string;
    align?: ALIGN;
    render: (record: T, index: number) => JSX.Element;
  }[];
  data: T[];
  pagination: Pagination;
  setPagination: SetPagination;
}

export type AxiosCustomError = AxiosError<{ message: string }>;
