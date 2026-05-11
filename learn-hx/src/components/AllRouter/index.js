import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "../../Router";

const router = createBrowserRouter(routers);

function AllRouter() {
  return <RouterProvider router={router} />;
}

export default AllRouter;