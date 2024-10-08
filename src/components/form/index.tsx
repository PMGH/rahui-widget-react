import { ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import { coversOptionsAsHtml, timeOptionsAsHtml } from "../../helpers";
import Select from "./Select";
import PoweredBy from "../powered-by";
import BookingConfirmation from "../booking-confirmation";

import "react-datepicker/dist/react-datepicker.css";
import "./form.scss";

import * as calendarSvg from "../../assets/calendar.svg";

import { RahuiBackend } from "../../backend/server";
import { BookingPayload } from "../../backend/types";

type FormProps = {
  apiKey?: string;
  buttonText?: string;
  formClass?: string;
  headingText?: string;
  localServerBaseUrl?: string;
  maxCoversPerBooking?: number;
  widgetPreview?: boolean;
};

interface FormElements extends HTMLFormControlsCollection {
  "booking[number_of_covers]": HTMLInputElement;
  "booking[date]": HTMLInputElement;
  "booking[time]": HTMLInputElement;
  "customer[first_name]"?: HTMLInputElement;
  "customer[last_name]"?: HTMLInputElement;
  "customer[email]": HTMLInputElement;
  "customer[phone]"?: HTMLInputElement;
  "booking[notes]"?: HTMLInputElement;
}

interface FormSubmission extends HTMLFormElement {
  readonly elements: FormElements;
}

const Form = ({
  apiKey = "",
  buttonText = "Book",
  formClass = "",
  headingText = "Reserve a table",
  localServerBaseUrl,
  maxCoversPerBooking,
  widgetPreview = false,
}: FormProps) => {
  const formatDate = (date: Date) => {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    return new Intl.DateTimeFormat(locale).format(date);
  };
  const defaultErrorMessage = "Sorry something went wrong, please try again.";

  const [numberOfCovers, setNumberOfCovers] = useState(1);
  const [date, setDate] = useState(formatDate(new Date()));
  const [time, setTime] = useState("06:00");
  const [firstNameRequired, setFirstNameRequired] = useState(true);
  const [lastNameRequired, setLastNameRequired] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const isPastDate = (date: Date) => {
    const now = new Date();
    const comparableDatetimeNow = new Date(now.setHours(0, 0, 0));
    const comparableDatetime = new Date(date.setHours(15, 0, 0));
    return comparableDatetime.getTime() > comparableDatetimeNow.getTime();
  };

  const dateFromString = (date: string) => {
    const day = parseInt(date.split("/")[0]);
    const month = parseInt(date.split("/")[1]) - 1; // zero index months
    const year = parseInt(date.split("/")[2]);
    return new Date(year, month, day);
  };

  const getSelectedDatetime = (): Date => {
    const newDate = dateFromString(date);
    const hours = time.split(":")[0];
    const mins = time.split(":")[1];
    const datetime = new Date(
      newDate.setHours(parseInt(hours), parseInt(mins), 0)
    );
    return datetime;
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hasFirstNameValue = Boolean(event?.target?.value?.length);
    setLastNameRequired(!hasFirstNameValue);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasLastNameValue = Boolean(event?.target?.value?.length);
    setFirstNameRequired(!hasLastNameValue);
  };

  const handleFormSubmit = async (event: React.FormEvent<FormSubmission>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const datetime = getSelectedDatetime();

    if (!datetime || isNaN(datetime?.getTime())) {
      setErrorMessage("Ensure you have selected a date and time");
      setIsError(true);
    }

    const payload: BookingPayload = {
      "widget-submission": true,
      booking: {
        number_of_covers: form.elements["booking[number_of_covers]"].value,
        datetime: datetime.toUTCString(),
        notes: form.elements["booking[notes]"]?.value || "",
      },
      customer: {
        first_name: form.elements["customer[first_name]"]?.value || "",
        last_name: form.elements["customer[last_name]"]?.value || "",
        email: form.elements["customer[email]"]?.value || "",
        phone: form.elements["customer[phone]"]?.value || "",
      },
    };

    const Server = new RahuiBackend({
      apiKey,
      localServerBaseUrl,
    });
    await Server.postBooking({
      payload,
      beforeRequest: resetErrorMessage,
      onSuccess: handlePostBookingSuccess,
      onFailure: handlePostBookingFailure,
    });
  };

  const resetErrorMessage = () => {
    setErrorMessage(defaultErrorMessage);
    setIsError(false);
  };

  const handlePostBookingSuccess = () => {
    setIsBookingConfirmed(true);
  };

  const handlePostBookingFailure = (error: any) => {
    setErrorMessage(error);
    setIsError(true);
  };

  return (
    <section id="rahui-widget" className="widget__container">
      <header className="widget__header">
        <h3>{headingText}</h3>
      </header>

      {isError && <div id="error-message">{errorMessage}</div>}

      {isBookingConfirmed && (
        <BookingConfirmation
          numberOfCovers={numberOfCovers}
          datetime={getSelectedDatetime()}
        />
      )}

      {!isBookingConfirmed && (
        <form className={formClass} onSubmit={handleFormSubmit}>
          <input
            type="hidden"
            id="widget-submission"
            name="widget-submission"
            defaultValue="true"
          ></input>
          <div className="form-group-1">
            <Select
              id="number_of_covers"
              className="main-booking-input main-booking-input-1 number-of-covers-select"
              name="booking[number_of_covers]"
              required
              options={coversOptionsAsHtml({
                max: maxCoversPerBooking || 15,
              })}
              value={numberOfCovers}
              onChange={(event) =>
                setNumberOfCovers(parseInt(event.target.value))
              }
            ></Select>
            <div className="datetime-input-container">
              <DatePicker
                id="datepicker-id"
                className="main-booking-input main-booking-input-2"
                name="booking[date]"
                selected={dateFromString(date)}
                onChange={(date) => date && setDate(formatDate(date))}
                dateFormat="dd/MM/yyyy"
                filterDate={isPastDate}
                showIcon
                icon={calendarSvg as unknown as ReactNode}
              />
              <Select
                id="timepicker-id"
                className="main-booking-input main-booking-input-3 time-select"
                name="booking[time]"
                required
                options={timeOptionsAsHtml({
                  openAt: 6,
                  closeAt: 20,
                })}
                onChange={(event) => setTime(event.target.value)}
              ></Select>
            </div>
          </div>

          <div className="form-group-2">
            <section className="customer-details">
              <div className="form__field__group">
                <div className="form__field">
                  <input
                    type="text"
                    id="customer_first_name"
                    name="customer[first_name]"
                    placeholder={
                      firstNameRequired
                        ? "Enter your first name *"
                        : "Enter your first name"
                    }
                    required={firstNameRequired}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="form__field last-name">
                  <input
                    type="text"
                    id="customer_last_name"
                    name="customer[last_name]"
                    placeholder={
                      lastNameRequired
                        ? "Enter your last name *"
                        : "Enter your last name"
                    }
                    required={lastNameRequired}
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>
              <div className="form__field">
                <input
                  type="email"
                  id="email"
                  name="customer[email]"
                  placeholder="Enter your email address *"
                  required
                />
                <p className="info muted">
                  We send the booking confirmation to this email address
                </p>
              </div>
              <div className="form__field">
                <input
                  type="phone"
                  id="phone"
                  name="customer[phone]"
                  placeholder="Enter your phone number"
                />
                <p className="info muted">
                  We may use this phone number to contact you about your booking
                </p>
              </div>
            </section>
            <div className="form__field">
              <textarea
                id="notes"
                name="booking[notes]"
                placeholder="Enter any additional notes"
                rows={6}
              ></textarea>
            </div>
          </div>

          <button type="submit" disabled={widgetPreview}>
            {buttonText}
          </button>
        </form>
      )}

      <PoweredBy />
    </section>
  );
};

export default Form;
