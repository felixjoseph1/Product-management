import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet } from "react-router-dom";
import CreatePage from "./pages/createPage";
import HomePage from "./pages/HomePage";
import Error from "./components/Error";
import { useState } from "react";

const App = () => {
  const [darkMode, setdarkMode] = useState(false); // Initial state of dark mode

  const toggleDarkMode = () => {
    setdarkMode(!darkMode); // Toggle the dark mode state
  };
  return (
    <div>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <Outlet context={{ darkMode }} />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default appRouter;
