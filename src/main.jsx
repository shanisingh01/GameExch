import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";
import { Navigate } from "react-router-dom";
import Loader from "./components/Loader.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MatchBetsPage from "./pages/MatchBetsPage.jsx";


// import ProtectedRoute from "./components/ProtectedRoute.jsx";

const ProtectedRoute = ({ children }) => {
  const { userInfo, isAuthChecked } = useSelector((state) => state.user);

  //  WAIT until auth check completes
  if (!isAuthChecked) {
    return <Loader />;
  }

  //  AFTER check → decide
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

//  Lazy Imports
const App = lazy(() => import("./App.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Rules = lazy(() => import("./pages/rules.jsx"));
const Inplay = lazy(() => import("./pages/Inplay.jsx"));
const MatchPage = lazy(() => import("./pages/MatchPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const ChangePassword = lazy(() => import("./pages/ChangePassword.jsx"));
const Statement = lazy(() => import("./pages/Statement.jsx"));
const Ledger = lazy(() => import("./pages/Ledger.jsx"));
const Exposure = lazy(() => import("./pages/Exposure.jsx"));

export const BASE_URL = "https://gameexchlive.anshuwap.com";

// ✅ Loader
// const Loader = () => (
//   <div className="flex justify-center items-center h-screen text-lg font-semibold">
//     Loading...
//   </div>
// );

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="client"
        element={
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        }
      >
        <Route
          path=""
          element={
            <ProtectedRoute><Suspense fallback={<Loader />}>
              <Home />
            </Suspense></ProtectedRoute>
          }
        />
        <Route
          path="rules"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <Rules />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="inplay"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <Inplay />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <ProfilePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="game/:matchId"
          element={
            <Suspense fallback={<Loader />}>
              <MatchPage />
            </Suspense>
          }
        />
        <Route
          path="change_password"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <ChangePassword />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="statement_details"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <Statement />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="ledger"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <Ledger />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="exposure"
          element={
            <Suspense fallback={<Loader />}>
              <Exposure />
            </Suspense>
          }
        />
        <Route
        path="bet_details/:id"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <MatchBetsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />

      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative flex py-3 pl-3 pr-6 rounded-sm text-sm justify-between overflow-hidden cursor-pointer bg-white text-gray-800 shadow-lg"
        }
        bodyClassName={() => "text-sm font-medium"}
        progressClassName="bg-blue-500"
      />

      {/* Optional global fallback */}
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>,
);
