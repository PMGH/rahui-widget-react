import Form from "../components/form";
import { WidgetConfig, WidgetSettings } from "../types/types";
import { RahuiBackend } from "../backend/server";
import { Component } from "react";
import ReactDOM from "react-dom/client";
import React from "react";

class Widget extends Component {
  // API
  apiKey = "";
  apiBaseUrl = "";
  defaultRequestHeaders: {};
  apiServer: RahuiBackend;
  // User Defined Widget Settings
  root = ReactDOM.createRoot(document.getElementById("root") as Element);
  rootElementId = "";
  widgetPreview = false;
  headingText = "";
  buttonText = "";
  formClass = "";
  maxCoversPerBooking: number | undefined;
  // Development
  rootElementIdOverride;
  localServerBaseUrl;

  constructor({
    apiKey,
    localServerBaseUrl,
    root,
    rootElementIdOverride,
    widgetPreview,
  }: WidgetConfig) {
    super({
      apiKey,
      localServerBaseUrl,
      root,
      rootElementIdOverride,
      widgetPreview,
    });

    this.root;
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
    this.headingText = "Book a table";
    this.buttonText = "Create booking";
    this.formClass = "rahui-booking-form";

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
    this.headingText = heading_text || this.headingText;
    this.rootElementId =
      this.rootElementIdOverride || root_element_id || this.rootElementId;
    this.maxCoversPerBooking = max_covers_per_booking;

    this.renderWidget();
  };

  handleSettingsRequestFailure = () => {
    console.error("Settings request failed");
  };

  renderWidget() {
    this.root.render(
      <React.StrictMode>
        <Form
          apiKey={this.apiKey}
          buttonText={this.buttonText}
          formClass={this.formClass}
          localServerBaseUrl={this.localServerBaseUrl}
          headingText={this.headingText}
          maxCoversPerBooking={this.maxCoversPerBooking}
          widgetPreview={this.widgetPreview}
        ></Form>
      </React.StrictMode>
    );
  }
}

export default Widget;
