import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { GlobalStyles } from "./Styles/GlobalStyles";
import Feed from "./Pages/Feed";
import Welcome from "./Pages/Welcome";
import Circle from "./Pages/Circle";
import Archive from "./Pages/Archive";
import Settings from "./Pages/Settings";
import { Toaster } from "react-hot-toast";
import AppLayout from "./AppLayout";
import ScrollToTop from "./Components/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute";
import WhisperDetailPage from "./Pages/WhisperDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ReactQueryDevtools initialIsOpen={false} />
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
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
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
