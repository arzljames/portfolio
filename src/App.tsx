import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";

/** Scrolls to `#section` links, or to the top when the page changes. */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered after a page change.
      const id = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
}

function Layout() {
  useScrollOnNavigate();
  return (
    <MotionConfig reducedMotion="user">
      <Outlet />
      <Footer />
    </MotionConfig>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:slug", element: <ProjectPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
