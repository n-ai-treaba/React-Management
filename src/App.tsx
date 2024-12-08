import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SessionsProvider from "./store/sessions-context.tsx";

import HomePage from "./pages/HomePage.tsx";
import SessionsPage from "./pages/Sessions.tsx";
import SessionPage from "./pages/Session.tsx";
import Root from "./pages/Root.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "sessions", element: <SessionsPage /> },
      { path: "sessions/:id", element: <SessionPage /> },
    ],
  },
]);

function App() {
  return (
    <SessionsProvider>
      <RouterProvider router={Router} />;
    </SessionsProvider>
  );
}

export default App;
