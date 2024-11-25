import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import appRouter from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={appRouter} />
    </NextUIProvider>
  </StrictMode>
);
