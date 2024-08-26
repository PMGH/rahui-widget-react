export type Config = {
  apiKey: string;
  localServerBaseUrl?: string;
  rootElementIdOverride?: string;
  widgetPreview?: boolean;
};

export type BookingPayload = {
  "widget-submission": boolean;
  booking: {
    number_of_covers: string;
    datetime: string;
    notes: string;
  };
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
};

export type BaseApiRequestProps = {
  beforeRequest?: () => void;
  onSuccess?: <T>(item: T) => void;
  onFailure?: (error: any) => void;
};

export type PostBookingProps = BaseApiRequestProps & {
  payload: BookingPayload;
};

export type Booking = {
  created_at: string;
  customer_id: string;
  datetime: string;
  id: string;
  notes: string;
  number_of_covers: number;
  updated_at: string;
  url: string;
  user_id: null;
};

export type WidgetSettings = {
  button_text: string;
  heading_text: string;
  max_covers_per_booking: number;
  root_element_id: string;
};
