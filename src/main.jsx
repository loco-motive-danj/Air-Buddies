import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import Nav from "./components/Nav";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <Nav />
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);
