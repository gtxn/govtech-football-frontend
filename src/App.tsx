import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Matches from "./pages/CompetitionDisplay";
import LogsDisplay from "./pages/LogsDisplay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/matches",
    element: <Matches />,
  },
  {
    path: "/logs",
    element: <LogsDisplay />,
  },
]);

function App() {
  return (
    <div className="w-100 h-screen overflow-auto align-middle justify-center bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
