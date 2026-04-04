import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rules from "./pages/rules.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Inplay from "./pages/Inplay.jsx";
import MatchPage from "./pages/MatchPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Statement from "./pages/Statement.jsx";
import Ledger from "./pages/Ledger.jsx";
import Exposure from "./pages/Exposure.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="client" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="rules" element={<Rules />} />
        <Route path="inplay" element={<Inplay />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="game/:matchId" element={<MatchPage />} />
        <Route path="change_password" element={<ChangePassword />} />
        <Route path="statement_details" element={<Statement />} />
        <Route path="ledger" element={<Ledger />} />
        <Route path="exposure" element={<Exposure />} />
        
        {/* <Route path="about" element={<About />} /> */}
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      toastClassName={() =>
        "relative flex py-3 pl-3 pr-6   rounded-sm text-sm  justify-between overflow-hidden cursor-pointer bg-white text-gray-800 shadow-lg"
      }
      bodyClassName={() => "text-sm font-medium"}
      progressClassName="bg-blue-500"
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
