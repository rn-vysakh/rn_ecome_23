import { ToastContainer } from 'react-toastify';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------
// const queryClient = new QueryClient();

export default function App() {
  return (
    // <QueryClientProvider client={queryClient} contextSharing>
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      <ToastContainer />
    </ThemeProvider>
    // <ReactQueryDevtools initialIsOpen={false} />
    // </QueryClientProvider>
  );
}
