
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <AppRoutes/>
  </BrowserRouter>
);
