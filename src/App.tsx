import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Skeleton } from "antd";
import { Suspense, createElement } from "react";
import { BreadcrumbProvider } from "./context/BreadcrumbContext.tsx";
import { DarkModeProvider } from "./context/DarkModeContext";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { getMenuData } from "./services/menu/index.ts";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <BreadcrumbProvider>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate replace to="analytics" />} />
                {getMenuData.map(menu => {
                  return (<Route key={menu.key} path={menu.path} element={
                    <Suspense fallback={<Skeleton active />}>
                      <ProtectedRoute roles={menu.roles}>
                        {createElement(menu.component)}
                      </ProtectedRoute>
                    </Suspense>

                  } />);
                })}
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BreadcrumbProvider>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
