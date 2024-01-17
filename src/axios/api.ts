export const API = {
  login: `/auth/login`,
  signup: `/auth/signup`,

  // User
  getUser: `/manage-user/get-user`,
  createUser: `/manage-user/add-user`,
  updateUser: `/manage-user/update-user`,
  deleteUser: `/manage-user/delete-user`,
  activateDeactivateUser: `/manage-user/activate-deactivate-user`,

  // Income
  createIncome: `/manage-income/create-income`,
  getIncome: `/manage-income/get-income`,
  updateIncome: `/manage-income/update-income`,
  deleteIncome: `/manage-income/delete-income`,

  // Income
  createExpense: `/manage-expense/create-expense`,
  getExpense: `/manage-expense/get-expense`,
  updateExpense: `/manage-expense/update-expense`,
  deleteExpense: `/manage-expense/delete-expense`,
};
