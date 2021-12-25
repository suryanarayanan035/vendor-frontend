import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import CreateBinPage from "./pages/CreateBinPage";
import Login from "./pages/Login";
import { Header } from "./parts/Header";
import ListBinsPage from "./pages/ListBinsPage";
import { CreateOrganizationPage } from "./pages/CreateOrganizationPage";
import { Footer } from "./parts/Footer";
import store from "./redux/store";
import { FormLoadSpinner } from "./components/FormLoadSpinner";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            {/* <Route
              path="change-password"
              element={<ChangePasswordPage></ChangePasswordPage>}
            ></Route> */}

            <Route
              path="create-bin"
              element={<CreateBinPage></CreateBinPage>}
            ></Route>
            <Route
              path="list-organizations"
              element={<ListBinsPage></ListBinsPage>}
            ></Route>
            <Route
              path="create-organization"
              element={<CreateOrganizationPage></CreateOrganizationPage>}
            ></Route>
            <Route path="/test-spinner" element={<FormLoadSpinner />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    </Provider>
  );
}

export default App;
