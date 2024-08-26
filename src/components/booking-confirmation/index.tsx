const BookingConfirmation = ({
  confirmationMessage = "Booking confirmed!",
  numberOfCovers,
  datetime = new Date(),
}: {
  confirmationMessage?: string;
  numberOfCovers: number;
  datetime: Date;
}) => {
  const numberOfCoversMessage =
    numberOfCovers === 1
      ? `${numberOfCovers} Person`
      : `${numberOfCovers} People`;
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const formattedDatetime = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(datetime);
  return (
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
      <h3 id="confirmation-message">{confirmationMessage}</h3>
      <div id="confirmation-booking-container">
        <span id="confirmation-booking-number-of-covers">
          {numberOfCoversMessage}
        </span>
        <span id="confirmation-booking-separator">|</span>
        <span id="confirmation-booking-datetime">{formattedDatetime}</span>
      </div>
    </div>
  );
};

export default BookingConfirmation;
