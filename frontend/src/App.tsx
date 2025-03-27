import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./components/DefaultLayout";
import RoutingError from "./components/RoutingError";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/Themes";
import "./styles/root.css";
import Login from "./pages/Login";
import Post from "./pages/Post";
import AdminLayout from "./components/AdminLayout";
import PostAdmin from "./pages/Admin/Posts/Post";
import PostAdd from "./pages/Admin/Posts/PostAdd";
import AdminIndex from "./pages/Admin/Index";
import PostEdit from "./pages/Admin/Posts/PostEdit";
import Posts from "./pages/Posts";
import Apps from "./pages/Admin/Apps/Apps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <RoutingError />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
      {
        path: "/posts",
        element: <Posts />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <RoutingError />,
    children: [
      {
        path: "",
        element: <AdminIndex />
      },
      {
        path: "posts",
        element: <PostAdmin />
      },
      {
        path: "posts/add",
        element: <PostAdd />
      },
      {
        path: "posts/edit/:slug",
        element: <PostEdit />
      },
      // apps
      {
        path: "apps",
        element: <Apps />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App