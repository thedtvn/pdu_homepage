import { RouterProvider, createBrowserRouter } from "react-router";
import { useMemo } from "react";
import Home from "./pages/Home";
import DefaultLayout from "./components/DefaultLayout";
import RoutingError from "./components/RoutingError";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/Themes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <RoutingError />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
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