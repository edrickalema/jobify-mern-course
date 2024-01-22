import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { action as editJobAction } from "./pages/EditJob";
import { loader as editJobsLoader } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";

import {
  HomeLayout,
  Admin,
  DashboardLayout,
  Profile,
  Landing,
  Stats,
  AddJob,
  AllJobs,
  Error,
  EditJob,
  Register,
  Login,
  DeleteJob,
} from "./pages";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        { path: "login", element: <Login />, action: loginAction },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: dashboardLoader,
          children: [
            { index: true, element: <AddJob />, action: addJobAction },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              action: editJobAction,
              loader: editJobsLoader,
            },
            { path: "profile", element: <Profile />, action: profileAction },
            { path: "stats", element: <Stats />, loader: statsLoader},

            { path: "all-jobs", element: <AllJobs />, loader: allJobsLoader },
            { path: "admin", element: <Admin />, loader: adminLoader },
            {
              path: "delete-job/:id",
              element: <DeleteJob />,
              action: deleteJobAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
