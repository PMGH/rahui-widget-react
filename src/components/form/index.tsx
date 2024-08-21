import { formattedTodayDate, timeOptionsAsHtml } from "../../helpers";
import Select from "./Select";

import "./form.scss";

type FormProps = {
  buttonText?: string;
  formClass?: string;
  datePickerHiddenInputId?: string;
  datePickerId?: string;
  heading?: string;
  maxCoversPerBooking?: number;
  timePickerId?: string;
  widgetPreview?: boolean;
};

const Form = ({
  buttonText = "Book",
  formClass = "",
  datePickerHiddenInputId = "hidden-datepicker-input-id",
  datePickerId = "datepicker-id",
  heading = "Reserve a table",
  maxCoversPerBooking,
  timePickerId = "timepicker-id",
  widgetPreview = false,
}: FormProps) => (
  <section id="rahui-widget" className="widget__container">
    <header className="widget__header">
      <h3>{heading}</h3>
    </header>

    <div id="error-message">Sorry, something went wrong. Please try again.</div>

    <div id="confirmation-message-container">
      <div className="wrapper">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          {" "}
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />{" "}
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h3 id="confirmation-message">Booking confirmed!</h3>
      <div id="confirmation-booking-container">
        <span id="confirmation-booking-number-of-covers"></span>
        <span id="confirmation-booking-datetime"></span>
      </div>
    </div>

    <form className={formClass}>
      <input
        type="hidden"
        id="widget-submission"
        name="widget-submission"
        value="true"
      ></input>
      <div className="form__field__group">
        <div className="form__field form-group-left">
          <div className="form__field form__field__required">
            <div className="form__field__required">
              <label
                id="number_of_covers_label"
                htmlFor="booking[number_of_covers]"
              >
                Guests{" "}
                {maxCoversPerBooking ? ` (Max: ${maxCoversPerBooking})` : ""}
              </label>
              <span className="required-field-symbol">*</span>
            </div>
            <input
              type="number"
              id="number_of_covers"
              name="booking[number_of_covers]"
              placeholder="1"
              min="1"
              value="2"
              required
            />
          </div>
          <div className="form__field__required">
            <input
              type="hidden"
              id={datePickerHiddenInputId}
              name="booking[date]"
              required
              value={formattedTodayDate}
            ></input>
          </div>
          <div className="time-select-container">
            <Select
              id={timePickerId}
              name="booking[time]"
              required
              className="time-select"
              options={timeOptionsAsHtml({
                openAt: 6,
                closeAt: 20,
              })}
            ></Select>
          </div>
        </div>

        <div className="form-group-right">
          <section className="customer-details">
            <div className="form__field__group">
              <div className="form__field">
                <div className="form__field__required">
                  <label htmlFor="customer[first_name]">First name</label>
                  <span
                    className="required-field-symbol"
                    id="customer_first_name_required_symbol"
                  >
                    *
                  </span>
                </div>
                <input
                  type="text"
                  id="customer_first_name"
                  name="customer[first_name]"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form__field last-name">
                <div className="form__field__required">
                  <label htmlFor="customer[last_name]">Last name</label>
                  <span
                    className="required-field-symbol"
                    id="customer_last_name_required_symbol"
                  >
                    *
                  </span>
                </div>
                <input
                  type="text"
                  id="customer_last_name"
                  name="customer[last_name]"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="form__field">
              <div className="form__field__required">
                <label htmlFor="customer[email]">Email</label>
                <span className="required-field-symbol">*</span>
              </div>
              <p className="info muted">
                We send the booking confirmation to this email address
              </p>
              <input
                type="email"
                id="email"
                name="customer[email]"
                placeholder="Enter your email address"
              />
            </div>
            <div className="form__field">
              <label htmlFor="customer[phone]">Phone number</label>
              <p className="info muted">
                We may use this to contact you about your booking
              </p>
              <input
                type="phone"
                id="phone"
                name="customer[phone]"
                placeholder="Enter your phone number"
              />
            </div>
          </section>
          <div className="form__field">
            <label htmlFor="booking[notes]">Notes</label>
            <textarea
              id="notes"
              name="booking[notes]"
              placeholder="Enter any additional notes"
              rows={6}
            ></textarea>
          </div>
        </div>
      </div>

      <button type="submit" disabled={widgetPreview}>
        {buttonText}
      </button>
    </form>
  </section>
);

export default Form;
