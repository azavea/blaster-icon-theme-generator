import React from "react";
import ReactDOM from "react-dom";
import Preview from "./components/Preview";
import { Blaster } from "@blasterjs/core";

function App() {
  return (
    <Blaster className="App">
      <Preview />
    </Blaster>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
