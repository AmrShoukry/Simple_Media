import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import './App.css'
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "@/pages/authentic8tn/Login";
import { Demo } from "./pages/Demo";
import ForgetPassword from "./pages/authentic8tn/ForgetPassword";
import Register from "./pages/authentic8tn/Register";
import ResetPassword from "./pages/authentic8tn/ResetPassword";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Notfound from "./pages/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/demo",
        element: <Demo />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // Place the NotFoundPage route at the end
  {
    path: "*",
    element: <Notfound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
