import React from "react";
import history from "./history";
import {
  BrowserRouter,
  Routes as Routing,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from "./App";
import UserList from "./UserList";
import "./App.css";

export default function Routes() {
  return (
    <div >
      <BrowserRouter history={history}>
        <Routing>
          <Route path="/" element={<App />} />
          <Route path="user/list" element={<UserList />} />
        </Routing>
      </BrowserRouter>
    </div>
  );
}
