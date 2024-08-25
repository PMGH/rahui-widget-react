declare global {
  interface Window {
    RahuiWidget: any;
  }
}
window.RahuiWidget = window.RahuiWidget || {};

export type WidgetConfig = {
  apiKey: string;
  localServerBaseUrl?: string;
  rootElementIdOverride?: string;
  widgetPreview?: boolean;
};

export type WidgetProps = {
  apiKey?: string;
  buttonText?: string;
  datePickerId?: string;
  formClass?: string;
  heading?: string;
  localServerBaseUrl?: string;
  maxCoversPerBooking?: number;
  timePickerId?: string;
  widgetPreview?: boolean;
};

export type WidgetSettings = {
  button_text: string;
  heading_text: string;
  max_covers_per_booking: number;
  root_element_id: string;
};
