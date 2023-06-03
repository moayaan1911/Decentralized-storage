import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
const activeChain = "mumbai";
import "bootstrap/dist/css/bootstrap.min.css";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
// contract address :-  0x2f8d69a858BEf8528AcF91a08ad22AEC0879c3D4
