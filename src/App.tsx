import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Skeleton } from 'antd';
import { Suspense, createElement } from 'react';
import { BreadcrumbProvider } from './context/BreadcrumbContext.tsx';
import { DarkModeProvider } from './context/DarkModeContext';
import Login from './pages/Login.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import { getMenuData } from './services/menu/index.ts';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout.tsx';
import ProtectedRoute from './ui/ProtectedRoute.tsx';
import StockTaskProvider from './context/StockTaskContext.tsx';
import CompanyDrivers from './pages/CompanyDrivers.tsx';
import CompanyEmployees from './pages/CompanyEmployees.tsx';
import { RateProvider } from './context/RadeContext.tsx';

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
        <RateProvider>
          <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyles />
        <BrowserRouter>
          <StockTaskProvider>
            <BreadcrumbProvider>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="analytics" />} />
                  {getMenuData.map((menu) => {
                    return (
                      <Route
                        key={menu.key}
                        path={menu.path}
                        element={
                          <Suspense fallback={<Skeleton active />}>
                            <ProtectedRoute roles={menu.roles}  >
                              {createElement(menu.component)}
                            </ProtectedRoute>
                          </Suspense>
                        }
                      >
                        {menu.elements?.map((item) => (
                          <Route
                            key={item.path}
                            path={item.path}
                            element={
                              <Suspense fallback={<Skeleton active />}>
                                {createElement(item.el)}
                              </Suspense>
                            }
                          />
                        ))}
                      </Route>
                    );
                  })}
                  <Route path='companies/:name/:id/drivers' element={<CompanyDrivers/>}/>
                  <Route path='companies/:name/:id/employees' element={<CompanyEmployees/>}/>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BreadcrumbProvider>
          </StockTaskProvider>
        </BrowserRouter>
      </QueryClientProvider> 
        </RateProvider>
     
    </DarkModeProvider>
  );
}

export default App;
