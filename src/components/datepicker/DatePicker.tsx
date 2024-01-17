import ReactDatePicker from "react-datepicker";
import { CustomDatePickerProps } from "../../helper/interface";
import moment from "moment";
import { getMonth, getYear } from "date-fns";
import { range } from "lodash";
import { Portal } from "react-overlays";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = range(2020, getYear(new Date()) + 10, 1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CalendarContainer = ({ children }: any) => {
  const el = document.getElementById("calendar-portal");

  return <Portal container={el}>{children}</Portal>;
};

const CustomDatePicker = ({
  name,
  selected,
  minDate,
  maxDate,
  handleBlur,
  id,
  hasError,
  setFieldValue,
  disabled,
  customChangeFunction,
  onChangeEffect,
  metaData,
}: CustomDatePickerProps) => {
  const onChange = (date: Date | null) => {
    if (customChangeFunction) {
      customChangeFunction(metaData ?? 0, date);
    } else if (setFieldValue) {
      setFieldValue(`${name}`, date ? moment(date).format("YYYY-MM-DD") : null);
    }

    if (onChangeEffect) {
      onChangeEffect();
    }
  };

  return (
    <ReactDatePicker
      popperContainer={CalendarContainer}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="m-2 flex justify-between">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            className="custom-select-style"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(+value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="custom-select-style"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      id={id}
      name={name}
      selected={selected}
      minDate={minDate}
      maxDate={maxDate}
      onBlur={handleBlur}
      placeholderText="Date"
      dateFormat={"dd/MM/yyyy"}
      isClearable={!disabled}
      onChange={(date) => onChange(date)}
      data-single-mode="true"
      className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
        hasError && "border-danger"
      }`}
      disabled={disabled}
      autoComplete={"off"}
    />
  );
};

export default CustomDatePicker;
