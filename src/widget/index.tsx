import Form from "../components/form";
import { WidgetConfig, WidgetSettings } from "../types/types";
import { RahuiBackend } from "../backend/server";

class Widget {
  // API
  apiKey = "";
  apiBaseUrl = "";
  defaultRequestHeaders: {};
  apiServer: RahuiBackend;
  // User Defined Widget Settings
  rootElementId = "";
  widgetPreview = false;
  heading = "";
  buttonText = "";
  maxCoversPerBooking: number | undefined;
  // Development
  rootElementIdOverride;
  localServerBaseUrl;

  constructor({
    apiKey,
    localServerBaseUrl,
    rootElementIdOverride,
    widgetPreview,
  }: WidgetConfig) {
    this.rootElementId;
    this.apiKey = apiKey;
    this.apiBaseUrl = localServerBaseUrl || "https://www.rahui-booking.com";
    this.defaultRequestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
    this.localServerBaseUrl = localServerBaseUrl;
    this.apiServer = new RahuiBackend({
      apiKey: this.apiKey,
      localServerBaseUrl: this.apiBaseUrl,
    });
    this.rootElementIdOverride = rootElementIdOverride;
    this.widgetPreview = widgetPreview || false;
    this.heading = "Book a table";
    this.buttonText = "Create booking";

    this.initialize();
  }

  initialize = async () => {
    await this.apiServer.getWidgetSettings({
      onSuccess: this.applySettings,
      onFailure: this.handleSettingsRequestFailure,
    });

    window.RahuiWidget = window.RahuiWidget || this;
  };

  applySettings = (settings: any) => {
    const {
      button_text,
      heading_text,
      max_covers_per_booking,
      root_element_id,
    } = settings as WidgetSettings;
    console.log({
      _this: this,
      settings,
      button_text,
      heading_text,
      max_covers_per_booking,
      root_element_id,
    });
    this.buttonText = button_text || this.buttonText;
    this.heading = heading_text || this.heading;
    this.rootElementId =
      this.rootElementIdOverride || root_element_id || this.rootElementId;
    this.maxCoversPerBooking = max_covers_per_booking;

    this.setupWidget();
  };

  handleSettingsRequestFailure = () => {
    console.error("handleSettingsRequestFailure");
  };

  setupWidget = () => {
    console.log("setupWidget", { _this: this });
  };

  initForDevelopment = () => {
    return (
      <Form
        apiKey={this.apiKey}
        localServerBaseUrl="http://localhost:3001"
      ></Form>
    );
  };
}

export default Widget;
