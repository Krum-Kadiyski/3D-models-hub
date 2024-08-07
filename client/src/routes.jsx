import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const NotFoundPage = lazy(() => import("./pages/not-found"));
const CreateModelPage = lazy(() => import("./pages/model-create"));
const ViewModelPage = lazy(() => import("./pages/model-view"));
const EditModelPage = lazy(() => import("./pages/model-edit"));
const ModelsListPage = lazy(() => import("./pages/models-list"));
const ProfilePage = lazy(() => import("./pages/profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "create-model",
        element: <CreateModelPage />,
      },
      {
        path: "models",
        element: <ModelsListPage />,
      },
      {
        path: "models/:modelId",
        element: <ViewModelPage />,
      },
      {
        path: "models/:modelId/edit",
        element: <EditModelPage />,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>
);

export default Routes;
