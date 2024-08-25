import Widget from "./widget";

function App() {
  if (Boolean(import.meta.env.DEV)) {
    const testRootElementId = "test-root-element";
    const isRootElementTest = import.meta.env.VITE_TEST_ROOT_ELEMENT === "true";
    if (isRootElementTest) {
      const testRootElement = document.createElement("div");
      testRootElement.id = testRootElementId;
      document.body.appendChild(testRootElement);
    }

    new Widget({
      apiKey: "b7511851-0a8b-4ee4-b14c-09e33d453cfd",
      localServerBaseUrl: "http://localhost:3001",
    });
  }
  window.RahuiWidget = Widget;
}

export default App;
