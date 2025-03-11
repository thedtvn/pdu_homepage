import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./components/DefaultLayout";
import RoutingError from "./components/RoutingError";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/Themes";
import "./styles/index.css";
import Login from "./pages/Login";
import Posts from "./pages/Post";

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
        element: <Posts />
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