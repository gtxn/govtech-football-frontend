import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Matches from "./pages/CompetitionDisplay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/matches",
    element: <Matches />,
  },
]);

function App() {
  return (
    <div className="w-100 h-screen overflow-auto align-middle justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
