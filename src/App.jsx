import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import { GlobalStyles } from "./Styles/GlobalStyles";
import Feed from "./Pages/Feed";
import Circle from "./Pages/Circle";
import Archive from "./Pages/Archive";
import Settings from "./Pages/Settings";
import { Toaster } from "react-hot-toast";
import AppLayout from "./AppLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import WhisperDetailPage from "./Pages/WhisperDetailPage";
import ScrollToTop from "./Components/ScrollToTop";
import ResetPassword from "./Pages/ResetPassword";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { supabase } from "./Service/Supabase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24,
});

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "PASSWORD_RECOVERY") {
          navigate("/reset-password");
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);
  useEffect(() => {
    document.body.className = "";
    if (location.pathname === "/" || location.pathname === "/reset-password") {
      document.body.classList.add("home-bg");
    } else if (
      location.pathname === "/feed" ||
      location.pathname === "/circle" ||
      location.pathname === "/archive" ||
      location.pathname === "/settings" ||
      location.pathname.startsWith("/whisper/")
    ) {
      document.body.classList.add("feed-bg");
    }
  }, [location.pathname]);
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ScrollToTop />
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/circle"
            element={
              <ProtectedRoute>
                <Circle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/archive"
            element={
              <ProtectedRoute>
                <Archive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/whisper/:whisperId"
            element={
              <ProtectedRoute>
                <WhisperDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          error: {
            duration: 5000,
          },
          success: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "white",
            color: "#283b89",
            textAlign: "center",
            backdropFilter: "blur(6px)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
