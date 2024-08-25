import {
  BaseApiRequestProps,
  Booking,
  Config,
  PostBookingProps,
  WidgetSettings,
} from "./types";

export class RahuiBackend {
  apiBaseUrl = "";
  apiKey = "";
  defaultRequestHeaders = {};
  localServerBaseUrl?: string;

  constructor({ apiKey, localServerBaseUrl }: Config) {
    this.apiKey = apiKey;
    this.apiBaseUrl = localServerBaseUrl || "https://www.rahui-booking.com";
    this.defaultRequestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
    this.localServerBaseUrl = localServerBaseUrl;
  }

  async postBooking({
    payload,
    beforeRequest,
    onSuccess,
    onFailure,
  }: PostBookingProps) {
    const url = `${this.apiBaseUrl}/api/widgets/create_booking`;
    if (url && payload) {
      beforeRequest && beforeRequest();

      const response = await fetch(url, {
        headers: this.defaultRequestHeaders,
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const booking: Booking = await response.json();
        onSuccess && onSuccess<Booking>(booking);
        return booking;
      } else {
        const body = await response.json();
        if (body.errors) {
          onFailure && onFailure(body.errors[0]);
        }
        return body;
      }
    }
  }

  async getWidgetSettings({
    beforeRequest,
    onSuccess,
    onFailure,
  }: BaseApiRequestProps) {
    const url = `${this.apiBaseUrl}/api/widgets/settings`;
    beforeRequest && beforeRequest();

    const response = await fetch(url, {
      headers: this.defaultRequestHeaders,
      method: "GET",
    });

    if (response.status === 200) {
      const settings: WidgetSettings = await response.json();
      onSuccess && onSuccess<WidgetSettings>(settings);
    } else {
      const body = await response.json();
      if (body.errors) {
        onFailure && onFailure(body.errors[0]);
      }
      return body;
    }
  }
}
